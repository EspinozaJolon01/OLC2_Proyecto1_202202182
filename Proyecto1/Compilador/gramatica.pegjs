
{
  const crearNodo = (tipoNodo, props) =>{
    const tipos = {
      'numero': nodos.Numero,
      'agrupacion': nodos.Agrupacion,
      'binaria': nodos.OpeBini,
      'unaria': nodos.OpeUnaria,
      'declaracionVariable': nodos.DeclaracionVariable,
      'referenciaVariable': nodos.ReferenciaVariable,
      'print': nodos.Print,
      'expresionStmt': nodos.ExpresionStmt,
      'asignacion': nodos.Asignacion,
      'bloque': nodos.Bloque,
      'if': nodos.If,
      'while': nodos.While,
      'for' : nodos.For,
      'boolena' : nodos.Boolena,
      'cadenaString' : nodos.CadenaString,
      'caracter' : nodos.Caracter,
      'typeof1' : nodos.Typeof1,
      'declaracionSinAargumn' : nodos.DeclaracionSinAargumn,
      'embebidas' : nodos.Embebidas
    }

    const nodo = new tipos[tipoNodo](props)
    nodo.location = location()
    return nodo
  }
}

programa = _ dcl:Declaracion* _ { return dcl }

Declaracion = dcl:VarDcl _ { return dcl }
            / stmt:Stmt _ { return stmt }

VarDcl = tipo:Tipo _ id:Identify _ "=" _ exp:Expresion _ ";" { return crearNodo('declaracionVariable', { tipo, id, exp }) }
      / tipo:Tipo _ id:Identify _ ";" { return crearNodo('declaracionSinAargumn', {tipo, id})}


Tipo = "int" {return text()}
        / "float" {return text()}    
        / "string" {return text()}
        / "boolean"  {return text()}
        / "char" {return text()}
        / "var" {return text()}


Stmt = "print(" _ exp: Expresion _ expM: ("," _ expM: Expresion { return expM } )* _ ")" _ ";" { return crearNodo('print', { exp, expM }) }
    / exp:Expresion _ ";" { return crearNodo('expresionStmt', { exp }) }
    / "{" _ dcls:Declaracion* _ "}" { return crearNodo('bloque', { dcls }) }
    / "if" _ "(" _ cond:Expresion _ ")" _ stmtTrue:Stmt 
      stmtFalse:(
        _ "else" _ stmtFalse:Stmt { return stmtFalse } 
      )? { return crearNodo('if', { cond, stmtTrue, stmtFalse }) }
    / "while" _ "(" _ cond:Expresion _ ")" _ stmt:Stmt { return crearNodo('while', { cond, stmt }) }
    / "for" _ "(" _ inicializacion:Declaracion _ condicion:Expresion _ ";" _ incremento:Expresion _ ")" _ stmt:Stmt {return crearNodo('for', {inicializacion,condicion,incremento,stmt})}
    

Identify = [a-zA-Z][a-zA-Z0-9]* { return text() }
    / '"' content:([a-zA-Z0-9 ]*) '"' { return content.join('');
}
Expresion = Asignacion

Asignacion = id:Identify _ "=" _ asgn:Asignacion { return crearNodo('asignacion', { id, asgn }) }
          /  id:Identify _ "+=" _ asgn:Expresion { return crearNodo('asignacion', { id, asgn: crearNodo('binaria', { op: "+=", izq: crearNodo('referenciaVariable', { id }),der: asgn }) })} 
          /  id:Identify _ "-=" _ asgn:Expresion { return crearNodo('asignacion', { id, asgn: crearNodo('binaria', { op: "-=", izq: crearNodo('referenciaVariable', { id }),der: asgn }) })} 
          / Log

Log = izq:Igualacion expansion:(
  _ op:("&&" / "||") _ der:Igualacion { return { tipo: op, der } })* 
  { 
  return expansion.reduce(
    (operacionAnterior, operacionActual) => {
      const { tipo, der } = operacionActual
      return crearNodo('binaria', { op:tipo, izq: operacionAnterior, der })
    },
    izq
  )
}

