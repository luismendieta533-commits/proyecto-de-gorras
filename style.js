let carrito = JSON.parse(localStorage.getItem("carrito")) || [];

function agregarCarrito(nombre, precio){

  let producto = carrito.find(p => p.nombre === nombre);

  if(producto){
    producto.cantidad++;
  }else{
    carrito.push({
      nombre,
      precio,
      cantidad:1
    });
  }

  localStorage.setItem("carrito", JSON.stringify(carrito));

  alert("Producto agregado al carrito");
}

function mostrarCarrito(){

  let contenedor = document.getElementById("carrito");

  if(!contenedor) return;

  contenedor.innerHTML = "";

  let total = 0;

  carrito.forEach((producto,index)=>{

    total += producto.precio * producto.cantidad;

    contenedor.innerHTML += `
      <div class="item">
        <h2>${producto.nombre}</h2>

        <p>Precio: C$${producto.precio}</p>

        <input 
          type="number"
          min="1"
          value="${producto.cantidad}"
          onchange="cambiarCantidad(${index},this.value)"
        >

      </div>
    `;
  });

  document.getElementById("total").innerText =
    "Total: C$" + total;
}

function cambiarCantidad(index,cantidad){

  carrito[index].cantidad = parseInt(cantidad);

  localStorage.setItem("carrito", JSON.stringify(carrito));

  mostrarCarrito();
}

function enviarWhatsApp(){

  let mensaje = "Hola quiero comprar:%0A";

  let total = 0;

  carrito.forEach(producto=>{

    mensaje +=
      `- ${producto.nombre} x${producto.cantidad}%0A`;

    total += producto.precio * producto.cantidad;
  });

  mensaje += `%0ATotal: C$${total}`;

  let numero = "+50584921352";

  window.open(
    `https://wa.me/${numero}?text=${mensaje}`,
    "_blank"
  );
}

mostrarCarrito();