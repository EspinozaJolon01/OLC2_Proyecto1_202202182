import { Ejecutable } from './Ejecutable.js';
import { Entorno } from './entornos.js';
import { BreakException } from './TransferCommands.js';
import { ReturnException } from './TransferCommands.js';

export class FuncionRemota extends Ejecutable {

    constructor(node,clousure) {
        super();

        /**
    * @type {DeclaracionFuncion}
    */
        this.node = node;
        /**
         * @type {Entorno}
         */
        this.clousure = clousure;
    }

    aridad() {
        return this.node.params.length;
    }

    /**
    * @type {Invocable['invocar']}
    */

    invocar(interprete, argumentos) {
        const nuevoEntorno = new Entorno(this.clousure);

        this.node.params.forEach((parametro, i) => {
            nuevoEntorno.setVariable(parametro.tipo,parametro.id, argumentos[i].valor);
        });


        const entornoAntesDeEjecutar = interprete.entornoActual;
        interprete.entornoActual = nuevoEntorno;

        try {
            this.node.bloque.accept(interprete);
        } catch (error) {
            interprete.entornoActual = entornoAntesDeEjecutar;
            
            if (error instanceof ReturnException) {

                if(this.node.tipo === 'void' && error.value !== null){
                    throw new Error(`Una función de tipo 'void' no puede retornar un valor.`);
                }

                if(this.node.tipo !== error.value.tipo){
                    throw new Error(`El tipo de retonor no coincide con el esperado`)
                }
                return error.value;
            }
            if( error instanceof BreakException){
                return;
            }

            throw error;
        }

        interprete.entornoActual = entornoAntesDeEjecutar;
        return null;

    }
}