// src/context/CartContext.jsx
import React, {
  useReducer,
  useEffect,
  useState,
  useContext,
  createContext,
} from "react";

// Actions for the cart reducer, kept here for simplicity
const CART_ACTIONS = {
  SET_FROM_STORAGE: "SET_FROM_STORAGE",
  ADD: "ADD",
  UPDATE_QUANTITY: "UPDATE_QUANTITY",
  REMOVE: "REMOVE",
  CLEAR: "CLEAR",
  SET_IS_CART_OPEN: "SET_IS_CART_OPEN",
};

const CartContext = createContext(null);

// Bestseller promo — must mirror MenuCard discount for consistent pricing.
export const BESTSELLER_DISCOUNT = 0.2;

// Store coupon codes → { pct, label }. Codes in the demo are fixed;
// a real backend would validate against a coupon table instead.
const COUPONS = {
  MEHRAS10: { pct: 0.1, label: "فقط ۱۰٪ (کد کافه)" },
  WELCOME20: { pct: 0.2, label: "۲۰٪ مهمان ویژه" },
};

export const discountOf = (item) =>
  item.label === "پرفروش" && item.price != null
    ? Math.round(item.price * BESTSELLER_DISCOUNT)
    : 0;

// Discounted line price of an item (bestseller discount applied on top of raw price).
export const linePrice = (item) =>
  item.price != null ? item.price - discountOf(item) : 0;

export const initialCartState = {
  cartItems: [],
  isCartOpen: false,
};

export function cartReducer(state, action) {
  switch (action.type) {
    case CART_ACTIONS.SET_FROM_STORAGE:
      return { ...state, cartItems: action.payload };

    case CART_ACTIONS.ADD: {
      const { item, quantity } = action.payload;
      const existingItem = state.cartItems.find((i) => i.id === item.id);
      if (existingItem) {
        // If item exists, just increase quantity
        return {
          ...state,
          cartItems: state.cartItems.map((i) =>
            i.id === item.id ? { ...i, quantity: i.quantity + quantity } : i
          ),
        };
      }
      // Otherwise, add new item to cart
      return {
        ...state,
        cartItems: [...state.cartItems, { ...item, quantity }],
      };
    }

    case CART_ACTIONS.UPDATE_QUANTITY: {
      const { itemId, newQuantity } = action.payload;
      // If quantity is less than 1, remove the item
      if (newQuantity < 1) {
        return {
          ...state,
          cartItems: state.cartItems.filter((i) => i.id !== itemId),
        };
      }
      return {
        ...state,
        cartItems: state.cartItems.map((i) =>
          i.id === itemId ? { ...i, quantity: newQuantity } : i
        ),
      };
    }

    case CART_ACTIONS.REMOVE:
      return {
        ...state,
        cartItems: state.cartItems.filter(
          (i) => i.id !== action.payload.itemId
        ),
      };

    case CART_ACTIONS.CLEAR:
      return { ...state, cartItems: [] };

    case CART_ACTIONS.SET_IS_CART_OPEN:
      return { ...state, isCartOpen: action.payload };

    default:
      throw new Error(`Unhandled action type: ${action.type}`);
  }
}

export const CartProvider = ({ children }) => {
  const [state, dispatch] = useReducer(cartReducer, initialCartState);
  const [flyingItems, setFlyingItems] = useState([]);
  // coupon state: applied code + validation result
  const [coupon, setCoupon] = useState(() =>
    JSON.parse(localStorage.getItem("coupon") || "null")
  );
  const [couponError, setCouponError] = useState(null);

  // Load cart from localStorage on initial render
  useEffect(() => {
    try {
      const storedCart = localStorage.getItem("cartItems");
      if (storedCart) {
        dispatch({
          type: CART_ACTIONS.SET_FROM_STORAGE,
          payload: JSON.parse(storedCart),
        });
      }
    } catch (error) {
      console.error("Failed to parse cart from localStorage", error);
    }
  }, []);

  // Save cart to localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem("cartItems", JSON.stringify(state.cartItems));
  }, [state.cartItems]);

  // --- Cart Actions ---
  const addToCart = (item, quantity = 1, imageElement = null) => {
    if (imageElement) {
      const rect = imageElement.getBoundingClientRect();
      setFlyingItems((prev) => [
        ...prev,
        { ...item, instanceId: Date.now(), startRect: rect },
      ]);
    }
    dispatch({ type: CART_ACTIONS.ADD, payload: { item, quantity } });
  };

  const removeFromCart = (itemId) =>
    dispatch({ type: CART_ACTIONS.REMOVE, payload: { itemId } });
  const updateQuantity = (itemId, newQuantity) =>
    dispatch({
      type: CART_ACTIONS.UPDATE_QUANTITY,
      payload: { itemId, newQuantity },
    });
  const clearCart = () => dispatch({ type: CART_ACTIONS.CLEAR });
  const setIsCartOpen = (isOpen) =>
    dispatch({ type: CART_ACTIONS.SET_IS_CART_OPEN, payload: isOpen });

  const removeFlyingItem = (instanceId) => {
    setFlyingItems((prev) => prev.filter((i) => i.instanceId !== instanceId));
  };

  // ── Coupon helpers ──
  const applyCoupon = (code) => {
    const key = String(code || "").trim().toUpperCase();
    const found = COUPONS[key];
    if (!found) {
      setCouponError("کد تخفیف معتبر نیست");
      return false;
    }
    setCoupon({ code: key, pct: found.pct, label: found.label });
    setCouponError(null);
    localStorage.setItem("coupon", JSON.stringify({ code: key, pct: found.pct, label: found.label }));
    return true;
  };
  const removeCoupon = () => {
    setCoupon(null);
    setCouponError(null);
    localStorage.removeItem("coupon");
  };

  // --- Calculated Values (bestseller discount + coupon applied) ---
  const totalItems = state.cartItems.reduce(
    (sum, item) => sum + item.quantity,
    0
  );
  const discountTotal = state.cartItems.reduce(
    (sum, item) => sum + discountOf(item) * item.quantity,
    0
  );
  // subtotal after product-level (bestseller) discount
  const subtotal = state.cartItems.reduce(
    (sum, item) => sum + linePrice(item) * item.quantity,
    0
  );
  const couponDiscount = coupon ? Math.round(subtotal * coupon.pct) : 0;
  const totalPrice = subtotal - couponDiscount;

  const value = {
    ...state,
    addToCart,
    removeFromCart,
    updateQuantity,
    clearCart,
    totalItems,
    totalPrice,
    discountTotal,
    subtotal,
    coupon,
    couponDiscount,
    couponError,
    applyCoupon,
    removeCoupon,
    flyingItems,
    removeFlyingItem,
    setIsCartOpen,
  };

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
};

export const useCart = () => useContext(CartContext);
