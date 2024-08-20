
Expresion = Suma


Suma = izq:Multiplicacion expansion:(
  op:("+" / "-") der:Multiplicacion { return { tipo: op, der } })* { 
  return expansion.reduce(
    (operacionAnterior, operacionActual) => {
      const { tipo, der } = operacionActual
      return { tipo, izq: operacionAnterior, der }
    },
    izq
  )
}

// ExpansionSuma = "+" der:Multiplicacion { return { tipo: "+", der } }

Multiplicacion = izq:Unaria expansion:(
  op:("*" / "/") der:Unaria { return { tipo: op, der } }
)* {
    return expansion.reduce(
      (operacionAnterior, operacionActual) => {
        const { tipo, der } = operacionActual
        return { tipo, izq: operacionAnterior, der }
      },
      izq
    )
}

// ExpansionMultiplicacion = "*" der:Numero { return { tipo: "*", der } }

Unaria = "-" num:Numero { return { tipo: "-", der: num } }
/ Numero


Numero = [0-9]+( "." [0-9]+ )? { return{ tipo: "numero", valor: parseFloat(text(), 10) } }
  / "(" exp:Expresion ")" { return { tipo: "parentesis", exp } }