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

const initialCartState = {
  cartItems: [],
  isCartOpen: false,
};

// The reducer function handles all state changes for the cart
function cartReducer(state, action) {
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

  // --- Calculated Values ---
  const totalItems = state.cartItems.reduce(
    (sum, item) => sum + item.quantity,
    0
  );
  const totalPrice = state.cartItems.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );

  const value = {
    ...state,
    addToCart,
    removeFromCart,
    updateQuantity,
    clearCart,
    totalItems,
    totalPrice,
    flyingItems,
    removeFlyingItem,
    setIsCartOpen,
  };

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
};

export const useCart = () => useContext(CartContext);
