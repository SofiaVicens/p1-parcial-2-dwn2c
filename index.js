'use strict';
let Productos = [
        {id: 1,
        nombre: "Kite Carve",
        categoria: "Cometa",
        cantidad: 1,
        desc: " Una cometa más ligera y rápida que también permite una dirección y un control más rápidos para saltar.",
        precio: 30000,
        img: './img/kite-carve.jpg'},

        {id: 2,
        nombre: "Kite Orbit",
        categoria: "Cometa",
        cantidad: 1,
        desc: "La cometa Orbit ofrece un increible rendimiento en una amplia gama de disciplinas: freestyle, big air, kite loops y olas.",
        precio: 35000,
        img: './img/kite-orbit.jpg'},

        {id: 3,
        nombre: "Tabla Carbon",
        categoria: "Tabla",
        cantidad: 1,
        desc: "Tabla de freeride de alto rendimiento más popular para impulsos explosivos, bucles y aterrizajes estables y predecibles.",
        precio: 18000,
        img: './img/tabla-carbon.jpg'},

        {id: 4,
        nombre: "Tabla Trace",
        categoria: "Tabla",
        cantidad: 1,
        desc: "La tabla Trace es una de las tablas de kitesurf favoritas de los kitesurfers de freeride y freestyle por su flexibilidad.",
        precio: 16000,
        img: './img/tabla-trace.jpg'},

        {id: 5,
        nombre: "Botas Fix",
        categoria: "Fijacion",
        cantidad: 1,
        desc: " Las botas de kitesurf Fix cuentan con paneles flexibles elásticos para mayor control y el fijador de cordón asegura tus pies.",
        precio: 8000,
        img: './img/fix.jpg'},

        {id: 6,
        nombre: "Straps Flex",
        categoria: "Fijacion",
        cantidad: 1,
        desc: "Los straps Flex cuentan con un sistema de correas de dos puntos. El diseño asimétrico asegura que tus pies encajen perfectamente. ",
        precio: 6000,
        img: './img/flex.jpg'},
]


let carrito = []

//Verifico mi LocalStorage:
document.addEventListener('DOMContentLoaded', () => {
    if (localStorage.getItem('carrito')){
        carrito = JSON.parse(localStorage.getItem('carrito'))
        actualizar()
    }
})

//Muestro mis productos:

const mostrarProductos = document.getElementById('divProductos')

Productos.forEach((producto) => {
    const div = document.createElement('div');
    div.classList.add('producto');

    let img = document.createElement("img");
    img.src = producto.img;
    img.alt = producto.nombre;
    div.appendChild(img);

    let h3 = document.createElement("h3");
    h3.innerText = producto.nombre;
    div.appendChild(h3);

    let descripcion = document.createElement("p");
    descripcion.innerText = producto.desc;
    div.appendChild(descripcion);

    let catego = document.createElement("p");
    catego.innerText = `Categoría: ${producto.categoria}`;
    div.appendChild(catego);

    let valor = document.createElement("p");
    valor.className = "precioProducto";
    valor.innerText = `Precio: $${producto.precio}`;
    div.appendChild(valor);

    let btn = document.createElement("button");
    btn.id = `agregar${producto.id}`;
    btn.className = "boton-agregar";
    btn.innerText = "Agregar";

    let i = document.createElement("i");
    i.classList.add("fas", "fa-shopping-cart");
    btn.appendChild(i);

    div.appendChild(btn);

    mostrarProductos.appendChild(div);

    const boton = document.getElementById(`agregar${producto.id}`);
    boton.addEventListener('click', () => {
        agregarAlCarrito(producto.id);
    });
});

//

const cantidad = document.getElementById('cantidad')

//Botón agregar al carrito:

const agregarAlCarrito = (prodEnCarrito) => {
    const item = Productos.find((prod) => prod.id === prodEnCarrito)
    carrito.push(item)
    actualizar()
}


//Borrar un producto

const eliminarDelCarrito = (prodEnCarrito) => {
    const indice = carrito.findIndex((prod) => prod.id === prodEnCarrito);
    if (indice !== -1) {
      carrito.splice(indice, 1);
      actualizar();
      console.log(carrito);
    }
  };

//Botón vaciar carrito:

const vaciarCarrito = document.getElementById('vaciar-carrito');

vaciarCarrito.addEventListener('click', () => {
    carrito = []; 
    actualizar();
});

//Carrito
  
let miCarrito = document.getElementById('carrito-contenedor')
let contadorCarrito = document.getElementById('contadorCarrito')
let sumaTotal = document.getElementById('precioTotal')


const actualizar = () => {
    miCarrito.innerHTML = '';
    carrito.forEach((prod) => {
        const div = document.createElement('div');
        div.className = ('productoEnCarrito');

        let titulo = document.createElement("p");
        titulo.innerText = prod.nombre;
        div.appendChild(titulo);

        let valor = document.createElement("p");
        valor.innerText = `Precio: $${prod.precio}`;
        div.appendChild(valor);

        let cantidadProducto = document.createElement("p");
        cantidadProducto.innerText = "Cantidad: ";
        div.appendChild(cantidadProducto);

        let span = document.createElement("span");
        span.className = "cantidad";
        span.innerText = prod.cantidad;
        cantidadProducto.appendChild(span);

        let btn = document.createElement("button");
        btn.className = "boton-eliminar";

        let i = document.createElement("i");
        i.classList.add("fas", "fa-trash-alt");
        btn.appendChild(i);

        btn.setAttribute("onclick", `eliminarDelCarrito(${prod.id})`);
        div.appendChild(btn);

        miCarrito.appendChild(div);
        localStorage.setItem('carrito', JSON.stringify(carrito));
    });

    contadorCarrito.innerText = carrito.length;
    sumaTotal.innerText = carrito.reduce((acc, prod) => acc + prod.cantidad * prod.precio, 0);
}

let contenedorModal = document.querySelector('.modal-contenedor');
let botonAbrir = document.querySelector('#boton-carrito');
let botonCerrar = document.querySelector('#salirCarrito');
let modalCarrito = document.querySelector('.modal-carrito');

function mostrarModal() {
    contenedorModal.classList.toggle('modal-active');
  }
  
  botonAbrir.addEventListener('click', mostrarModal);
  botonCerrar.addEventListener('click', mostrarModal);