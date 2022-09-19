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

let carrito = [];
const divisa = 'USD';
const DOMitems = document.querySelector('#items');
const DOMcarrito = document.querySelector('#carrito');
const DOMtotal = document.querySelector('#total');
const DOMbotonVaciar = document.querySelector('#boton-vaciar');

////////////////////////////////////////////////////////////////////////////////
//-------------------------------------Funciones------------------------------//
////////////////////////////////////////////////////////////////////////////////

//-------------------------Dibujar productos en el HTML-----------------------//

function renderizarProductos() {
    baseDeDatos.forEach((info) => {

        const miNodo = document.createElement('div');
        miNodo.classList.add('card', 'col-5');

        const miNodoCardBody = document.createElement('div');
        miNodoCardBody.classList.add('card-body');

        const miNodoTitle = document.createElement('h5');
        miNodoTitle.classList.add('card-title');
        miNodoTitle.textContent = info.nombre;

        const miNodoImagen = document.createElement('img');
        miNodoImagen.classList.add('img-fluid');
        miNodoImagen.setAttribute('src', info.imagen);

        const miNodoPrecio = document.createElement('p');
        miNodoPrecio.classList.add('card-text');
        miNodoPrecio.textContent = `${info.precio} ${divisa}`;

        const miNodoBoton = document.createElement('button');
        miNodoBoton.classList.add('btn', 'btn-primary', 'btn2');
        miNodoBoton.textContent = 'Agregar al carrito';
        miNodoBoton.setAttribute('marcador', info.id);
        miNodoBoton.addEventListener('click', anyadirProductoAlCarrito);

        miNodoCardBody.appendChild(miNodoImagen);
        miNodoCardBody.appendChild(miNodoTitle);
        miNodoCardBody.appendChild(miNodoPrecio);
        miNodoCardBody.appendChild(miNodoBoton);
        miNodo.appendChild(miNodoCardBody);
        DOMitems.appendChild(miNodo);
    });
}

//-------------------------Evento para añadir al carrito-----------------------//

function anyadirProductoAlCarrito(evento) {

    carrito.push(evento.target.getAttribute('marcador'))

    renderizarCarrito();

}

//----------------Agrega los productos seleccionados al carrito----------------//

function renderizarCarrito() {

    DOMcarrito.textContent = '';

    const carritoSinDuplicados = [...new Set(carrito)];

    carritoSinDuplicados.forEach((item) => {

        const miItem = baseDeDatos.filter((itemBaseDatos) => {

            return itemBaseDatos.id === parseInt(item);
        });

        const numeroUnidadesItem = carrito.reduce((total, itemId) => {

            return itemId === item ? total += 1 : total;
        }, 0);

        const miNodo = document.createElement('li');
        miNodo.classList.add('list-group-item', 'text-center', 'lista');
        miNodo.textContent = `${numeroUnidadesItem} x ${miItem[0].nombre} - ${miItem[0].precio}${divisa}`;

        const miBoton = document.createElement('button');
        miBoton.classList.add('btn', 'btn-danger', 'mx-2');
        miBoton.textContent = 'X';
        miBoton.style.marginLeft = '1rem';
        miBoton.dataset.item = item;
        miBoton.addEventListener('click', borrarItemCarrito);

        miNodo.appendChild(miBoton);
        DOMcarrito.appendChild(miNodo);
    });

    DOMtotal.textContent = calcularTotal();
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
    }, 0).toFixed(2);
}

//---------------Vacia el carrito y lo disponibiliza para recargarlo--------------//

function vaciarCarrito() {
    carrito = [];
    renderizarCarrito();
}

DOMbotonVaciar.addEventListener('click', vaciarCarrito);

renderizarProductos();
renderizarCarrito();

