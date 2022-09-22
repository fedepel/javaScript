////////////////////////////////////////////////////////////////////////////////
//-------------------------------------Variables------------------------------//
////////////////////////////////////////////////////////////////////////////////
const baseDeDatos = [
    { id: 1, nombre: 'Super Mario Odissey', precio: 90, imagen: '../images/super-mario-odyssey.jpg' },
    { id: 2, nombre: 'Mario Party Superstars', precio: 90, imagen: '../images/mario-party-superstars.jpg' },
    { id: 3, nombre: 'Zelda - Breath of the wild', precio: 90, imagen: '../images/zelda-breath-of-the-wild.jpg' },
    { id: 4, nombre: 'Pokemon Legends - ARCEUS', precio: 110, imagen: '../images/pokemon-legends-arceus.jpg' },
    { id: 5, nombre: 'Pokemon Scarlet', precio: 120, imagen: '../images/pokemon-scarlet.jpg' },
    { id: 6, nombre: 'Pokemon Violet', precio: 120, imagen: '../images/pokemon-violet.jpg' }
];

// Variables para elementos de autenticación y usuario

let carrito = [];
const divisa = 'USD';
const items = document.querySelector('#items');
const carritoDOM = document.querySelector('#carrito');
const totalDOM = document.querySelector('#total');
const botonVaciar = document.querySelector('#boton-vaciar');
const botonComprar = document.querySelector('#boton-comprar')

let usuario;
let formularioIdentificacion;
let contenedorIdentificacion;
let contenedorUsuario;
let textoUsuario;
let logOut;

////////////////////////////////////////////////////////////////////////////////
//-------------------------------------Funciones------------------------------//
////////////////////////////////////////////////////////////////////////////////

//-------------------------Dibujar productos en el HTML-----------------------//

function renderizarProductos() {
    baseDeDatos.forEach((elem) => {

        const nodo = document.createElement('div');
        nodo.classList.add('card', 'col-6');

        const nodoCardBody = document.createElement('div');
        nodoCardBody.classList.add('card-body');

        const nodoTitle = document.createElement('h5');
        nodoTitle.classList.add('card-title');
        nodoTitle.textContent = elem.nombre;

        const nodoImagen = document.createElement('img');
        nodoImagen.classList.add('img-fluid');
        nodoImagen.setAttribute('src', elem.imagen);

        const nodoPrecio = document.createElement('p');
        nodoPrecio.classList.add('card-text');
        nodoPrecio.textContent = `${elem.precio} ${divisa}`;

        const nodoBoton = document.createElement('button');
        nodoBoton.classList.add('btn', 'btn-primary', 'btn2');
        nodoBoton.textContent = 'Agregar al carrito';
        nodoBoton.setAttribute('marcador', elem.id);
        nodoBoton.addEventListener('click', anyadirProductoAlCarrito);

        nodoCardBody.appendChild(nodoImagen);
        nodoCardBody.appendChild(nodoTitle);
        nodoCardBody.appendChild(nodoPrecio);
        nodoCardBody.appendChild(nodoBoton);
        nodo.appendChild(nodoCardBody);
        items.appendChild(nodo);
    });
}

//-------------------------Logueo y deslogueo del usuario-----------------------//

function actualizarUsuarioStorage() {
    localStorage.setItem("usuario", usuario);
}

function mostrarTextoUsuario() {
    contenedorIdentificacion.hidden = true;
    contenedorUsuario.hidden = false;
    textoUsuario.innerHTML += `Bienvenido ${usuario}!`;
}

function identificarUsuario(event) {
    event.preventDefault();
    usuario = inputUsuario.value;
    formularioIdentificacion.reset();
    actualizarUsuarioStorage();
    mostrarTextoUsuario();
}

function mostrarFormularioIdentificacion() {
    contenedorIdentificacion.hidden = false;
    contenedorUsuario.hidden = true;
    textoUsuario.innerHTML = ``;
}

function eliminarStorage() {
    localStorage.clear();
    usuario = "";
    carrito = [];
    mostrarFormularioIdentificacion();
    renderizarCarrito();
}

