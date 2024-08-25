
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
      'embebidas' : nodos.Embebidas,
      'switch' :nodos.Switch,
      'ternario' : nodos.Ternario,
      'arregloValores' : nodos.ArregloValores,
      'arregloCantida' : nodos.ArregloCantida
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
      /Arreglos

Arreglos = tipo:Tipo _ "[]" _ id:Identify _ "=" _ ArreTi:TipoDeca _ ";" {return crearNodo('arregloValores' ,{tipo, id,ArreTi})}
        / tipo:Tipo _ "[]" _ id:Identify _ "=" _ "new" _ tipo2:Tipo _ "[" _ dim:Numero _ "]" _ ";" {return crearNodo('arregloCantida' , {tipo, id, tipo2, dim})}


TipoDeca = _ "{" _ Lista:ListaValores _ "}" _ {return Lista}


ListaValores =  _ exp: Expresion _ expM: ("," _ expM: Expresion { return expM } )* _ {return {dato1:exp, dato2: expM} }


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
    / "switch" _ "("_ exp: Expresion _")"_ "{" _ cas:EstructuraCase* _ def:default? _ "}"  {return crearNodo('switch', {exp,cas,def})} 

EstructuraCase = "case" _ exp: Expresion _ ":" _ bloque:Stmt* _ {return {exp,bloque}}

default = "default" _ ":" _ bloque:Stmt* _  {return {bloque}}

Identify = [a-zA-Z][a-zA-Z0-9]* { return text() }
    / '"' content:([a-zA-Z0-9 ]*) '"' { return content.join('');
}
Expresion = Asignacion
        
          

Asignacion = OpTenario
          /id:Identify _ "=" _ asgn:Asignacion { return crearNodo('asignacion', { id, asgn }) }
          /  id:Identify _ "+=" _ asgn:Expresion { return crearNodo('asignacion', { id, asgn: crearNodo('binaria', { op: "+=", izq: crearNodo('referenciaVariable', { id }),der: asgn }) })} 
          /  id:Identify _ "-=" _ asgn:Expresion { return crearNodo('asignacion', { id, asgn: crearNodo('binaria', { op: "-=", izq: crearNodo('referenciaVariable', { id }),der: asgn }) })} 
          / Log

OpTenario = validar:Log _ "?" _ cond1:Log _ ":" _ cond2:Log {return crearNodo('ternario',{validar,cond1,cond2})}


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


CadeString = "\"" chars:([^"]*) "\"" {var text = chars.join(""); 
            text = text.replace(/\\n/g, "\n");
            text = text.replace(/\\\\/g, "\\");
            text = text.replace(/\\\"/g,"\"");
            text = text.replace(/\\r/g, "\r");
            text = text.replace(/\\t/g, "\t");
            text = text.replace(/\\\'/g, "'");
            return crearNodo('cadenaString', { valor: text , tipo :"string"}) }

Caracter = "'" char:[^'] "'" { return crearNodo('caracter', { valor: char, tipo: "char" }) }


// { return{ tipo: "numero", valor: parseFloat(text(), 10) } }
Numero = [0-9]+( "." [0-9]+ )? { return text().includes('.') ? crearNodo('numero', { valor: parseFloat(text(), 10), tipo:"float"}) : crearNodo('numero', { valor: parseInt(text(), 10), tipo:"int"})	 }
  / "(" _ exp:Expresion _ ")" { return crearNodo('agrupacion', { exp }) }
  / id:Identify { return crearNodo('referenciaVariable', { id }) }


// Definición de comentarios para omitirlos
Comentario = "//" [^\n]* { /* Ignora comentarios de una línea */ }
          / "/*" (!"*/" .)* "*/" { /* Ignora comentarios multilínea */ }

_ = (Comentario / [ \t\n\r])* // Actualiza la regla _ para incluir comentarios