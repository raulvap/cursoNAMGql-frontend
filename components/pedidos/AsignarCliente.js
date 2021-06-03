import React, { useState, useEffect, useContext } from "react";
import { gql, useQuery } from "@apollo/client";
import PedidoContext from "../../context/pedidos/PedidoContext";

// React-Select es para multiples valores en un form (lesson 117)
import Select from "react-select";

// Lesson 122: obteniendo los clientes de la BD
const OBTENER_CLIENTES_USUARIO = gql`
   query obtenerClientesVendedor {
      obtenerClientesVendedor {
         id
         nombre
         apellido
         empresa
         email
      }
   }
`;

export default function AsignarCliente() {
   // Lesson 118: usando react Select para asignar cliente
   const [cliente, setCliente] = useState([]);

   // Consulta a la base de datos (lesson: 122)
   const { data, loading, error } = useQuery(OBTENER_CLIENTES_USUARIO);

   // Utilizar context y extraer sus funciones y valores del state de la app: (lesson 123)
   const pedidoContext = useContext(PedidoContext);
   const { agregarCliente } = pedidoContext;

   useEffect(() => {
      agregarCliente(cliente);
   }, [cliente]);

   const seleccionarCliente = (clientes) => {
      setCliente(clientes);
   };

   // Resultado de la consulta:
   if (loading) return null;

   const { obtenerClientesVendedor } = data;

   return (
      <>
         <p className="mt-10 my-2 bg-white border-l-4 border-gray-800 text-gray-700 p-2 text-sm font-bold">
            1. Cliente:{" "}
         </p>
         <Select
            options={obtenerClientesVendedor}
            // isMulti={true}
            onChange={(opcion) => seleccionarCliente(opcion)}
            getOptionValue={(opciones) => opciones.id}
            getOptionLabel={(opciones) => opciones.nombre + " " + opciones.apellido}
            placeholder="Seleccionar cliente"
            noOptionsMessage={() => "No hay resultados"}
         />
      </>
   );
}