function inicializarElementos() {
    formularioIdentificacion = document.getElementById(
        "formularioIdentificacion"
    );
    inputUsuario = document.getElementById("inputUsuario");
    contenedorIdentificacion = document.getElementById(
        "contenedorIdentificacion"
    );
    contenedorUsuario = document.getElementById("contenedorUsuario");
    textoUsuario = document.getElementById("textoUsuario");

    logOut = document.getElementById("logOut");
}

function inicializarEventos() {
    formularioIdentificacion.onsubmit = (event) => identificarUsuario(event);
    logOut.onclick = eliminarStorage;
}

//----------------Agrega los productos seleccionados al carrito----------------//

function anyadirProductoAlCarrito(evento) {

    carrito.push(evento.target.getAttribute('marcador'))

    renderizarCarrito();

}

function renderizarCarrito() {

    carritoDOM.textContent = '';

    const carritoSinDuplicados = [...new Set(carrito)];

    carritoSinDuplicados.forEach((item) => {

        const miItem = baseDeDatos.filter((itemBaseDatos) => {

            return itemBaseDatos.id === parseInt(item);
        });

        const numeroUnidadesItem = carrito.reduce((total, itemId) => {

            return itemId === item ? total += 1 : total;
        }, 0);

        const nodo = document.createElement('li');
        nodo.classList.add('list-group-item', 'text-center', 'lista');
        nodo.textContent = `${numeroUnidadesItem} x ${miItem[0].nombre} - ${miItem[0].precio}${divisa}`;

        const miBoton = document.createElement('button');
        miBoton.classList.add('btn', 'btn-danger', 'mx-2');
        miBoton.textContent = 'X';
        miBoton.style.marginLeft = '1rem';
        miBoton.dataset.item = item;
        miBoton.addEventListener('click', borrarItemCarrito);

        nodo.appendChild(miBoton);
        carritoDOM.appendChild(nodo);
    });

    actualizarCarritoStorage();

    totalDOM.textContent = calcularTotal();
}

function actualizarCarritoStorage() {
    let carritoJSON = JSON.stringify(carrito);
    localStorage.setItem("carrito", carritoJSON);
}

//----------------Eliminar los productos seleccionados al carrito----------------//

function borrarItemCarrito(evento) {

    const id = evento.target.dataset.item;

    carrito = carrito.filter((carritoId) => {
        return carritoId !== id;
    });

    renderizarCarrito();
}

//-----------------------Calcular precio total del carrito-----------------------//

function calcularTotal() {

    return carrito.reduce((total, item) => {

        const miItem = baseDeDatos.filter((itemBaseDatos) => {
            return itemBaseDatos.id === parseInt(item);
        });

        return total + miItem[0].precio;
    }, 0).toFixed(0);
}

//---------------Vacia el carrito y lo disponibiliza para recargarlo--------------//

function vaciarCarrito() {
    carrito = [];
    renderizarCarrito();
}

//---------------Mantener usuario logueado y la info del carrito-------------------//

function obtenerCarritoStorage() {
    let carritoJSON = localStorage.getItem("carrito");
    if (carritoJSON) {
        carrito = JSON.parse(carritoJSON);
        renderizarCarrito();
    }
}

function obtenerUsuarioStorage() {
    let usuarioAlmacenado = localStorage.getItem("usuario");
    if (usuarioAlmacenado) {
        usuario = usuarioAlmacenado;
        mostrarTextoUsuario();
    }
}

//--------------------------------Efectuar compra---------------------------------//


function finalizarCompra() {
    carrito = [];
    renderizarCarrito();
    alert(`Muchas gracias por tu compra!`);
}

//--------------------------------Main--------------------------------------------//

function main() {
    botonVaciar.addEventListener('click', vaciarCarrito);
    botonComprar.addEventListener('click', finalizarCompra)
    inicializarElementos();
    inicializarEventos();
    obtenerCarritoStorage();
    obtenerUsuarioStorage()
    renderizarProductos();
    renderizarCarrito();
}

main()

