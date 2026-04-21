import Time "mo:core/Time";
import List "mo:core/List";
import Types "../types/products";
import CommonTypes "../types/common";

module {
  public type Product = Types.Product;
  public type CreateProductRequest = Types.CreateProductRequest;
  public type UpdateProductRequest = Types.UpdateProductRequest;
  public type ProductId = CommonTypes.ProductId;
  public type ProductTier = CommonTypes.ProductTier;

  public func listProducts(products : List.List<Product>) : [Product] {
    products.toArray()
  };

  public func listProductsByTier(products : List.List<Product>, tier : ProductTier) : [Product] {
    products.filter(func(p) { p.tier == tier }).toArray()
  };

  public func getProduct(products : List.List<Product>, id : ProductId) : ?Product {
    products.find(func(p) { p.id == id })
  };

  public func searchProducts(products : List.List<Product>, searchTerm : Text) : [Product] {
    let lower = searchTerm.toLower();
    products.filter(func(p) {
      p.name.toLower().contains(#text lower) or p.description.toLower().contains(#text lower)
    }).toArray()
  };

  public func createProduct(
    products : List.List<Product>,
    nextId : Nat,
    req : CreateProductRequest,
  ) : Product {
    let now = Time.now();
    let product : Product = {
      id = nextId;
      name = req.name;
      description = req.description;
      tier = req.tier;
      price = req.price;
      imageUrls = req.imageUrls;
      sizes = req.sizes;
      colors = req.colors;
      stock = req.stock;
      createdAt = now;
      updatedAt = now;
    };
    products.add(product);
    product
  };

  public func updateProduct(
    products : List.List<Product>,
    id : ProductId,
    req : UpdateProductRequest,
  ) : ?Product {
    var updated : ?Product = null;
    products.mapInPlace(func(p) {
      if (p.id == id) {
        let now = Time.now();
        let newProduct : Product = {
          id = p.id;
          name = switch (req.name) { case (?v) v; case null p.name };
          description = switch (req.description) { case (?v) v; case null p.description };
          tier = switch (req.tier) { case (?v) v; case null p.tier };
          price = switch (req.price) { case (?v) v; case null p.price };
          imageUrls = switch (req.imageUrls) { case (?v) v; case null p.imageUrls };
          sizes = switch (req.sizes) { case (?v) v; case null p.sizes };
          colors = switch (req.colors) { case (?v) v; case null p.colors };
          stock = switch (req.stock) { case (?v) v; case null p.stock };
          createdAt = p.createdAt;
          updatedAt = now;
        };
        updated := ?newProduct;
        newProduct
      } else {
        p
      }
    });
    updated
  };

  public func deleteProduct(products : List.List<Product>, id : ProductId) : Bool {
    let sizeBefore = products.size();
    let remaining = products.filter(func(p) { p.id != id });
    products.clear();
    products.append(remaining);
    products.size() < sizeBefore
  };

  public func updateStock(products : List.List<Product>, id : ProductId, newStock : Nat) : ?Product {
    updateProduct(products, id, {
      name = null;
      description = null;
      tier = null;
      price = null;
      imageUrls = null;
      sizes = null;
      colors = null;
      stock = ?newStock;
    })
  };

  public func decrementStock(products : List.List<Product>, id : ProductId, quantity : Nat) : Bool {
    switch (products.find(func(p) { p.id == id })) {
      case null false;
      case (?p) {
        if (p.stock < quantity) {
          false
        } else {
          let _ = updateStock(products, id, p.stock - quantity);
          true
        }
      };
    }
  };

  // Seed sample products (called once on first deploy)
  public func seedSampleProducts(products : List.List<Product>, counter : CommonTypes.Counter) {
    if (products.size() > 0) return;

    let samples : [(Text, Text, ProductTier, Nat, [Text], [Text], Nat)] = [
      // Premium
      ("Silk Embroidered Kurti", "Luxurious pure silk kurti with intricate hand embroidery. Perfect for festive occasions.", #premium, 289900, ["XS", "S", "M", "L", "XL"], ["Ivory", "Royal Blue", "Deep Maroon"], 25),
      ("Designer Palazzo Set", "Elegant palazzo pants paired with a flowy printed top. Premium georgette fabric.", #premium, 349900, ["S", "M", "L", "XL", "XXL"], ["Peach", "Mint Green", "Lavender"], 20),
      ("Banarasi Silk Kurta", "Authentic Banarasi silk kurta with zari work. A timeless classic for special events.", #premium, 459900, ["XS", "S", "M", "L", "XL"], ["Gold", "Ruby Red", "Emerald Green"], 15),
      // Average
      ("Floral Printed Kurti", "Vibrant floral print kurti in soft cotton blend. Comfortable for daily wear.", #average, 89900, ["XS", "S", "M", "L", "XL", "XXL"], ["Pink Floral", "Blue Floral", "Yellow Floral"], 60),
      ("Rayon Anarkali Suit", "Beautiful anarkali style suit in rayon fabric with contrast dupatta.", #average, 129900, ["S", "M", "L", "XL", "XXL"], ["Teal", "Coral", "Sky Blue"], 45),
      ("Cotton Palazzo Pants", "Comfortable wide-leg palazzo pants in breathable cotton. Easy casual style.", #average, 69900, ["S", "M", "L", "XL", "XXL", "Free Size"], ["Black", "Navy", "Beige", "Olive"], 80),
      // Basic
      ("Simple Cotton Kurti", "Everyday cotton kurti with minimal design. Easy to wash and maintain.", #basic, 39900, ["S", "M", "L", "XL", "XXL"], ["White", "Light Pink", "Sky Blue"], 120),
      ("Basic Churidar Set", "Classic churidar salwar with straight kurta. Comfortable for all-day wear.", #basic, 54900, ["S", "M", "L", "XL", "XXL"], ["Mustard", "Grey", "Maroon"], 100),
      ("Casual Tunic Top", "Lightweight tunic top suitable for casual outings. Pairs well with leggings.", #basic, 29900, ["Free Size", "S", "M", "L", "XL"], ["Orange", "Purple", "Dark Green"], 150),
    ];

    for ((name, desc, tier, price, sizes, colors, stock) in samples.vals()) {
      let now = Time.now();
      let product : Product = {
        id = counter.value;
        name;
        description = desc;
        tier;
        price;
        imageUrls = [];
        sizes;
        colors;
        stock;
        createdAt = now;
        updatedAt = now;
      };
      products.add(product);
      counter.value += 1;
    };
  };
};
