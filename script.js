let carrito = JSON.parse(localStorage.getItem("carrito")) || [];

function agregarCarrito(nombre, precio){

  let productoExistente = carrito.find(
    producto => producto.nombre === nombre
  );

  if(productoExistente){

    productoExistente.cantidad += 1;

  }else{

    carrito.push({
      nombre: nombre,
      precio: precio,
      cantidad: 1
    });

  }

  localStorage.setItem(
    "carrito",
    JSON.stringify(carrito)
  );

  alert("Producto agregado al carrito");
}

function mostrarCarrito(){

  let contenedor =
    document.getElementById("carrito");

  if(!contenedor) return;

  contenedor.innerHTML = "";

  let total = 0;

  carrito.forEach((producto,index)=>{

    let subtotal =
      producto.precio * producto.cantidad;

    total += subtotal;

    contenedor.innerHTML += `

      <div class="item">

        <h2>${producto.nombre}</h2>

        <p>Precio: C$${producto.precio}</p>

        <p>

          Cantidad:

          <input
            type="number"
            min="1"
            value="${producto.cantidad}"
            onchange="cambiarCantidad(${index}, this.value)"
          >

        </p>

        <p>Subtotal: C$${subtotal}</p>

        <button
          class="eliminar"
          onclick="eliminarProducto(${index})"
        >
          Eliminar
        </button>

      </div>

    `;
  });

  document.getElementById("total").innerText =
    "Total: C$" + total;
}

function cambiarCantidad(index,cantidad){

  carrito[index].cantidad =
    parseInt(cantidad);

  localStorage.setItem(
    "carrito",
    JSON.stringify(carrito)
  );

  mostrarCarrito();
}

function eliminarProducto(index){

  carrito.splice(index,1);

  localStorage.setItem(
    "carrito",
    JSON.stringify(carrito)
  );

  mostrarCarrito();
}

function vaciarCarrito(){

  carrito = [];

  localStorage.setItem(
    "carrito",
    JSON.stringify(carrito)
  );

  mostrarCarrito();
}

function enviarWhatsApp(){

  if(carrito.length === 0){

    alert("El carrito está vacío");

    return;
  }

  let mensaje =
    "Hola, quiero comprar:%0A%0A";

  let total = 0;

  carrito.forEach(producto=>{

    mensaje +=
      `• ${producto.nombre} x${producto.cantidad}%0A`;

    total +=
      producto.precio * producto.cantidad;
  });

  mensaje += `%0ATotal: C$${total}`;

  // CAMBIA ESTE NÚMERO
  let numero = "50588888888";

  window.open(
    `https://wa.me/${numero}?text=${mensaje}`,
    "_blank"
  );
}

mostrarCarrito();