// Lesson 119: configurando useReducer para manejar el state de pedidos
// 4. CREAMOS LAS ACCIONES QUE VA A HACER EL REDUCER

// importamos los types:
import { SELECCIONAR_CLIENTE, SELECCIONAR_PRODUCTO, CANTIDAD_PRODUCTOS } from "../../types";

// creamos las acciones que va a modificar el STATE CENTRALIZADO de la app:
const PedidoReducer = (state, action) => {
   switch (action.type) {
      // Lesson 123: agregando el cliente seleccionado al STATE
      case SELECCIONAR_CLIENTE:
         return {
            ...state,
            cliente: action.payload,
         };

      default:
         return state;
   }
};

export default PedidoReducer;
