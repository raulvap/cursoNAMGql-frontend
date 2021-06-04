// Lesson 119: configurando useReducer para manejar el state de pedidos
// 4. CREAMOS LAS ACCIONES QUE VA A HACER EL REDUCER

// importamos los types:
import {
   SELECCIONAR_CLIENTE,
   SELECCIONAR_PRODUCTO,
   CANTIDAD_PRODUCTOS,
   ACTUALIZAR_TOTAL,
} from "../../types";

// creamos las acciones que va a modificar el STATE CENTRALIZADO de la app:
const PedidoReducer = (state, action) => {
   switch (action.type) {
      // Lesson 123: agregando el cliente seleccionado al STATE
      case SELECCIONAR_CLIENTE:
         return {
            ...state,
            cliente: action.payload,
         };

      case SELECCIONAR_PRODUCTO:
         return {
            ...state,
            productos: action.payload,
         };

      case CANTIDAD_PRODUCTOS:
         // Lesson 130: le vamos a pasar la cantidad que queremos en el pedido:
         return {
            ...state,
            productos: state.productos.map((producto) =>
               producto.id === action.payload.id ? (producto = action.payload) : producto
            ),
         };

      case ACTUALIZAR_TOTAL:
         // Lesson 132: creando la función para actualizar el total
         return {
            ...state,
            total: state.productos.reduce(
               (acumTotal, item) => (acumTotal += item.precio * item.cantidad),
               0
            ),
         };

      default:
         return state;
   }
};

export default PedidoReducer;