Igualacion = izq:Comparacion expansion:(
  _ op:("!=" / "==") _ der:Comparacion { return { tipo: op, der } })* 
  { 
  return expansion.reduce(
    (operacionAnterior, operacionActual) => {
      const { tipo, der } = operacionActual
      return crearNodo('binaria', { op:tipo, izq: operacionAnterior, der })
    },
    izq
  )
}


Comparacion = izq:Suma expansion:(
  _ op:("<=" / ">=" / "<" / ">") _ der:Suma { return { tipo: op, der } })* 
  { 
  return expansion.reduce(
    (operacionAnterior, operacionActual) => {
      const { tipo, der } = operacionActual
      return crearNodo('binaria', { op:tipo, izq: operacionAnterior, der })
    },
    izq
  )
}


Suma = izq:Multiplicacion expansion:(
  _ op:("+" / "-") _ der:Multiplicacion { return { tipo: op, der } }
)* { 
  return expansion.reduce(
    (operacionAnterior, operacionActual) => {
      const { tipo, der } = operacionActual
      return crearNodo('binaria', { op:tipo, izq: operacionAnterior, der })
    },
    izq
  )
}

Multiplicacion = izq:Unaria expansion:(
  _ op:("*" / "/" / "%") _ der:Unaria { return { tipo: op, der } }
)* {
    return expansion.reduce(
      (operacionAnterior, operacionActual) => {
        const { tipo, der } = operacionActual
        return crearNodo('binaria', { op:tipo, izq: operacionAnterior, der })
      },
      izq
    )
}

Unaria = op:("-"/"!") _ num:Valores { return crearNodo('unaria', { op, exp: num }) }
  /  Embe:("typeof") _ dat:Valores { return crearNodo('embebidas', {Embe, exp: dat }) }
  / Embe: ("toUpperCase" /"toLowerCase" /"parsefloat"/"parseInt"/"toString") "(" _ dat:Valores _ ")" _ { return crearNodo('embebidas', {Embe, exp: dat }) }
  / id: Identify "++" { return crearNodo('asignacion', { id, asgn: crearNodo('unaria', { op: "++", exp: crearNodo('referenciaVariable', { id }) }) }) }
  / id: Identify "--" { return crearNodo('asignacion', { id, asgn: crearNodo('unaria', { op: "--", exp: crearNodo('referenciaVariable', { id }) }) }) }
  / Valores


Valores =  Bool
  /CadeString 
  /Caracter
  / Numero

Bool = "true" { return crearNodo('boolena', { valor: true , tipo : "boolean" }) }
          / "false" { return crearNodo('boolena', { valor: false ,  tipo : "boolean"  }) }


CadeString = "\"" chars:([^"]*) "\"" { return crearNodo('cadenaString', { valor: chars.join("") , tipo :"string"}) }

Caracter = "'" char:[^'] "'" { return crearNodo('caracter', { valor: char, tipo: "char" }) }


// { return{ tipo: "numero", valor: parseFloat(text(), 10) } }
Numero = [0-9]+( "." [0-9]+ )? { return text().includes('.') ? crearNodo('numero', { valor: parseFloat(text(), 10), tipo:"float"}) : crearNodo('numero', { valor: parseInt(text(), 10), tipo:"int"})	 }
  / "(" _ exp:Expresion _ ")" { return crearNodo('agrupacion', { exp }) }
  / id:Identify { return crearNodo('referenciaVariable', { id }) }


// Definición de comentarios para omitirlos
Comentario = "//" [^\n]* { /* Ignora comentarios de una línea */ }
          / "/*" (!"*/" .)* "*/" { /* Ignora comentarios multilínea */ }

_ = (Comentario / [ \t\n\r])* // Actualiza la regla _ para incluir comentarios