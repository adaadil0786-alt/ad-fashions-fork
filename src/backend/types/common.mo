module {
  public type UserId = Principal;
  public type ProductId = Nat;
  public type OrderId = Nat;
  public type CartItemId = Nat;
  public type Timestamp = Int;

  public type Counter = { var value : Nat };

  public type ProductTier = {
    #premium;
    #average;
    #basic;
  };

  public type OrderStatus = {
    #pending;
    #paid;
    #processing;
    #shipped;
    #completed;
    #cancelled;
  };
};
