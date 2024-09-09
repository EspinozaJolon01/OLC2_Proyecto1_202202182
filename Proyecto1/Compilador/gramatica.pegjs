
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
      'arregloCantidad' : nodos.ArregloCantidad,
      'arregloCopia' : nodos.ArregloCopia,
      'accesoElem' : nodos.AccesoElem,
      'accElem' : nodos.AccElem,
      'asigVector' : nodos.AsigVector,
      'matrices' : nodos.Matrices,
      'matrizCantidad' : nodos.MatrizCantidad,
      'break': nodos.Break,
      'continue': nodos.Continue,
      'return': nodos.Return,
      'case' : nodos.Case,
      'forEach' : nodos.ForEach,
      'funLlamada' : nodos.FunLlamada,
      'declaracionFuncion' : nodos.DeclaracionFuncion,
      'estructura' : nodos.Estructura,
      'contenidoStruct' : nodos.ContenidoStruct,
      'instStuc' : nodos.InstStuc,
      'get' : nodos.Get,
      'set' : nodos.Set,
      'funStruct' : nodos.FunStruct
      
    }

    const nodo = new tipos[tipoNodo](props)
    nodo.location = location()
    return nodo
  }
}

programa = _ dcl:Declaracion* _ { return dcl }

Declaracion = dcl:DeStruct _ { return dcl }
            / dcl:VarDcl _ { return dcl }
            / Inst:DeclaInst _ { return Inst }
            / dcl:DeclaFun _ { return dcl }
            / stmt:Stmt _ { return stmt }

VarDcl = tipo:Tipo _ id:Identify _ "=" _ exp:Expresion _ ";" { return crearNodo('declaracionVariable', { tipo, id, exp }) }
      / tipo:Tipo _ id:Identify _ ";" { return crearNodo('declaracionSinAargumn', {tipo, id})}
      /Arreglos 
      /Matrices

DeclaFun = tipo:(Tipo / "void") _ id:Identify _ "(" _ params:Parametros? _ ")" _ bloque:Bloque { return crearNodo('declaracionFuncion', { tipo, id, params: params || [], bloque }) }

DeStruct  = "struct" _ id:Identify _ "{" _ dcls:BloStruct* _ "}" _ ";" { return crearNodo('estructura', { id, dcls }) }


BloStruct = tipo: ("int"/"float"/"string"/"boolean"/"char"/Identify) _ id: Identify _ ";" _ { return { tipo, id } }
          

Parametros = primerParametro:Params restoParametros:("," _ parametro:Params { return parametro; })* 
            { return [primerParametro, ...restoParametros]; }

Params = tipo:Tipo dimensiones:Dimension? _ id:Identify { return { tipo, id, dim: dimensiones || "" }; }

Dimension = "[" _ "]"+  { return text(); }


Matrices = tipo:TipoArrays _ dimensiones:("[" _ "]")+ _ id:Identify _ "=" _ valores:ValoresMatriz _ ";" 
  { 
    return crearNodo('matrices', { 
      tipo, 
      id, 
      valores,
      nD: dimensiones.length  // Número de dimensiones
    }) 
  }

ValoresMatriz = "{" _ primerValor:ValorMatriz _ resto:("," _ ValorMatriz _)* _ "}"
  {
    return [primerValor, ...resto.map(r => r[2])];
  }


  ValorMatriz = valor:ValoresMatriz {return valor}  // Para manejar matrices anidadas
  / exp: Expresion  {return exp} // Para valores individuales

//Lista = "{"_ exp: Expresion _ expM: ("," _ expM: Expresion { return expM } )* _"}" {return {arregl1:exp, arregl2: expM} }

// Dimen = _ "{" _ datA:DatAregl _ "}"* _ {return datA}

// DatAregl = _ exp: Expresion _ expM: ("," _ expM: Expresion { return expM } )* _ {return {dato1:exp, dato2: expM} }



Arreglos = //tipo:Tipo _ "[]" _ id:Identify _ "=" _ ArreTi:TipoDeca _ ";" {return crearNodo('arregloValores' ,{tipo, id,ArreTi})}
  tipo:TipoArrays _ dimeAr:("[" _ "]")+ _ id:Identify _ "=" _ "new" _ tipo2:Tipo _ "[" _ dim:Expresion _ "]" dims:("[" _ Expresion _ "]")* _ ";" 
  { 
    return crearNodo('arregloCantidad', {
      tipo: tipo,
      id: id,
      tipo2: tipo2,
      nd : dimeAr.length, // Número de dimensiones
      dimensiones: [dim].concat(dims.map(d => d[2]))
      
    });
  }        / tipo:TipoArrays _ "[]" _ id:Identify _ "=" _ exp:Expresion _ ";" {return crearNodo('arregloCopia', {tipo,id,exp})}


