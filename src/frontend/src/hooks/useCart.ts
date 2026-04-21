import type { CartItem, Product } from "@/types";
import { useCallback, useEffect, useState } from "react";

const CART_STORAGE_KEY = "ad_fashions_cart";

function loadCart(): CartItem[] {
  try {
    const raw = localStorage.getItem(CART_STORAGE_KEY);
    return raw ? (JSON.parse(raw) as CartItem[]) : [];
  } catch {
    return [];
  }
}

function saveCart(items: CartItem[]): void {
  localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(items));
}

export interface CartState {
  items: CartItem[];
  itemCount: number;
  totalAmount: number;
  addItem: (
    product: Product,
    size: string,
    color: string,
    qty?: number,
  ) => void;
  removeItem: (productId: string, size: string, color: string) => void;
  updateQuantity: (
    productId: string,
    size: string,
    color: string,
    qty: number,
  ) => void;
  clearCart: () => void;
}

export function useCart(): CartState {
  const [items, setItems] = useState<CartItem[]>(loadCart);

  useEffect(() => {
    saveCart(items);
  }, [items]);

  const addItem = useCallback(
    (product: Product, size: string, color: string, qty = 1) => {
      setItems((prev) => {
        const idx = prev.findIndex(
          (i) =>
            i.product.id === product.id &&
            i.selectedSize === size &&
            i.selectedColor === color,
        );
        if (idx >= 0) {
          const updated = [...prev];
          updated[idx] = {
            ...updated[idx],
            quantity: updated[idx].quantity + qty,
          };
          return updated;
        }
        return [
          ...prev,
          { product, quantity: qty, selectedSize: size, selectedColor: color },
        ];
      });
    },
    [],
  );

  const removeItem = useCallback(
    (productId: string, size: string, color: string) => {
      setItems((prev) =>
        prev.filter(
          (i) =>
            !(
              i.product.id === productId &&
              i.selectedSize === size &&
              i.selectedColor === color
            ),
        ),
      );
    },
    [],
  );

  const updateQuantity = useCallback(
    (productId: string, size: string, color: string, qty: number) => {
      if (qty <= 0) {
        removeItem(productId, size, color);
        return;
      }
      setItems((prev) =>
        prev.map((i) =>
          i.product.id === productId &&
          i.selectedSize === size &&
          i.selectedColor === color
            ? { ...i, quantity: qty }
            : i,
        ),
      );
    },
    [removeItem],
  );

  const clearCart = useCallback(() => setItems([]), []);

  const itemCount = items.reduce((sum, i) => sum + i.quantity, 0);
  const totalAmount = items.reduce(
    (sum, i) => sum + i.product.price * i.quantity,
    0,
  );

  return {
    items,
    itemCount,
    totalAmount,
    addItem,
    removeItem,
    updateQuantity,
    clearCart,
  };
}
