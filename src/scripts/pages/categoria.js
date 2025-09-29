import { anadirAlCarrito } from "./cart.js";

const URL_BASE = "https://fakestoreapi.com"
const END_POINT = "/products/category/"
let categoria;

if (location.search.includes("0")) {
  categoria = "electronics"
}
else if (location.search.includes("1")) {
  categoria = "jewelery"
}
else if (location.search.includes("2")) {
  categoria = "men%27s%20clothing"
}
else if (location.search.includes("3")) {
  categoria = "women%27s%20clothing"
}

// Con esto de aquí saco un listado de los artículos de la categoria
const respuesta = await fetch(URL_BASE + END_POINT + categoria)
if (!respuesta.ok) throw new Error(respuesta.status);
const datos = await respuesta.json()
console.log(datos)

//Utilizo el siguiente bucle para pintar todas las cartas
for (let i = 0; i < datos.length; i++) {
  //En cada ciclo, crea las siguientes variables
  const carta = document.createElement("div")
  const articulo = document.createElement("p")
  const precio = document.createElement("p")
  const boton = document.createElement("button")
  const imagen = document.createElement("img")
  const btnAdd = document.createElement("button");

  //Y le asigna clases
  carta.classList.add("carta");
  articulo.classList.add("articulo")
  precio.classList.add("precio")
  imagen.classList.add("imagen")
  boton.classList.add("boton")
  btnAdd.classList.add("btn-add")
  
  //Inserto la carta en su seccion
 articulos.appendChild(carta);
  // Asigno contenidos a los elementos
  articulo.textContent = datos[i].title
  precio.textContent = `${datos[i].price} €` 
  imagen.setAttribute("src", datos[i].image)
  precio.textContent = `${datos[i].price} €` 
  
  boton.dataset.id = datos[i].id; // element.dataset → objeto para leer/escribir atributos data-* del elemento.

  boton.textContent = "Más información"
  btnAdd.textContent = "Añadir al carrito";
  btnAdd.addEventListener("click", async () => {
  
  anadirAlCarrito(datos[i], 1);
  btnAdd.textContent = "Añadido ✅";
  setTimeout(() => (btnAdd.textContent = "Añadir al carrito"), 1200);
});
  
//Inserto los elementos en la carta  
  carta.appendChild(imagen)
  carta.appendChild(articulo)
  carta.appendChild(precio)
  carta.appendChild(boton)
  carta.appendChild(btnAdd);

  //Fin del bucle
}

function exportarId(){
  document
    .querySelectorAll(".boton")
    .forEach(boton => {boton
        .addEventListener("click", () => window.location.href = `producto.html?${boton.dataset.id}`)
      }
    )
}

exportarId()