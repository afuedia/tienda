// carrito.js
import { getCart, changeQty, removeItem, getCartTotal, clearCart } from "./cart.js";

const cont = document.getElementById("cart");

function render() {
  const cart = getCart();
  cont.innerHTML = "";

  if (cart.length === 0) {
    cont.innerHTML = `<p class="cart-empty">Tu carrito está vacío.</p>`;
    return;
  }

  // Items
  cart.forEach(item => {
    const row = document.createElement("div");
    row.className = "cart-item";
    row.innerHTML = `
      <img src="${item.image}" alt="">
      <div>
        <div style="font-weight:600">${item.title}</div>
        <div style="opacity:.7">${item.price.toFixed(2)} €</div>
      </div>
      <div class="qty">
        <button data-act="dec" data-id="${item.id}">−</button>
        <span>${item.qty}</span>
        <button data-act="inc" data-id="${item.id}">+</button>
      </div>
      <div style="min-width:80px; text-align:right">${(item.qty * item.price).toFixed(2)} €</div>
      <div><button data-act="del" data-id="${item.id}">Eliminar</button></div>
    `;
    cont.appendChild(row);
  });

  // Footer
  const footer = document.createElement("div");
  footer.className = "cart-footer";
  footer.innerHTML = `
    <button id="clear">Vaciar carrito</button>
    <div style="font-size:1.125rem">Total: <strong>${getCartTotal().toFixed(2)} €</strong></div>
  `;
  cont.appendChild(footer);
}

cont.addEventListener("click", (e) => {
  const btn = e.target.closest("button");
  if (!btn) return;
  const id = Number(btn.dataset.id);
  const act = btn.dataset.act;
  if (act === "inc") changeQty(id, +1);
  if (act === "dec") changeQty(id, -1);
  if (act === "del") removeItem(id);
  if (btn.id === "clear") clearCart();
  render();
});

// inicial
render();
