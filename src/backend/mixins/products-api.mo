import Runtime "mo:core/Runtime";
import Types "../types/products";
import CommonTypes "../types/common";
import List "mo:core/List";
import ProductLib "../lib/products";

mixin (
  products : List.List<Types.Product>,
  productCounter : CommonTypes.Counter,
) {
  // Initialize sample data on first call
  ProductLib.seedSampleProducts(products, productCounter);

  public shared query func listProducts() : async [Types.Product] {
    ProductLib.listProducts(products)
  };

  public shared query func listProductsByTier(tier : CommonTypes.ProductTier) : async [Types.Product] {
    ProductLib.listProductsByTier(products, tier)
  };

  public shared query func getProduct(id : CommonTypes.ProductId) : async ?Types.Product {
    ProductLib.getProduct(products, id)
  };

  public shared query func searchProducts(searchTerm : Text) : async [Types.Product] {
    ProductLib.searchProducts(products, searchTerm)
  };

  public shared ({ caller }) func createProduct(req : Types.CreateProductRequest) : async Types.Product {
    if (caller.isAnonymous()) Runtime.trap("Unauthorized");
    let id = productCounter.value;
    productCounter.value += 1;
    ProductLib.createProduct(products, id, req)
  };

  public shared ({ caller }) func updateProduct(id : CommonTypes.ProductId, req : Types.UpdateProductRequest) : async ?Types.Product {
    if (caller.isAnonymous()) Runtime.trap("Unauthorized");
    ProductLib.updateProduct(products, id, req)
  };

  public shared ({ caller }) func deleteProduct(id : CommonTypes.ProductId) : async Bool {
    if (caller.isAnonymous()) Runtime.trap("Unauthorized");
    ProductLib.deleteProduct(products, id)
  };

  public shared ({ caller }) func updateStock(id : CommonTypes.ProductId, newStock : Nat) : async ?Types.Product {
    if (caller.isAnonymous()) Runtime.trap("Unauthorized");
    ProductLib.updateStock(products, id, newStock)
  };
};
