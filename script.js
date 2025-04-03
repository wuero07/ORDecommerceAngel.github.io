let carrito = JSON.parse(localStorage.getItem("carrito")) || [];

function agregarAlCarrito(nombre, precio, imagen) {
  carrito.push({ nombre, precio: Number(precio), imagen });
  localStorage.setItem("carrito", JSON.stringify(carrito));
  actualizarCarrito();
  alert(`${nombre} agregado con éxito al carrito.`);
}

function actualizarCarrito() {
  let contadorCarrito = document.getElementById("contador-carrito");
  let listaCarrito = document.getElementById("lista-carrito");
  let totalCarrito = document.getElementById("total");

  if (contadorCarrito) {
    contadorCarrito.innerText = carrito.length;
  }

  if (listaCarrito && totalCarrito) {
    listaCarrito.innerHTML = "";
    let total = 0;
    let fragment = document.createDocumentFragment();

    carrito.forEach((item, index) => {
      total += item.precio;
      let div = document.createElement("div");
      div.classList.add("item-carrito");
      div.innerHTML = `
        <img src="${item.imagen}" alt="${item.nombre}" class="img-carrito">
        <p>${item.nombre} - $${item.precio.toFixed(2)}</p>
        <button class="eliminar" onclick="eliminarProducto(${index})">❌</button>
      `;
      fragment.appendChild(div);
    });

    listaCarrito.appendChild(fragment);
    totalCarrito.innerText = total.toFixed(2);
  }
}

function eliminarProducto(index) {
  carrito.splice(index, 1);
  localStorage.setItem("carrito", JSON.stringify(carrito));
  actualizarCarrito();
}

function vaciarCarrito() {
  carrito = [];
  localStorage.setItem("carrito", JSON.stringify(carrito));
  actualizarCarrito();
}

document.addEventListener("DOMContentLoaded", () => {
  actualizarCarrito();

  let botonPagar = document.getElementById("pagar");
  if (botonPagar) {
    botonPagar.addEventListener("click", function () {
      if (carrito.length === 0) {
        alert("El carrito está vacío.");
        return;
      }
      
      carrito = [];
      localStorage.setItem("carrito", JSON.stringify(carrito));
      actualizarCarrito();

      let mensajePago = document.getElementById("mensaje-pago");
      if (mensajePago) {
        mensajePago.innerText = "Pagado con éxito";
        mensajePago.style.display = "block";
      }
    });
  }
});





