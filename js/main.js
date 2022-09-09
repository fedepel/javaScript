class Compra {
    constructor(nombre, costo) {
        this.nombre = nombre.toUpperCase();
        this.costo = costo;
    }
}

function agregarCompras() {
    let numeroCompras = parseInt(
        prompt("Cuantos compras necesita registrar en su carrito?")
    );
    let compras = [];
    for (let index = 0; index < numeroCompras; index++) {
        let nombre = prompt("Ingresa el nombre del articulo comprado.");
        let costo = parseFloat(prompt("Ingresa el costo del producto."));
        let objetoCompra = new Compra(nombre, costo)
        compras.push(objetoCompra);
    }
    return compras;
}

function calcularCosto(compras) {
    let sumatoriaCosto = 0;
    for (const compra of compras) {
        sumatoriaCosto += compra.costo;
    }
    return sumatoriaCosto;
}

function valorCuota(costoTotal, pagoAdelanto, numeroCuotas) {
    let total = 0;
    
    if (pagoAdelanto > 0) {
        total = costoTotal - pagoAdelanto;
    } else {
        total = costoTotal
    }
    
    let cuotaMes = 0
    
    if (numeroCuotas <= 6) {
        cuotaMes = total / numeroCuotas;
    } else {
        cuotaMes = total * 1.05 / numeroCuotas;
    }
    
    return cuotaMes
}

function avisoFinal(costoTotal, numeroCuotas, cuotaMes, pagoAdelanto) {
    if (numeroCuotas <= 6) {
        alert(`Usted ha seleccionado pagar ${costoTotal} UYU en ${numeroCuotas} cuotas de ${parseInt(cuotaMes)} UYU, realizando un pago por adelantado de ${pagoAdelanto} UYU.`)
    } else if (numeroCuotas > 6) {
        alert(`Usted ha seleccionado pagar ${costoTotal} UYU en ${numeroCuotas} cuotas de ${parseInt(cuotaMes)} UYU, realizando un pago por adelantado de ${pagoAdelanto} UYU (se ha aplicado un 5% de interes).`)
    } else {
        alert('Ningún dato ha sido ingresado.')
    }
}

function main() {
    let compras = agregarCompras();
    let costoTotal = calcularCosto(compras);
    alert(`El costo total de su compra es de: ${costoTotal} UYU.`);
    let pagoAdelanto = parseInt(prompt(`Ingrese si desea realizar un pago por adelantado.`))
    let numeroCuotas = parseInt(prompt('Ingrese número de cuotas en que desea pagar (de seleccionar el pago en más de 6 cuotas, aplica un interes del 5%).'));
    let cuota = valorCuota(costoTotal, pagoAdelanto, numeroCuotas)
    avisoFinal(costoTotal, numeroCuotas, cuota, pagoAdelanto)
    console.log(compras)
    console.log(costoTotal)
    console.log(pagoAdelanto)
    console.log(numeroCuotas)
    console.log(cuota)
}

main();
