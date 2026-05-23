let carrito =
JSON.parse(localStorage.getItem("carrito")) || [];

let adminActivo = false;

/* =========================
   PRODUCTOS
========================= */

const productos = [
  "Gorra Roja",
  "Gorra Negra"
];

/* =========================
   CARGAR STOCK GUARDADO
========================= */

window.onload = function(){

  cargarStock();

  mostrarCarrito();

}

/* =========================
   GUARDAR STOCK
========================= */

function guardarStock(nombre,agotado){

  localStorage.setItem(
    "stock_" + nombre,
    agotado
  );

}

/* =========================
   CARGAR STOCK
========================= */

function cargarStock(){

  let tarjetas =
  document.querySelectorAll(".gorra");

  tarjetas.forEach(producto=>{

    let nombre =
    producto.querySelector("h2").innerText;

    let agotado =
    localStorage.getItem(
      "stock_" + nombre
    );

    let botonComprar =
    producto.querySelector(".comprar");

    if(agotado === "true"){

      producto.classList.add("agotada");

      botonComprar.innerText =
      "Agotada";

      botonComprar.disabled = true;

      botonComprar.classList.add("sin-stock");

    }

  });

}

/* =========================
   MODO ADMIN
========================= */

function modoAdmin(){

  if(adminActivo){

    salirAdmin();

    return;
  }

  let password =
  prompt("Ingrese contraseña admin");

  if(password !== "1234"){

    alert("Contraseña incorrecta");

    return;
  }

  adminActivo = true;

  alert("Modo admin activado");

  mostrarBotonesAdmin();

}

/* =========================
   SALIR ADMIN
========================= */

function salirAdmin(){

  adminActivo = false;

  let botones =
  document.querySelectorAll(".admin-stock");

  botones.forEach(boton=>{

    boton.remove();

  });

  alert("Modo admin desactivado");

}

/* =========================
   MOSTRAR BOTONES ADMIN
========================= */

function mostrarBotonesAdmin(){

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

      let nombre =
      producto.querySelector("h2").innerText;

      if(producto.classList.contains("agotada")){

        botonComprar.innerText =
        "Agotada";

        botonComprar.disabled = true;

        botonComprar.classList.add("sin-stock");

        guardarStock(nombre,true);

      }else{

        botonComprar.innerText =
        "Comprar";

        botonComprar.disabled = false;

        botonComprar.classList.remove("sin-stock");

        guardarStock(nombre,false);

      }

    };

    producto
    .querySelector(".info")
    .appendChild(boton);

  });

}

/* =========================
   AGREGAR CARRITO
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

  alert("Producto agregado");

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

      producto.style.display =
      "block";

    }else{

      producto.style.display =
      "none";

    }

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