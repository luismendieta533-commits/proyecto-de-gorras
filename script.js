let carrito =
JSON.parse(localStorage.getItem("carrito")) || [];

/* =========================
   AGREGAR AL CARRITO
========================= */

function agregarCarrito(nombre,precio){

  let productoExistente =
  carrito.find(
    producto => producto.nombre === nombre
  );

  if(productoExistente){

    productoExistente.cantidad += 1;

  }else{

    carrito.push({
      nombre:nombre,
      precio:precio,
      cantidad:1
    });

  }

  localStorage.setItem(
    "carrito",
    JSON.stringify(carrito)
  );

  alert("Producto agregado al carrito");
}

/* =========================
   FILTROS
========================= */

function filtrar(categoria){

  let productos =
  document.querySelectorAll(".gorra");

  productos.forEach(producto=>{

    if(
      categoria === "todas" ||
      producto.classList.contains(categoria)
    ){

      producto.style.display = "block";

    }else{

      producto.style.display = "none";

    }

  });

}

/* =========================
   MODO ADMIN
========================= */

function modoAdmin(){

  let password =
  prompt("Lscaps");

  if(password !== "1234"){

    alert("Contraseña incorrecta");

    return;
  }

  alert("Modo admin activado");

  let productos =
  document.querySelectorAll(".gorra");

  productos.forEach(producto=>{

    if(producto.querySelector(".admin-stock"))
    return;

    let boton =
    document.createElement("button");

    boton.innerText =
    "Cambiar Stock";

    boton.classList.add("admin-stock");

    boton.onclick = function(){

      producto.classList.toggle("agotada");

      let botonComprar =
      producto.querySelector(".comprar");

      if(producto.classList.contains("agotada")){

        botonComprar.innerText =
        "Agotada";

        botonComprar.disabled = true;

        botonComprar.classList.add("sin-stock");

      }else{

        botonComprar.innerText =
        "Comprar";

        botonComprar.disabled = false;

        botonComprar.classList.remove("sin-stock");
      }

    };

    producto
    .querySelector(".info")
    .appendChild(boton);

  });

}

/* =========================
   MOSTRAR CARRITO
========================= */

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

  let totalHTML =
  document.getElementById("total");

  if(totalHTML){

    totalHTML.innerText =
    "Total: C$" + total;
  }

}

/* =========================
   CAMBIAR CANTIDAD
========================= */

function cambiarCantidad(index,cantidad){

  carrito[index].cantidad =
  parseInt(cantidad);

  localStorage.setItem(
    "carrito",
    JSON.stringify(carrito)
  );

  mostrarCarrito();
}

/* =========================
   ELIMINAR PRODUCTO
========================= */

function eliminarProducto(index){

  carrito.splice(index,1);

  localStorage.setItem(
    "carrito",
    JSON.stringify(carrito)
  );

  mostrarCarrito();
}

/* =========================
   VACIAR CARRITO
========================= */

function vaciarCarrito(){

  carrito = [];

  localStorage.setItem(
    "carrito",
    JSON.stringify(carrito)
  );

  mostrarCarrito();
}

/* =========================
   WHATSAPP
========================= */

function enviarWhatsApp(numero){

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

  window.open(
    `https://wa.me/${numero}?text=${mensaje}`,
    "_blank"
  );

}

/* =========================
   AUTO CARGAR
========================= */

mostrarCarrito();