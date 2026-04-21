import Types "../types/cart";
import CommonTypes "../types/common";
import ProductTypes "../types/products";
import Map "mo:core/Map";
import List "mo:core/List";
import Time "mo:core/Time";
import Runtime "mo:core/Runtime";

module {
  public type Cart = Types.Cart;
  public type CartItem = Types.CartItem;
  public type AddToCartRequest = Types.AddToCartRequest;
  public type UserId = CommonTypes.UserId;
  public type ProductId = CommonTypes.ProductId;
  public type CartItemId = CommonTypes.CartItemId;

  // Tax rate: 18% (GST)
  let TAX_RATE_PERCENT : Nat = 18;

  public func computeCartTotals(items : [CartItem]) : { subtotal : Nat; tax : Nat; total : Nat } {
    let subtotal = items.foldLeft(0, func(acc, item) = acc + item.price * item.quantity);
    let tax = subtotal * TAX_RATE_PERCENT / 100;
    let total = subtotal + tax;
    { subtotal; tax; total };
  };

  public func getCart(
    carts : Map.Map<UserId, List.List<CartItem>>,
    userId : UserId,
  ) : Cart {
    let items = switch (carts.get(userId)) {
      case (?list) list.toArray();
      case null [];
    };
    let totals = computeCartTotals(items);
    { userId; items; subtotal = totals.subtotal; tax = totals.tax; total = totals.total };
  };

  public func addToCart(
    carts : Map.Map<UserId, List.List<CartItem>>,
    products : List.List<ProductTypes.Product>,
    nextCartItemId : Nat,
    userId : UserId,
    req : AddToCartRequest,
  ) : ?Cart {
    let product = switch (products.find(func(p) { p.id == req.productId })) {
      case (?p) p;
      case null return null;
    };
    if (product.stock == 0) return null;

    let userItems = switch (carts.get(userId)) {
      case (?list) list;
      case null {
        let newList = List.empty<CartItem>();
        carts.add(userId, newList);
        newList;
      };
    };

    // If same product+size+color exists, increment quantity
    let existing = userItems.find(func(ci) {
      ci.productId == req.productId and ci.size == req.size and ci.color == req.color
    });
    switch (existing) {
      case (?ci) {
        userItems.mapInPlace(func(item : CartItem) : CartItem {
          if (item.id == ci.id) {
            { item with quantity = item.quantity + req.quantity }
          } else item
        });
      };
      case null {
        let newItem : CartItem = {
          id = nextCartItemId;
          productId = req.productId;
          productName = product.name;
          productTier = product.tier;
          price = product.price;
          imageUrl = if (product.imageUrls.size() > 0) ?product.imageUrls[0] else null;
          size = req.size;
          color = req.color;
          quantity = req.quantity;
          addedAt = Time.now();
        };
        userItems.add(newItem);
      };
    };

    ?getCart(carts, userId);
  };

  public func removeFromCart(
    carts : Map.Map<UserId, List.List<CartItem>>,
    userId : UserId,
    cartItemId : CartItemId,
  ) : Cart {
    switch (carts.get(userId)) {
      case (?list) {
        let kept = list.filter(func(ci) { ci.id != cartItemId });
        carts.add(userId, kept);
      };
      case null {};
    };
    getCart(carts, userId);
  };

  public func updateCartItemQuantity(
    carts : Map.Map<UserId, List.List<CartItem>>,
    userId : UserId,
    cartItemId : CartItemId,
    quantity : Nat,
  ) : ?Cart {
    switch (carts.get(userId)) {
      case (?list) {
        let found = list.find(func(ci) { ci.id == cartItemId });
        switch (found) {
          case null return null;
          case (?_) {
            if (quantity == 0) {
              let kept = list.filter(func(ci) { ci.id != cartItemId });
              carts.add(userId, kept);
            } else {
              list.mapInPlace(func(ci : CartItem) : CartItem {
                if (ci.id == cartItemId) { { ci with quantity } } else ci
              });
            };
          };
        };
      };
      case null return null;
    };
    ?getCart(carts, userId);
  };

  public func clearCart(
    carts : Map.Map<UserId, List.List<CartItem>>,
    userId : UserId,
  ) {
    switch (carts.get(userId)) {
      case (?list) list.clear();
      case null {};
    };
  };
};