//TipoDeca = _ "{" _ Lista:ListaValores _ "}" _ {return Lista}


//ListaValores =  _ exp: Expresion _ expM: ("," _ expM: Expresion { return expM } )* _ {return {dato1:exp, dato2: expM} }
// Persona persona = Persona {};
DeclaInst = tipo:Identify _ id:Identify _ "=" _ instan:Expresion _ ";" { return crearNodo('instStuc', { tipo, id, instan }) }

Tipo = "int" {return text()}
        / "float" {return text()}    
        / "string" {return text()}
        / "boolean"  {return text()}
        / "char" {return text()}
        / "var" {return text()}


TipoArrays = "int" {return text()}
        / "float" {return text()}    
        / "string" {return text()}
        / "boolean"  {return text()}
        / "char" {return text()}



Stmt = "System.out.println(" _ exp: Expresion _ expM: ("," _ expM: Expresion _ { return expM } )* _ ")" _ ";" { return crearNodo('print', { exp, expM }) }
    / Bloque: Bloque { return Bloque }
    / "if" _ "(" _ cond:Expresion _ ")" _ stmtTrue:Stmt 
      stmtFalse:(
        _ "else" _ stmtFalse:Stmt { return stmtFalse } 
      )? { return crearNodo('if', { cond, stmtTrue, stmtFalse }) }
    / "while" _ "(" _ cond:Expresion _ ")" _ stmt:Stmt { return crearNodo('while', { cond, stmt }) }
    / "for" _ "(" _ inicializacion:ForComienzo _ condicion:Expresion _ ";" _ incremento:Expresion _ ")" _ stmt:Stmt {return crearNodo('for', {inicializacion,condicion,incremento,stmt})}
    / "switch" _ "("_ exp: Expresion _")"_ "{" _ cas:EstructuraCase* _ def:default? _ "}"  {return crearNodo('switch', {exp,cas,def})} 
    / "for" _ "(" _ tipo:TipoArrays _ id:Identify _ ":" _ id2:Identify _ ")" _ stmt:Stmt {return crearNodo('forEach', {tipo,id,id2,stmt})}
    / "break" _ ";" { return crearNodo('break') }
    / "continue" _ ";" { return crearNodo('continue') }
    / "return" _ exp:Expresion? _ ";" { return crearNodo('return', { exp }) }
    / exp:Expresion _ ";" { return crearNodo('expresionStmt', { exp }) }

Bloque = "{" _ dcls:Declaracion* _ "}" { return crearNodo('bloque', { dcls }) }


ForComienzo = dcl:VarDcl { return dcl }
        / exp:Expresion _ ";" { return exp }



EstructuraCase = "case" _ exp: Expresion _ ":" _ commands:(_ commands:Declaracion _{return commands})* _ breakStatement:("break" _ ";")? _ {return crearNodo('case', {exp, commands, breakST: !!breakStatement})};

default = "default" _ ":" _ bloque:Declaracion* _  {return {bloque}}

Identify = [a-zA-Z_][a-zA-Z0-9_]* { return text() }
    

Expresion = Asignacion
        
          

Asignacion =  id:Identify _ indices:("[" exp:Expresion "]" {return exp})+ _ "=" _ dato:Expresion {return crearNodo('asigVector', {id,indices,dato})}
      /asignado:FunLlamada _ "=" _ asgn:Asignacion 
  { 

    if (asignado instanceof nodos.ReferenciaVariable) {
      return crearNodo('asignacion', { id: asignado.id, asgn })
    }

    if (!(asignado instanceof nodos.Get || asignado instanceof nodos.Matrices || asignado instanceof nodos.ArregloCopia || asignado instanceof nodos.ArregloCantidad || asignado instanceof nodos.AccElem || asignado instanceof nodos.AsigVector )) {
      throw new Error('Solo se pueden asignar valores a propiedades de objetos')
    }
    
    return crearNodo('set', { objetivo: asignado.objetivo, propiedad: asignado.propiedad, valor: asgn })


  }
          /  id:Identify _ "+=" _ asgn:Expresion { return crearNodo('asignacion', { id, asgn: crearNodo('binaria', { op: "+=", izq: crearNodo('referenciaVariable', { id }),der: asgn }) })} 
          /  id:Identify _ "-=" _ asgn:Expresion { return crearNodo('asignacion', { id, asgn: crearNodo('binaria', { op: "-=", izq: crearNodo('referenciaVariable', { id }),der: asgn }) })} 
          /AcceElemn

