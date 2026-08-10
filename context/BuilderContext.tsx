"use client";

import React, { createContext, useContext, useState, useMemo, useCallback } from "react";
import { Desk, Product, SlotType, getDesks, getProducts } from "@/lib/catalog";

export type PlacedItem = {
  product_id: string;
  slot_type: SlotType;
  slot_index?: number;
};

export type BuilderContextType = {
  selectedDesk: Desk;
  placedItems: PlacedItem[];
  placedProducts: Product[];
  toastMessage: string | null;
  totalPerWeek: number;
  addItem: (product: Product) => void;
  removeItem: (productId: string) => void;
  swapDesk: (deskId: string) => void;
  clearToast: () => void;
};

const BuilderContext = createContext<BuilderContextType | undefined>(undefined);

export function BuilderProvider({ children }: { children: React.ReactNode }) {
  const allDesks = useMemo(() => getDesks(), []);
  const allProducts = useMemo(() => getProducts(), []);

  // Initial Desk
  const [selectedDesk, setSelectedDesk] = useState<Desk>(allDesks[0]);

  // Initial Placed Items: default chair is pre-placed on page load
  const [placedItems, setPlacedItems] = useState<PlacedItem[]>([
    {
      product_id: "chair-ergonomic-h2",
      slot_type: "chair",
      slot_index: 0,
    },
  ]);

  // Toast feedback state
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const showToast = useCallback((message: string) => {
    setToastMessage(message);
    setTimeout(() => {
      setToastMessage((current) => (current === message ? null : current));
    }, 3200);
  }, []);

  const clearToast = useCallback(() => {
    setToastMessage(null);
  }, []);

  // Map placed items to product objects
  const placedProducts = useMemo(() => {
    return placedItems
      .map((item) => allProducts.find((p) => p.product_id === item.product_id))
      .filter((p): p is Product => p !== undefined);
  }, [placedItems, allProducts]);

  // Total weekly price computation
  const totalPerWeek = useMemo(() => {
    const itemsTotal = placedProducts.reduce((sum, p) => sum + p.price_per_week, 0);
    return selectedDesk.price_per_week + itemsTotal;
  }, [selectedDesk, placedProducts]);

  // Swap desk
  const swapDesk = useCallback(
    (deskId: string) => {
      const newDesk = allDesks.find((d) => d.desk_id === deskId);
      if (newDesk) {
        setSelectedDesk(newDesk);
      }
    },
    [allDesks]
  );

  // Add or Replace item without maximum limit blocking
  const addItem = useCallback(
    (product: Product) => {
      if (product.stock_status === "unavailable") {
        showToast(`"${product.name}" is currently out of stock.`);
        return;
      }

      const slotType = product.slot_type;

      setPlacedItems((prev) => {
        // Check if item is already placed
        const isAlreadyPlaced = prev.some((item) => item.product_id === product.product_id);
        if (isAlreadyPlaced) {
          // Toggle off if clicked again
          return prev.filter((item) => item.product_id !== product.product_id);
        }

        if (slotType === "chair" || slotType === "monitor") {
          // Swap single slot item (e.g., chair or monitor)
          const remainingOtherSlots = prev.filter((item) => item.slot_type !== slotType);
          return [
            ...remainingOtherSlots,
            { product_id: product.product_id, slot_type: slotType, slot_index: 0 },
          ];
        } else {
          // Allow adding multiple accessories freely without limit restriction
          const existingInSlot = prev.filter((item) => item.slot_type === slotType);
          const slotIndex = existingInSlot.length;
          return [
            ...prev,
            { product_id: product.product_id, slot_type: slotType, slot_index: slotIndex },
          ];
        }
      });
    },
    [showToast]
  );

  // Remove item
  const removeItem = useCallback((productId: string) => {
    setPlacedItems((prev) => prev.filter((item) => item.product_id !== productId));
  }, []);

  const value = {
    selectedDesk,
    placedItems,
    placedProducts,
    toastMessage,
    totalPerWeek,
    addItem,
    removeItem,
    swapDesk,
    clearToast,
  };

  return <BuilderContext.Provider value={value}>{children}</BuilderContext.Provider>;
}

export function useBuilder() {
  const context = useContext(BuilderContext);
  if (!context) {
    throw new Error("useBuilder must be used within a BuilderProvider");
  }
  return context;
}
