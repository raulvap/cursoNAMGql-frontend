// Lesson 119: configurando useReducer para manejar el state de pedidos
// 3. CREAMOS EL STATE, despúes vamos a crear las acciones que hace el reducer
import React, { useReducer } from "react";

// importamos el context:
import PedidoContext from "./PedidoContext";

// importamos el reducer
import PedidoReducer from "./PedidoReducer";

// importamos los types:
import {
   SELECCIONAR_CLIENTE,
   SELECCIONAR_PRODUCTO,
   CANTIDAD_PRODUCTOS,
   ACTUALIZAR_TOTAL,
} from "../../types";

// creamos el state:
const PedidoState = ({ children }) => {
   // State inicial de pedidos (lesson 120)
   const initialState = {
      cliente: {},
      productos: [],
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

   // Modificar los productos del state (lesson 126)
   // ***** DEBEMOS PASAR ESTA FUNCION AL CONTEXT MÁS ABAJO ****
   const agregarProducto = (productosSeleccionadosDelComponente) => {
      //Lesson 131: agregamos un state para manejar la cantidad deseada:
      let nuevoState;
      if (state.productos.length > 0) {
         // Tomar del segundo arreglo, una copia para asignarlo al primero y así guardar cantidad en el nuevo objeto
         nuevoState = productosSeleccionadosDelComponente.map((item) => {
            const objetoTemporal = state.productos.find((itemState) => itemState.id === item.id);
            // creamos un nuevo objeto en la var "nuevoState":
            return { ...item, ...objetoTemporal };
         });
      } else {
         nuevoState = productosSeleccionadosDelComponente;
      }

      dispatch({
         type: SELECCIONAR_PRODUCTO,
         payload: nuevoState,
      });
   };

   // Modificar la cantidad de productos en el pedido: (lesson 130)
   const cantidadProductos = (nuevoProducto) => {
      dispatch({
         type: CANTIDAD_PRODUCTOS,
         payload: nuevoProducto,
      });
   };

   // Actualizar el total a pagar (lesson 132)
   const actualizarTotal = () => {
      dispatch({
         type: ACTUALIZAR_TOTAL,
         // no hay payload pq el state tiene todo lo necesario: cantidad y precio
      });
   };

   return (
      // para mandar el state a toda la app, usamos el context que creamos: (lesson 120)
      <PedidoContext.Provider
         value={{
            cliente: state.cliente,
            productos: state.productos,
            total: state.total,
            agregarCliente,
            agregarProducto,
            cantidadProductos,
            actualizarTotal,
         }}
      >
         {children}
      </PedidoContext.Provider>
   );
};

export default PedidoState;
