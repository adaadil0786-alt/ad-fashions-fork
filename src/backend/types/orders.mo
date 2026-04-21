import Common "common";

module {
  public type UserId = Common.UserId;
  public type ProductId = Common.ProductId;
  public type OrderId = Common.OrderId;
  public type OrderStatus = Common.OrderStatus;
  public type Timestamp = Common.Timestamp;

  public type OrderItem = {
    productId : ProductId;
    productName : Text;
    productTier : Common.ProductTier;
    price : Nat;
    size : ?Text;
    color : ?Text;
    quantity : Nat;
  };

  public type Order = {
    id : OrderId;
    orderNumber : Text;
    userId : UserId;
    items : [OrderItem];
    subtotal : Nat;
    tax : Nat;
    total : Nat;
    status : OrderStatus;
    stripePaymentIntentId : ?Text;
    createdAt : Timestamp;
    updatedAt : Timestamp;
  };

  public type CreateOrderRequest = {
    items : [OrderItemRequest];
  };

  public type OrderItemRequest = {
    productId : ProductId;
    size : ?Text;
    color : ?Text;
    quantity : Nat;
  };
};
