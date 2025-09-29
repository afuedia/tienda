
// cart.js (versión simple sin CustomEvent)
const STORAGE_KEY = "carrito:v1";

/* ========= Helpers internos ========= */
function leerCarrito() {
  try {
    return JSON.parse(localStorage.getItem(STORAGE_KEY)) ?? [];
  } catch {
    return [];
  }
}

function escribirCarrito(carrito) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(carrito));
  if (typeof window.actualizarContadorCarrito === "function") {
    window.actualizarContadorCarrito();
  }
}


export function obtenerCarrito() {
  return leerCarrito();
}

export function vaciarCarrito() {
  escribirCarrito([]);
}

export function anadirAlCarrito(producto, cantidad = 1) {
  const carrito = leerCarrito();
  const idx = carrito.findIndex((i) => i.id === producto.id);

  if (idx >= 0) {
    carrito[idx].qty += cantidad;
  } else {
    carrito.push({
      id: producto.id,
      title: producto.title,
      price: producto.price,
      image: producto.image,
      qty: cantidad,
    });
  }
  escribirCarrito(carrito);
}

export function fijarCantidad(id, cantidad) {
  const carrito = leerCarrito().map((i) =>
    i.id === id ? { ...i, qty: Math.max(1, cantidad) } : i
  );
  escribirCarrito(carrito);
}

export function cambiarCantidad(id, delta) {
  const carrito = leerCarrito().map((i) =>
    i.id === id ? { ...i, qty: Math.max(1, i.qty + delta) } : i
  );
  escribirCarrito(carrito);
}

export function eliminarArticulo(id) {
  const carrito = leerCarrito().filter((i) => i.id !== id);
  escribirCarrito(carrito);
}

export function obtenerResumenCarrito() {
  const carrito = leerCarrito();
  const cantidad = carrito.reduce((a, i) => a + i.qty, 0);
  const total = carrito.reduce((a, i) => a + i.qty * i.price, 0);
  return { count: cantidad, total };
}

export function obtenerCantidadCarrito() {
  return obtenerResumenCarrito().count;
}

export function obtenerTotalCarrito() {
  return obtenerResumenCarrito().total;
}
