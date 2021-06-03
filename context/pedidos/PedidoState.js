// Lesson 119: configurando useReducer para manejar el state de pedidos
// 3. CREAMOS EL STATE, despúes vamos a crear las acciones que hace el reducer
import React, { useReducer } from "react";

// importamos el context:
import PedidoContext from "./PedidoContext";

// importamos el reducer
import PedidoReducer from "./PedidoReducer";

// importamos los types:
import { SELECCIONAR_CLIENTE, SELECCIONAR_PRODUCTO, CANTIDAD_PRODUCTOS } from "../../types";

// creamos el state:
const PedidoState = ({ children }) => {
   // State inicial de pedidos (lesson 120)
   const initialState = {
      cliente: {},
      producto: [],
      total: 0,
   };

   // usamos el reducer para el manejo de los estados: (lesson 120)
   // el dispatch es la función que evalua los cases, y modifica el state de la app
   // useReducer toma 2 parámetros: primero el reducer que va a utilizar, y segundo el state inicial/actual de la app
   const [state, dispatch] = useReducer(PedidoReducer, initialState);

   // Modificar el cliente del state: (lesson 123), al definir la función, también la pasamos al context dentro del return
   const agregarCliente = (cliente) => {
      // el dispatch va a modificar el state:
      dispatch({
         type: SELECCIONAR_CLIENTE,
         payload: cliente,
         //   payload es lo que se va a pasar al state para modificarlo
      });
   };

   return (
      // para mandar el state a toda la app, usamos el context que creamos: (lesson 120)
      <PedidoContext.Provider
         value={{
            agregarCliente,
         }}
      >
         {children}
      </PedidoContext.Provider>
   );
};

export default PedidoState;
