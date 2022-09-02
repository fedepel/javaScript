let numeroDeCompras = prompt("¿Cuantas compras realizó?");
let suma = 0;

for (let i = 1; i <= numeroDeCompras; i++) {
    let compra = prompt(`Ingrese el valor de su compra No ${i}`);
    suma = suma + parseInt(compra);
}

alert(`Su compra total aciende a ${suma} UYU.`)

let costoTotal = suma
let pagoAdelanto = parseInt(prompt(`Ingrese si desea pagar parte de los ${suma} UYU por adelantado.`))
let numeroCuotas = parseInt(prompt('Ingrese número de cuotas en que desea pagar (de seleccionar el pago en más de 6 cuotas, aplica un interes del 5%).'));

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

const cuotaMes = valorCuota(costoTotal, pagoAdelanto, numeroCuotas)

function avisoFinal() {
    if (numeroCuotas <= 6) {
        alert(`Usted ha seleccionado pagar ${costoTotal} UYU en ${numeroCuotas} cuotas de ${parseInt(cuotaMes)} UYU, realizando un pago por adelantado de ${pagoAdelanto} UYU.`)
    } else if (numeroCuotas > 6) {
        alert(`Usted ha seleccionado pagar ${costoTotal} UYU en ${numeroCuotas} cuotas de ${parseInt(cuotaMes)} UYU, realizando un pago por adelantado de ${pagoAdelanto} UYU (se ha aplicado un 5% de interes).`)
    } else {
        alert('Ningún dato ha sido ingresado.')
    }
}

avisoFinal()

console.log(costoTotal)
console.log(pagoAdelanto)
console.log(numeroCuotas)
console.log(`El valor de la cuota es de ${parseInt(cuotaMes)} UYU para las ${numeroCuotas} cuotas seleccionadas.`)
