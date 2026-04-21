import CartTypes "../types/cart";
import ProductTypes "../types/products";
import CommonTypes "../types/common";
import CartLib "../lib/cart";
import AccessControl "mo:caffeineai-authorization/access-control";
import Map "mo:core/Map";
import List "mo:core/List";
import Runtime "mo:core/Runtime";

mixin (
  accessControlState : AccessControl.AccessControlState,
  carts : Map.Map<CommonTypes.UserId, List.List<CartTypes.CartItem>>,
  products : List.List<ProductTypes.Product>,
  cartItemCounter : CommonTypes.Counter,
) {
  public shared query ({ caller }) func getMyCart() : async CartTypes.Cart {
    if (not AccessControl.hasPermission(accessControlState, caller, #user)) {
      Runtime.trap("Unauthorized: Login required");
    };
    CartLib.getCart(carts, caller);
  };

  public shared ({ caller }) func addToCart(req : CartTypes.AddToCartRequest) : async ?CartTypes.Cart {
    if (not AccessControl.hasPermission(accessControlState, caller, #user)) {
      Runtime.trap("Unauthorized: Login required");
    };
    if (req.quantity == 0) Runtime.trap("Quantity must be at least 1");
    let id = cartItemCounter.value;
    cartItemCounter.value += 1;
    CartLib.addToCart(carts, products, id, caller, req);
  };

  public shared ({ caller }) func removeFromCart(cartItemId : CommonTypes.CartItemId) : async CartTypes.Cart {
    if (not AccessControl.hasPermission(accessControlState, caller, #user)) {
      Runtime.trap("Unauthorized: Login required");
    };
    CartLib.removeFromCart(carts, caller, cartItemId);
  };

  public shared ({ caller }) func updateCartItemQuantity(cartItemId : CommonTypes.CartItemId, quantity : Nat) : async ?CartTypes.Cart {
    if (not AccessControl.hasPermission(accessControlState, caller, #user)) {
      Runtime.trap("Unauthorized: Login required");
    };
    CartLib.updateCartItemQuantity(carts, caller, cartItemId, quantity);
  };

  public shared ({ caller }) func clearMyCart() : async () {
    if (not AccessControl.hasPermission(accessControlState, caller, #user)) {
      Runtime.trap("Unauthorized: Login required");
    };
    CartLib.clearCart(carts, caller);
  };
};
