import Common "common";

module {
  public type ProductId = Common.ProductId;
  public type ProductTier = Common.ProductTier;
  public type Timestamp = Common.Timestamp;

  public type ProductSize = Text;  // e.g. "XS", "S", "M", "L", "XL", "XXL", "Free Size"
  public type ProductColor = Text; // e.g. "Red", "Blue", "Green"

  public type Product = {
    id : ProductId;
    name : Text;
    description : Text;
    tier : ProductTier;
    price : Nat;          // price in paise (smallest currency unit)
    imageUrls : [Text];
    sizes : [ProductSize];
    colors : [ProductColor];
    stock : Nat;
    createdAt : Timestamp;
    updatedAt : Timestamp;
  };

  public type CreateProductRequest = {
    name : Text;
    description : Text;
    tier : ProductTier;
    price : Nat;
    imageUrls : [Text];
    sizes : [ProductSize];
    colors : [ProductColor];
    stock : Nat;
  };

  public type UpdateProductRequest = {
    name : ?Text;
    description : ?Text;
    tier : ?ProductTier;
    price : ?Nat;
    imageUrls : ?[Text];
    sizes : ?[ProductSize];
    colors : ?[ProductColor];
    stock : ?Nat;
  };
};
