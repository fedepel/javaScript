let costoTotal = parseInt(prompt('Ingrese el costo de su compra (UYU).'))
let pagoAdelanto = parseInt(prompt('Ingrese si desea pagar una parte del costo por adelantado (UYU).'))
let numeroCuotas = parseInt(prompt('Ingrese número de cuotas (de seleccionar el pago en más de 6 cuotas, aplica un interes del 5%).'));

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

avisoFinal ()

console.log(costoTotal)
console.log(pagoAdelanto)
console.log(numeroCuotas)
console.log(`El valor de la cuota es de ${parseInt(cuotaMes)} UYU para las ${numeroCuotas} cuotas seleccionadas.`)
