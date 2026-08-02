// frontend/src/context/CartContext.test.js — cart reducer unit tests (pure logic, no DOM)
import { cartReducer, initialCartState } from "./CartContext";

const item = { id: "1", name: "اسپرسو", price: 65, quantity: 1 };

describe("cartReducer", () => {
  test("ADD new item", () => {
    const state = cartReducer(initialCartState, { type: "ADD", payload: { item, quantity: 1 } });
    expect(state.cartItems).toHaveLength(1);
    expect(state.cartItems[0]).toEqual({ ...item, quantity: 1 });
  });

  test("ADD existing item merges quantity", () => {
    let state = cartReducer(initialCartState, { type: "ADD", payload: { item, quantity: 1 } });
    state = cartReducer(state, { type: "ADD", payload: { item, quantity: 2 } });
    expect(state.cartItems).toHaveLength(1);
    expect(state.cartItems[0].quantity).toBe(3);
  });

  test("ADD syrup variant keeps separate line (id 1-s53)", () => {
    const syrupItem = { ...item, id: "1-s53", name: "اسپرسو (با سیروپ وانیل)", price: 105 };
    let state = cartReducer(initialCartState, { type: "ADD", payload: { item, quantity: 1 } });
    state = cartReducer(state, { type: "ADD", payload: { item: syrupItem, quantity: 1 } });
    expect(state.cartItems).toHaveLength(2);
  });

  test("UPDATE_QUANTITY", () => {
    let state = cartReducer(initialCartState, { type: "ADD", payload: { item, quantity: 1 } });
    state = cartReducer(state, { type: "UPDATE_QUANTITY", payload: { itemId: "1", newQuantity: 4 } });
    expect(state.cartItems[0].quantity).toBe(4);
  });

  test("UPDATE_QUANTITY below 1 removes item", () => {
    let state = cartReducer(initialCartState, { type: "ADD", payload: { item, quantity: 1 } });
    state = cartReducer(state, { type: "UPDATE_QUANTITY", payload: { itemId: "1", newQuantity: 0 } });
    expect(state.cartItems).toHaveLength(0);
  });

  test("REMOVE", () => {
    let state = cartReducer(initialCartState, { type: "ADD", payload: { item, quantity: 1 } });
    state = cartReducer(state, { type: "REMOVE", payload: { itemId: "1" } });
    expect(state.cartItems).toHaveLength(0);
  });

  test("CLEAR", () => {
    let state = cartReducer(initialCartState, { type: "ADD", payload: { item, quantity: 1 } });
    state = cartReducer(state, { type: "CLEAR" });
    expect(state.cartItems).toHaveLength(0);
  });

  test("SET_IS_CART_OPEN", () => {
    const state = cartReducer(initialCartState, { type: "SET_IS_CART_OPEN", payload: true });
    expect(state.isCartOpen).toBe(true);
  });

  test("SET_FROM_STORAGE", () => {
    const state = cartReducer(initialCartState, {
      type: "SET_FROM_STORAGE",
      payload: [{ ...item, quantity: 2 }],
    });
    expect(state.cartItems).toHaveLength(1);
    expect(state.cartItems[0].quantity).toBe(2);
  });

  test("unknown action throws", () => {
    expect(() => cartReducer(initialCartState, { type: "NOPE" })).toThrow();
  });
});
