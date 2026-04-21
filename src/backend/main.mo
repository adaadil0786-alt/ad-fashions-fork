import List "mo:core/List";
import Map "mo:core/Map";
import AccessControl "mo:caffeineai-authorization/access-control";
import MixinAuthorization "mo:caffeineai-authorization/MixinAuthorization";

import ProductTypes "types/products";
import CartTypes "types/cart";
import OrderTypes "types/orders";
import CommonTypes "types/common";

import ProductsMixin "mixins/products-api";
import OrdersMixin "mixins/orders-api";
import CartMixin "mixins/cart-api";

actor {
  let accessControlState = AccessControl.initState();
  include MixinAuthorization(accessControlState);

  let products = List.empty<ProductTypes.Product>();
  let orders = List.empty<OrderTypes.Order>();
  let userOrders = Map.empty<CommonTypes.UserId, List.List<CommonTypes.OrderId>>();
  let carts = Map.empty<CommonTypes.UserId, List.List<CartTypes.CartItem>>();
  let productCounter : CommonTypes.Counter = { var value = 1 };
  let orderCounter : CommonTypes.Counter = { var value = 1 };
  let cartItemCounter : CommonTypes.Counter = { var value = 1 };

  include ProductsMixin(products, productCounter);
  include OrdersMixin(accessControlState, orders, userOrders, products, orderCounter);
  include CartMixin(accessControlState, carts, products, cartItemCounter);
};
