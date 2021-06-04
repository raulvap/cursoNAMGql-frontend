import React, { useEffect, useState, useContext } from "react";
import Select from "react-select";
import { gql, useQuery } from "@apollo/client";
import PedidoContext from "../../context/pedidos/PedidoContext";

const OBTENER_PRODUCTOS = gql`
   query obtenerProductos {
      obtenerProductos {
         id
         nombre
         precio
         existencia
      }
   }
`;

const AsignarProductos = () => {
   // state local del componente
   const [productos, setProductos] = useState([]);

   // Context: extraer las funciones del context
   const pedidoContext = useContext(PedidoContext);
   const { agregarProducto } = pedidoContext;

   // consulta a la base de datos
   const { data, loading, error } = useQuery(OBTENER_PRODUCTOS);

   useEffect(() => {
      // TODO : Función para pasar a PedidoState.js, al context
      agregarProducto(productos);
   }, [productos]);

   if (loading) return null;
   const { obtenerProductos } = data;

   return (
      <>
         <p className="mt-10 my-2 bg-white border-l-4 border-gray-800 text-gray-700 p-2 text-sm font-bold">
            2.- Seleccionar productos
         </p>
         <Select
            className="mt-3"
            options={obtenerProductos}
            onChange={(opcion) => setProductos(opcion)}
            isMulti={true}
            getOptionValue={(opciones) => opciones.id}
            getOptionLabel={(opciones) => `${opciones.nombre} - ${opciones.existencia} Disponibles`}
            placeholder="Busque o Seleccione el Producto"
            noOptionsMessage={() => "No hay resultados"}
         />
      </>
   );
};

export default AsignarProductos;
