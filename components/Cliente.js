import React from "react";
import Swal from "sweetalert2";
import { gql, useMutation } from "@apollo/client";
import Router from "next/router";

const ELIMINAR_CLIENTE = gql`
   mutation eliminarCliente($id: ID!) {
      eliminarCliente(id: $id)
   }
`;

// lesson 95: necesitamos la consulta para obtener los clientes para actualizar el cache:
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

export default function Cliente({ cliente }) {
   // mutation para eliminar cliente (lesson 94)
   const [eliminarCliente] = useMutation(ELIMINAR_CLIENTE, {
      // Lesson 95: actualizar el cache después de eliminar un cliente, para evitar llamadas al servidor
      update(cache) {
         // obtener una copia del objeto de cache:
         const { obtenerClientesVendedor } = cache.readQuery({ query: OBTENER_CLIENTES_USUARIO });

         // Reescribir el cache
         cache.writeQuery({
            query: OBTENER_CLIENTES_USUARIO,
            data: {
               obtenerClientesVendedor: obtenerClientesVendedor.filter(
                  (clienteActual) => clienteActual.id !== cliente.id
               ),
            },
         });
      },
   });

   // Eliminar un cliente
   const confirmarEliminarCliente = (id) => {
      Swal.fire({
         title: "¿Estás seguro que quieres eliminar este cliente?",
         text: "Esta acción no se puede deshacer",
         icon: "warning",
         showCancelButton: true,
         confirmButtonColor: "#d33",
         confirmButtonText: "Si, eliminar",
         cancelButtonColor: "#3085d6",
         cancelButtonText: "No, cancelar",
      }).then(async (result) => {
         if (result.isConfirmed) {
            // Aqui elimina:
            try {
               // Eliminar por ID (lesson 94)
               const { data } = await eliminarCliente({
                  variables: {
                     id,
                  },
               });

               // Mostrar Alerta:
               Swal.fire("¡Eliminado!", data.eliminarCliente, "success");
            } catch (error) {
               console.log(error);
            }
         }
      });
   };

   // Editar un cliente:
   const editarCliente = (id) => {
      //Lesson 96: routing para editar cliente, enviamos la info a la página donde vamos a editar el cliente:
      Router.push({
         pathname: "editarcliente/[id]",
         query: { id },
      });
   };

   return (
      <tr>
         <td className="border px-4 py-2">
            {cliente.nombre} {cliente.apellido}
         </td>
         <td className="border px-4 py-2">{cliente.empresa}</td>
         <td className="border px-4 py-2">{cliente.email}</td>
         <td className="border px-4 py-2">
            {" "}
            <button
               className="flex justify-center items-center bg-green-800 hover:bg-green-600 py-1 px-4 w-full text-white rounded text-xs uppercase font-bold"
               type="button"
               onClick={() => editarCliente(cliente.id)}
            >
               <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-6 w-6 mr-3"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
               >
                  <path
                     strokeLinecap="round"
                     strokeLinejoin="round"
                     strokeWidth={2}
                     d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"
                  />
               </svg>
               Editar
            </button>
         </td>
         <td className="border px-4 py-2">
            <button
               className="flex justify-center items-center bg-red-800 hover:bg-red-600 py-1 px-4 w-full text-white rounded text-xs uppercase font-bold"
               type="button"
               onClick={() => confirmarEliminarCliente(cliente.id)}
            >
               <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-6 w-6 mr-3"
                  viewBox="0 0 20 20"
                  fill="currentColor"
               >
                  <path
                     fillRule="evenodd"
                     d="M10 18a8 8 0 100-16 8 8 0 000 16zM7 9a1 1 0 000 2h6a1 1 0 100-2H7z"
                     clipRule="evenodd"
                  />
               </svg>
               Eliminar
            </button>
         </td>
      </tr>
   );
}
