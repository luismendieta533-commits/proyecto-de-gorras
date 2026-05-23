let carrito = JSON.parse(localStorage.getItem("carrito")) || [];

function agregarCarrito(nombre, precio){

  // Buscar si ya existe
  let productoExistente = carrito.find(
    producto => producto.nombre === nombre
  );

  // Si existe, aumentar cantidad
  if(productoExistente){

    productoExistente.cantidad += 1;

  }else{

    // Si no existe, agregar nuevo
    carrito.push({
      nombre: nombre,
      precio: precio,
      cantidad: 1
    });

  }

  // Guardar
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

function enviarWhatsApp(){

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

  let numero = "50586041850";

  window.open(
    `https://wa.me/${numero}?text=${mensaje}`,
    "_blank"
  );
}

mostrarCarrito();