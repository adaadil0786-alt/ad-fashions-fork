import Types "../types/orders";
import ProductTypes "../types/products";
import CommonTypes "../types/common";
import OrderLib "../lib/orders";
import AccessControl "mo:caffeineai-authorization/access-control";
import List "mo:core/List";
import Map "mo:core/Map";
import Runtime "mo:core/Runtime";

mixin (
  accessControlState : AccessControl.AccessControlState,
  orders : List.List<Types.Order>,
  userOrders : Map.Map<CommonTypes.UserId, List.List<CommonTypes.OrderId>>,
  products : List.List<ProductTypes.Product>,
  orderCounter : CommonTypes.Counter,
) {
  public shared ({ caller }) func createOrder(req : Types.CreateOrderRequest) : async ?Types.Order {
    if (not AccessControl.hasPermission(accessControlState, caller, #user)) {
      Runtime.trap("Unauthorized: Login required");
    };
    if (req.items.size() == 0) Runtime.trap("Order must have at least one item");
    let id = orderCounter.value;
    orderCounter.value += 1;
    OrderLib.createOrder(orders, userOrders, products, id, caller, req);
  };

  public shared query ({ caller }) func getOrder(id : CommonTypes.OrderId) : async ?Types.Order {
    if (not AccessControl.hasPermission(accessControlState, caller, #user)) {
      Runtime.trap("Unauthorized: Login required");
    };
    switch (OrderLib.getOrder(orders, id)) {
      case (?o) {
        // Users can only see their own orders; admins can see all
        if (o.userId != caller and not AccessControl.isAdmin(accessControlState, caller)) {
          Runtime.trap("Unauthorized: Not your order");
        };
        ?o;
      };
      case null null;
    };
  };

  public shared query ({ caller }) func getMyOrders() : async [Types.Order] {
    if (not AccessControl.hasPermission(accessControlState, caller, #user)) {
      Runtime.trap("Unauthorized: Login required");
    };
    OrderLib.getUserOrders(orders, userOrders, caller);
  };

  public shared ({ caller }) func updateOrderStatus(id : CommonTypes.OrderId, status : CommonTypes.OrderStatus) : async ?Types.Order {
    if (not AccessControl.isAdmin(accessControlState, caller)) {
      Runtime.trap("Unauthorized: Only admins can update order status");
    };
    OrderLib.updateOrderStatus(orders, id, status);
  };

  public shared ({ caller }) func setOrderPaymentIntent(id : CommonTypes.OrderId, paymentIntentId : Text) : async ?Types.Order {
    if (not AccessControl.hasPermission(accessControlState, caller, #user)) {
      Runtime.trap("Unauthorized: Login required");
    };
    // Only the order owner or admin may attach a payment intent
    switch (OrderLib.getOrder(orders, id)) {
      case (?o) {
        if (o.userId != caller and not AccessControl.isAdmin(accessControlState, caller)) {
          Runtime.trap("Unauthorized: Not your order");
        };
      };
      case null Runtime.trap("Order not found");
    };
    OrderLib.setStripePaymentIntent(orders, id, paymentIntentId);
  };

  public shared query ({ caller }) func listAllOrders() : async [Types.Order] {
    if (not AccessControl.isAdmin(accessControlState, caller)) {
      Runtime.trap("Unauthorized: Only admins can list all orders");
    };
    OrderLib.listAllOrders(orders);
  };

  public shared query ({ caller }) func listOrdersByStatus(status : CommonTypes.OrderStatus) : async [Types.Order] {
    if (not AccessControl.isAdmin(accessControlState, caller)) {
      Runtime.trap("Unauthorized: Only admins can filter orders by status");
    };
    OrderLib.listOrdersByStatus(orders, status);
  };
};