AcceElemn = OpTenario


OpTenario = validar:Log _ "?" _ cond1:Log _ ":" _ cond2:Log {return crearNodo('ternario',{validar,cond1,cond2})}
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

Unaria = 
        dati:Identify "." op:"indexOf" "("_ bus:Expresion? _")" _ {return crearNodo('accesoElem',{dat: crearNodo('referenciaVariable' , {id:dati}),op,bus})}
        / dati:Identify "." op:"length" _ {return crearNodo('accesoElem',{dat: crearNodo('referenciaVariable' , {id:dati}),op, bus: undefined})}
        / dati:Identify "." op:"join" _ "()"  {return crearNodo('accesoElem',{dat: crearNodo('referenciaVariable' , {id:dati}),op, bus: undefined})}
        / tipo:"Object.keys(" _ dato:Identify _ ")" {return crearNodo('funStruct',{tipo, dato})}
  / Embe:("typeof") _ dat:Valores { return crearNodo('embebidas', {Embe, exp: dat }) }
  / Embe: ("toUpperCase" /"toLowerCase" /"parsefloat"/"parseInt"/"toString") "(" _ dat:Valores _ ")" _ { return crearNodo('embebidas', {Embe, exp: dat }) }
  / id: Identify "++" { return crearNodo('asignacion', { id, asgn: crearNodo('unaria', { op: "++", exp: crearNodo('referenciaVariable', { id }) }) }) }
  / op:"-" _ num:Unaria { return crearNodo('unaria', { op, exp: num }) }
  / op:"!" _ num:Valores { return crearNodo('unaria', { op, exp: num }) }
  / id: Identify "--" { return crearNodo('asignacion', { id, asgn: crearNodo('unaria', { op: "--", exp: crearNodo('referenciaVariable', { id }) }) }) }
  / Valores



Valores =  Bool
  /CadeString 
  /Caracter
  / FunLlamada


// FunLlamada = funLam:Numero _ params:("(" args:Argumens? ")" { return args })* {      
//     return params.reduce(
//         (funLam, args) => {
//           return crearNodo('funLlamada', {  funLam, args: args || []})
//         },
//         funLam
//       )
      
//       }

FunLlamada = objetivoInicial:Numero operaciones:(
    ("(" _ args:Argumens? _ ")" { return {args, tipo: 'funcCall' } })
    / ("." _ id:Identify _ { return { id, tipo: 'get' } })
  )* 
  {
  const op =  operaciones.reduce(
    (objetivo, args) => {
      // return crearNodo('llamada', { callee, args: args || [] })
      const { tipo, id, args:argumentos } = args

      if (tipo === 'funcCall') {
        return crearNodo('funLlamada', { funLlan: objetivo, args: argumentos || [] })
      }else if (tipo === 'get') {
        return crearNodo('get', { objetivo, propiedad: id })
      }
    },
    objetivoInicial
  )

return op
}

Argumens = arg:Expresion _ args:("," _ args:Expresion { return args })* { return [arg, ...args] }

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
  / instan:Intancia  {return instan}
  / id:Identify _ dimensiones:("[" exp:Expresion "]" {return exp})+ {return crearNodo('accElem', {id, dimensiones});}
  
  ///id:Identify "[" _ exp1:Expresion _ "]" _ "[" _ exp2:Expresion _ "]" {return crearNodo('accMatriz', {id,exp1,exp2})}
  
  / id:Identify { return crearNodo('referenciaVariable', { id }) }

Intancia = _ tipo: Identify _ "{"_ atributos:( datAtri: DatoStruc _ datAtris:("," _ atriDat: DatoStruc { return atriDat })* _ { return [datAtri, ...datAtris] }) _ "}" { return crearNodo('contenidoStruct', { tipo, atributos }) }

DatoStruc = id: Identify _ ":" _ exp: Expresion _ { return { id, exp } }


// Definición de comentarios para omitirlos
Comentario = "//" [^\n]* { /* Ignora comentarios de una línea */ }
          / "/*" (!"*/" .)* "*/" { /* Ignora comentarios multilínea */ }

_ = (Comentario / [ \t\n\r])* // Actualiza la regla _ para incluir comentarios




