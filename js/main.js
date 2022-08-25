let digitoUno = parseInt(prompt('Vamos a calcular el número verificador de su cedula de identidad. A continuación ingrese el primer digito de su cedula (en caso de ser menor a 1 millon, ingrese 0).'))
let digitoDos = parseInt(prompt('Ingrese el segundo número.'))
let digitoTres = parseInt(prompt('Ingrese el tercer número.'))
let digitoCuatro = parseInt(prompt('Ingrese el cuarto número.'))
let digitoCinco = parseInt(prompt('Ingrese el quinto número.'))
let digitoSeis = parseInt(prompt('Ingrese el sexto número.'))
let digitoSiete = parseInt(prompt('Ingrese el séptimo número.'))

let numeroPrimario = digitoUno * 2 + digitoDos * 9 + digitoTres * 8 + digitoCuatro * 7 + digitoCinco * 6 + digitoSeis * 3 + digitoSiete * 4

for( let numeroSecundario = numeroPrimario; numeroSecundario <= 1000; numeroSecundario++){
    let verificador = numeroSecundario % 10
    if(verificador != 0){
        continue
    }
    alert('Su numero verificador es ' + (numeroSecundario - numeroPrimario))
    break
}