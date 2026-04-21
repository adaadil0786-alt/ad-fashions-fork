import Types "../types/orders";
import CommonTypes "../types/common";
import ProductTypes "../types/products";
import List "mo:core/List";
import Map "mo:core/Map";
import Time "mo:core/Time";
import Nat "mo:core/Nat";
import Int "mo:core/Int";
import Runtime "mo:core/Runtime";

module {
  public type Order = Types.Order;
  public type OrderId = CommonTypes.OrderId;
  public type UserId = CommonTypes.UserId;
  public type OrderStatus = CommonTypes.OrderStatus;
  public type CreateOrderRequest = Types.CreateOrderRequest;

  // Tax rate: 18% (GST) — mirrors cart calculation
  let TAX_RATE_PERCENT : Nat = 18;

  public func generateOrderNumber(id : OrderId, timestamp : Int) : Text {
    let ts = Int.abs(timestamp / 1_000_000_000).toNat(); // seconds
    "ADF-" # ts.toText() # "-" # id.toText();
  };

  public func createOrder(
    orders : List.List<Order>,
    userOrders : Map.Map<UserId, List.List<OrderId>>,
    products : List.List<ProductTypes.Product>,
    nextId : Nat,
    userId : UserId,
    req : CreateOrderRequest,
  ) : ?Order {
    // Resolve each item against product catalogue
    var resolvedItems : [Types.OrderItem] = [];
    for (itemReq in req.items.values()) {
      let product = switch (products.find(func(p) { p.id == itemReq.productId })) {
        case (?p) p;
        case null return null; // unknown product
      };
      let item : Types.OrderItem = {
        productId = itemReq.productId;
        productName = product.name;
        productTier = product.tier;
        price = product.price;
        size = itemReq.size;
        color = itemReq.color;
        quantity = itemReq.quantity;
      };
      resolvedItems := resolvedItems.concat([item]);
    };

    let subtotal = resolvedItems.foldLeft(0, func(acc, item) = acc + item.price * item.quantity);
    let tax = subtotal * TAX_RATE_PERCENT / 100;
    let total = subtotal + tax;
    let now = Time.now();

    let order : Order = {
      id = nextId;
      orderNumber = generateOrderNumber(nextId, now);
      userId;
      items = resolvedItems;
      subtotal;
      tax;
      total;
      status = #pending;
      stripePaymentIntentId = null;
      createdAt = now;
      updatedAt = now;
    };

    orders.add(order);

    // Index by user
    let userList = switch (userOrders.get(userId)) {
      case (?list) list;
      case null {
        let newList = List.empty<OrderId>();
        userOrders.add(userId, newList);
        newList;
      };
    };
    userList.add(nextId);

    ?order;
  };

  public func getOrder(orders : List.List<Order>, id : OrderId) : ?Order {
    orders.find(func(o) { o.id == id });
  };

  public func getUserOrders(
    orders : List.List<Order>,
    userOrders : Map.Map<UserId, List.List<OrderId>>,
    userId : UserId,
  ) : [Order] {
    switch (userOrders.get(userId)) {
      case null [];
      case (?ids) {
        let idArr = ids.toArray();
        let result = List.empty<Order>();
        for (oid in idArr.values()) {
          switch (orders.find(func(o) { o.id == oid })) {
            case (?o) result.add(o);
            case null {};
          };
        };
        result.toArray();
      };
    };
  };

  public func listAllOrders(orders : List.List<Order>) : [Order] {
    orders.toArray();
  };

  public func listOrdersByStatus(orders : List.List<Order>, status : OrderStatus) : [Order] {
    orders.filter(func(o) { o.status == status }).toArray();
  };

  public func updateOrderStatus(
    orders : List.List<Order>,
    id : OrderId,
    status : OrderStatus,
  ) : ?Order {
    var updated : ?Order = null;
    orders.mapInPlace(func(o : Order) : Order {
      if (o.id == id) {
        let upd = { o with status; updatedAt = Time.now() };
        updated := ?upd;
        upd;
      } else o;
    });
    updated;
  };

  public func setStripePaymentIntent(
    orders : List.List<Order>,
    id : OrderId,
    paymentIntentId : Text,
  ) : ?Order {
    var updated : ?Order = null;
    orders.mapInPlace(func(o : Order) : Order {
      if (o.id == id) {
        let upd = { o with stripePaymentIntentId = ?paymentIntentId; updatedAt = Time.now() };
        updated := ?upd;
        upd;
      } else o;
    });
    updated;
  };
};
