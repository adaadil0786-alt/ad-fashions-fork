import type { Principal } from "@icp-sdk/core/principal";
export interface Some<T> {
    __kind__: "Some";
    value: T;
}
export interface None {
    __kind__: "None";
}
export type Option<T> = Some<T> | None;
export type ProductColor = string;
export interface Product {
    id: ProductId;
    imageUrls: Array<string>;
    name: string;
    createdAt: Timestamp;
    tier: ProductTier;
    description: string;
    sizes: Array<ProductSize>;
    updatedAt: Timestamp;
    stock: bigint;
    colors: Array<ProductColor>;
    price: bigint;
}
export type Timestamp = bigint;
export interface OrderItem {
    color?: string;
    size?: string;
    productId: ProductId;
    productName: string;
    productTier: ProductTier;
    quantity: bigint;
    price: bigint;
}
export interface Order {
    id: OrderId;
    tax: bigint;
    status: OrderStatus;
    total: bigint;
    userId: UserId;
    createdAt: Timestamp;
    updatedAt: Timestamp;
    stripePaymentIntentId?: string;
    items: Array<OrderItem>;
    orderNumber: string;
    subtotal: bigint;
}
export interface OrderItemRequest {
    color?: string;
    size?: string;
    productId: ProductId;
    quantity: bigint;
}
export type UserId = Principal;
export type ProductSize = string;
export interface CreateProductRequest {
    imageUrls: Array<string>;
    name: string;
    tier: ProductTier;
    description: string;
    sizes: Array<ProductSize>;
    stock: bigint;
    colors: Array<ProductColor>;
    price: bigint;
}
export interface AddToCartRequest {
    color?: string;
    size?: string;
    productId: ProductId;
    quantity: bigint;
}
export interface Cart {
    tax: bigint;
    total: bigint;
    userId: UserId;
    items: Array<CartItem>;
    subtotal: bigint;
}
export type ProductId = bigint;
export interface CreateOrderRequest {
    items: Array<OrderItemRequest>;
}
export type CartItemId = bigint;
export interface CartItem {
    id: CartItemId;
    color?: string;
    size?: string;
    productId: ProductId;
    productName: string;
    productTier: ProductTier;
    imageUrl?: string;
    addedAt: Timestamp;
    quantity: bigint;
    price: bigint;
}
export type OrderId = bigint;
export interface UpdateProductRequest {
    imageUrls?: Array<string>;
    name?: string;
    tier?: ProductTier;
    description?: string;
    sizes?: Array<ProductSize>;
    stock?: bigint;
    colors?: Array<ProductColor>;
    price?: bigint;
}
export enum OrderStatus {
    shipped = "shipped",
    cancelled = "cancelled",
    pending = "pending",
    paid = "paid",
    completed = "completed",
    processing = "processing"
}
export enum ProductTier {
    premium = "premium",
    average = "average",
    basic = "basic"
}
export enum UserRole {
    admin = "admin",
    user = "user",
    guest = "guest"
}
export interface backendInterface {
    addToCart(req: AddToCartRequest): Promise<Cart | null>;
    assignCallerUserRole(user: Principal, role: UserRole): Promise<void>;
    clearMyCart(): Promise<void>;
    createOrder(req: CreateOrderRequest): Promise<Order | null>;
    createProduct(req: CreateProductRequest): Promise<Product>;
    deleteProduct(id: ProductId): Promise<boolean>;
    getCallerUserRole(): Promise<UserRole>;
    getMyCart(): Promise<Cart>;
    getMyOrders(): Promise<Array<Order>>;
    getOrder(id: OrderId): Promise<Order | null>;
    getProduct(id: ProductId): Promise<Product | null>;
    isCallerAdmin(): Promise<boolean>;
    listAllOrders(): Promise<Array<Order>>;
    listOrdersByStatus(status: OrderStatus): Promise<Array<Order>>;
    listProducts(): Promise<Array<Product>>;
    listProductsByTier(tier: ProductTier): Promise<Array<Product>>;
    removeFromCart(cartItemId: CartItemId): Promise<Cart>;
    searchProducts(searchTerm: string): Promise<Array<Product>>;
    setOrderPaymentIntent(id: OrderId, paymentIntentId: string): Promise<Order | null>;
    updateCartItemQuantity(cartItemId: CartItemId, quantity: bigint): Promise<Cart | null>;
    updateOrderStatus(id: OrderId, status: OrderStatus): Promise<Order | null>;
    updateProduct(id: ProductId, req: UpdateProductRequest): Promise<Product | null>;
    updateStock(id: ProductId, newStock: bigint): Promise<Product | null>;
}
