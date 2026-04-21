import Common "common";

module {
  public type UserId = Common.UserId;
  public type ProductId = Common.ProductId;
  public type CartItemId = Common.CartItemId;
  public type Timestamp = Common.Timestamp;

  public type CartItem = {
    id : CartItemId;
    productId : ProductId;
    productName : Text;
    productTier : Common.ProductTier;
    price : Nat;
    imageUrl : ?Text;
    size : ?Text;
    color : ?Text;
    quantity : Nat;
    addedAt : Timestamp;
  };

  public type Cart = {
    userId : UserId;
    items : [CartItem];
    subtotal : Nat;
    tax : Nat;
    total : Nat;
  };

  public type AddToCartRequest = {
    productId : ProductId;
    size : ?Text;
    color : ?Text;
    quantity : Nat;
  };
};
