import { getCartCount } from "./cart.js";

const URL_BASE = "https://fakestoreapi.com"

const categorias = document.getElementById("categorias")
const articulos = document.getElementById("articulos")

// Función para pedir array de categorias
async function obtenerCategorias() {
  const respuesta = await fetch(URL_BASE + "/products/categories")
  if (!respuesta.ok) throw new Error(respuesta.status);
  const datos = await respuesta.json()
  return datos
}
const categories = await obtenerCategorias()

//Utilizo un buble para pintar las categorias
function pintarCategorias() {
for (let i = 0 ; i < categories.length; i++) {
  //En cada ciclo, creo y asigno clase
  const categoria = document.createElement("li")
  categoria.classList.add("categoria")
  categoria.textContent = categories[i];
  //Inserto
  categorias.appendChild(categoria)
}
}
pintarCategorias()

function cargarCategoria(){
  document
    .querySelectorAll(".categoria")
    .forEach((boton, i) => {boton
      .addEventListener("click", () => window.location.href = `categoria.html?${i}`)
      }
    )
}
cargarCategoria()

function pintarCarritoEnNavbar() {
  const li = document.createElement("li");
  li.classList.add("carrito");
  const a = document.createElement("a");
  a.href = "carrito.html";
  a.style.display = "inline-flex";
  a.style.gap = "0.5rem";
  a.style.alignItems = "center";
  a.innerHTML = `🛒 <span id="cart-count">${getCartCount()}</span>`;
  li.appendChild(a);
  categorias.appendChild(li);
}
pintarCarritoEnNavbar();

window.addEventListener("cart:updated", (e) => {
  const el = document.getElementById("cart-count");
  if (el) el.textContent = e.detail.count;
});