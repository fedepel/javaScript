////////////////////////////////////////////////////////////////////////////////
//-------------------------------------Variables------------------------------//
////////////////////////////////////////////////////////////////////////////////

let baseDeDatos
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
        nodo.classList.add('card', 'col-6', 'card-body');

        const nodoTitle = document.createElement('h2');
        nodoTitle.classList.add('card-title');
        nodoTitle.textContent = elem.nombre;

        const nodoImagen = document.createElement('img');
        nodoImagen.classList.add('img-fluid');
        nodoImagen.setAttribute('src', elem.imagen);

        const nodoPrecio = document.createElement('h3');
        nodoPrecio.classList.add('card-text');
        nodoPrecio.textContent = `-${elem.precio} ${divisa}-`;

        const nodoBoton = document.createElement('button');
        nodoBoton.classList.add('btn', 'btn-primary', 'btn2');
        nodoBoton.textContent = 'Agregar al carrito';
        nodoBoton.setAttribute('marcador', elem.id);
        nodoBoton.setAttribute('nombre', elem.nombre);
        nodoBoton.addEventListener('click', anyadirProductoAlCarrito);

        nodo.appendChild(nodoImagen);
        nodo.appendChild(nodoTitle);
        nodo.appendChild(nodoPrecio);
        nodo.appendChild(nodoBoton);
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
    carrito.push(evento.target.getAttribute('marcador'));
    renderizarCarrito();
    Toastify({
        text: `Item agregado al carrito`,
        duration: 3000,
        style: {
            background: 'linear-gradient(to right, #002d72, #96c92d)',
        }
    }).showToast();
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
        nodo.textContent = `${numeroUnidadesItem} x ${miItem[0].nombre}`;

        const miBoton = document.createElement('button');
        miBoton.classList.add('btn', 'btn-danger', 'mx-2');
        miBoton.textContent = 'X';
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
    Toastify({
        text: `Item eliminado del carrito`,
        duration: 3000,
        style: {
            background: 'linear-gradient(to right, #002d72, #CB0004)',
        }
    }).showToast();
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
    carrito.length > 0 ? seguroDeVaciar() : carritoVacio();
}

function seguroDeVaciar() {
    Swal.fire({
        title: 'Desea vaciar su carrito?',
        icon: 'warning',
        showCancelButton: true,
        cancelButtonColor: '#96c92d',
        cancelButtonText: 'Mantener carrito',
        confirmButtonColor: '#3085d6',
        confirmButtonText: 'Vaciar carrito'
    }).then((result) => {
        if (result.isConfirmed) {
            carrito = [];
            renderizarCarrito();
        }
    })
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
    carrito.length > 0 ? alertaConfirmacion() : carritoVacio();
}

function alertaConfirmacion() {
    Swal.fire({
        title: 'Confirmación de compra',
        text: "Está seguro que desea finalizar su compra?",
        imageUrl: "https://images.nintendolife.com/3afd16480e874/super-mario-thinking.large.jpg",
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonText: 'No',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Si'
    }).then((result) => {
        if (result.isConfirmed) {
            Swal.fire(
                'Muchas gracias por su compra!',
            )
            carrito = [];
            renderizarCarrito();
        }
    })
}

function carritoVacio() {
    Swal.fire({
        title: 'El carrito está vacío!',
        icon: 'warning',
        confirmButtonColor: '#3085d6',
        confirmButtonText: 'Seguir comprando'
    })
}

//-------------------------Consultar productos json-------------------------------//

function consultarProductosJson() {
    fetch("https://633f84d3e44b83bc73bb8b77.mockapi.io/api/v1/articulos")
    .then((response) => response.json())
    .then((data) => {
        baseDeDatos = [...data]
        renderizarProductos();
        obtenerUsuarioStorage();
        obtenerCarritoStorage();
        renderizarCarrito();
        console.log(baseDeDatos)
    })
    .catch((error) => console.log(error))
}

//--------------------------------Main--------------------------------------------//

function main() {
    botonVaciar.addEventListener('click', vaciarCarrito);
    botonComprar.addEventListener('click', finalizarCompra);
    consultarProductosJson();
    inicializarElementos();
    inicializarEventos();
}

main()
