let carrito = JSON.parse(localStorage.getItem("carrito")) || [];

let adminActivo = false;

/* ACTIVAR ADMIN */

function modoAdmin(){

  let password =
    prompt("Lscaps");

  if(password === "1234"){

    adminActivo = true;

    alert("Modo admin activado");

    mostrarBotonesAdmin();

  }else{

    alert("Contraseña incorrecta");
  }
}

/* MOSTRAR BOTONES ADMIN */

function mostrarBotonesAdmin(){

  let productos =
    document.querySelectorAll(".gorra");

  productos.forEach(producto=>{

    if(producto.querySelector(".admin-stock")) return;

    let boton =
      document.createElement("button");

    boton.innerText = "Cambiar Stock";

    boton.classList.add("admin-stock");

    boton.onclick = function(){

      producto.classList.toggle("agotada");

      let botonCompra =
        producto.querySelector(".comprar");

      if(producto.classList.contains("agotada")){

        botonCompra.innerText = "Agotada";

        botonCompra.disabled = true;

        botonCompra.classList.add("sin-stock");

      }else{

        botonCompra.innerText = "Comprar";

        botonCompra.disabled = false;

        botonCompra.classList.remove("sin-stock");
      }
    };

    producto.querySelector(".info")
    .appendChild(boton);

  });
}

/* AGREGAR AL CARRITO */

function agregarCarrito(nombre, precio){

  let productoExistente = carrito.find(
    producto => producto.nombre === nombre
  );

  if(productoExistente){

    productoExistente.cantidad += 1;

  }else{

    carrito.push({
      nombre,
      precio,
      cantidad:1
    });

  }

  localStorage.setItem(
    "carrito",
    JSON.stringify(carrito)
  );

  alert("Producto agregado");
}

/* FILTROS */

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