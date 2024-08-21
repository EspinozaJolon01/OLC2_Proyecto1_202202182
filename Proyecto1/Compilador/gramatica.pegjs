
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
      'for' : nodos.For
      
    }

    const nodo = new tipos[tipoNodo](props)
    nodo.location = location()
    return nodo
  }
}

programa = _ dcl:Declaracion* _ { return dcl }

Declaracion = dcl:VarDcl _ { return dcl }
            / stmt:Stmt _ { return stmt }

VarDcl = "var" _ id:Identify _ "=" _ exp:Expresion _ ";" { return crearNodo('declaracionVariable', { id, exp }) }

Stmt = "print(" _ exp:Expresion _ ")" _ ";" { return crearNodo('print', { exp }) }
    / exp:Expresion _ ";" { return crearNodo('expresionStmt', { exp }) }
    / "{" _ dcls:Declaracion* _ "}" { return crearNodo('bloque', { dcls }) }
    / "if" _ "(" _ cond:Expresion _ ")" _ stmtTrue:Stmt 
      stmtFalse:(
        _ "else" _ stmtFalse:Stmt { return stmtFalse } 
      )? { return crearNodo('if', { cond, stmtTrue, stmtFalse }) }
    / "while" _ "(" _ cond:Expresion _ ")" _ stmt:Stmt { return crearNodo('while', { cond, stmt }) }
    / "for" _ "(" _ inicializacion:Declaracion _ condicion:Expresion _ ";" _ incremento:Expresion _ ")" _ stmt:Stmt {return crearNodo('for', {inicializacion,condicion,incremento,stmt})}

Identify = [a-zA-Z][a-zA-Z0-9]* { return text() }

Expresion = Asignacion

Asignacion = id:Identify _ "=" _ asgn:Asignacion { return crearNodo('asignacion', { id, asgn }) }
          / Comparacion

Comparacion = izq:Suma expansion:(
  _ op:("<=") _ der:Suma { return { tipo: op, der } })* 
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
  _ op:("*" / "/") _ der:Unaria { return { tipo: op, der } }
)* {
    return expansion.reduce(
      (operacionAnterior, operacionActual) => {
        const { tipo, der } = operacionActual
        return crearNodo('binaria', { op:tipo, izq: operacionAnterior, der })
      },
      izq
    )
}

Unaria = "-" _ num:Numero { return crearNodo('unaria', { op: '-', exp: num }) }
/ id: Identify "++" { return crearNodo('asignacion', { id, asgn: crearNodo('unaria', { op: "++", exp: crearNodo('referenciaVariable', { id }) }) }) }
/ id: Identify "--" { return crearNodo('asignacion', { id, asgn: crearNodo('unaria', { op: "--", exp: crearNodo('referenciaVariable', { id }) }) }) }
/ Numero


// { return{ tipo: "numero", valor: parseFloat(text(), 10) } }
Numero = [0-9]+( "." [0-9]+ )? {return crearNodo('numero', { valor: parseFloat(text(), 10) })}
  / "(" _ exp:Expresion _ ")" { return crearNodo('agrupacion', { exp }) }
  / id:Identify { return crearNodo('referenciaVariable', { id }) }


_ = [ \t\n\r]*