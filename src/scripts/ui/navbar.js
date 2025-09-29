// navbar.js
import { obtenerCantidadCarrito } from "../pages/cart.js";

const URL_BASE = "https://fakestoreapi.com";
const categorias = document.getElementById("categorias");

// === 1) Cargar y pintar categorías ===
async function obtenerCategorias() {
  const respuesta = await fetch(`${URL_BASE}/products/categories`);
  if (!respuesta.ok) throw new Error(respuesta.status);
  return await respuesta.json();
}
const categories = await obtenerCategorias();

function pintarCategorias() {
  for (let i = 0; i < categories.length; i++) {
    const categoria = document.createElement("li");
    categoria.classList.add("categoria");
    categoria.textContent = categories[i];
    categorias.appendChild(categoria);
  }
}
pintarCategorias();

function cargarCategoria() {
  document
    .querySelectorAll(".categoria")
    .forEach((boton, i) => {
      boton.addEventListener("click", () => {
        window.location.href = `categoria.html?${i}`;
      });
    });
}
cargarCategoria();

// === 2) Carrito en la navbar + contador ===
function pintarContadorCarrito() {
  const el = document.getElementById("cart-count");
  if (el) el.textContent = obtenerCantidadCarrito();
}

function pintarCarritoEnNavbar() {
  const li = document.createElement("li");
  li.classList.add("carrito");

  const a = document.createElement("a");
  a.href = "carrito.html";
  a.style.display = "inline-flex";
  a.style.gap = "0.5rem";
  a.style.alignItems = "center";
  a.innerHTML = `🛒 <span id="cart-count">0</span>`;

  li.appendChild(a);
  categorias.appendChild(li);

  // pinta el número inicial
  pintarContadorCarrito();
}
pintarCarritoEnNavbar();

// === 3) Exponer función global para refrescar el contador ===
// Llama a window.actualizarContadorCarrito() después de modificar el carrito.
window.actualizarContadorCarrito = pintarContadorCarrito;
