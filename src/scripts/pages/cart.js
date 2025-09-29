// cart.js
const STORAGE_KEY = "cart:v1";

function readCart() {
  try {
    return JSON.parse(localStorage.getItem(STORAGE_KEY)) ?? [];
  } catch {
    return [];
  }
}
function writeCart(cart) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(cart));
  window.dispatchEvent(new CustomEvent("cart:updated", { detail: getCartSummary() }));
}

export function getCart() {
  return readCart();
}
export function clearCart() {
  writeCart([]);
}
export function addToCart(product, qty = 1) {
  const cart = readCart();
  const idx = cart.findIndex(i => i.id === product.id);
  if (idx >= 0) {
    cart[idx].qty += qty;
  } else {
    cart.push({
      id: product.id,
      title: product.title,
      price: product.price,
      image: product.image,
      qty
    });
  }
  writeCart(cart);
}
export function setQty(id, qty) {
  const cart = readCart().map(i => i.id === id ? { ...i, qty: Math.max(1, qty) } : i);
  writeCart(cart);
}
export function changeQty(id, delta) {
  const cart = readCart().map(i => i.id === id ? { ...i, qty: Math.max(1, i.qty + delta) } : i);
  writeCart(cart);
}
export function removeItem(id) {
  const cart = readCart().filter(i => i.id !== id);
  writeCart(cart);
}
export function getCartSummary() {
  const cart = readCart();
  const count = cart.reduce((a, i) => a + i.qty, 0);
  const total = cart.reduce((a, i) => a + i.qty * i.price, 0);
  return { count, total };
}
export function getCartCount() {
  return getCartSummary().count;
}
export function getCartTotal() {
  return getCartSummary().total;
}
