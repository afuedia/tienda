import { anadirAlCarrito } from "./cart.js";

const URL_BASE = "https://fakestoreapi.com";
const id = location.search.slice(1);

const titulo = document.getElementById("titulo");
const precio = document.getElementById("precio");
const imagen = document.getElementById("img");
const descripcion = document.getElementById("descripcion");
const btnAdd = document.getElementById("add-to-cart");

const respuesta = await fetch(`${URL_BASE}/products/${id}`);
if (!respuesta.ok) throw new Error(respuesta.status);
const datos = await respuesta.json();

// Pintar
titulo.textContent = datos.title;
precio.textContent = `${datos.price} €`;
imagen.setAttribute("src", datos.image);
descripcion.textContent = datos.description;

// Añadir al carrito
btnAdd.addEventListener("click", () => {
  anadirAlCarrito(datos, 1);
  // feedback rápido
  const prev = btnAdd.textContent;
  btnAdd.textContent = "Añadido ✅";
  setTimeout(() => (btnAdd.textContent = prev), 1200);
});
