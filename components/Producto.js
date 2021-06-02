import React from "react";
import { gql, useMutation } from "@apollo/client";
import Router from "next/router";
import Swal from "sweetalert2";

// Mutation: eliminar producto (lesson 105)
const ELIMINAR_PRODUCTO = gql`
   mutation eliminarProducto($id: ID!) {
      eliminarProducto(id: $id)
   }
`;

const OBTENER_PRODUCTOS = gql`
   query obtenerProductos {
      obtenerProductos {
         id
         nombre
         precio
         existencia
         creado
      }
   }
`;

// --- FUNCTIONAL COMPONENT ---
export default function Producto({ producto }) {
   const { id, nombre, precio, existencia, creado } = producto;

   // Eliminar un producto (lesson 105) y actualizar cache:
   const [eliminarProducto] = useMutation(ELIMINAR_PRODUCTO, {
      update(cache) {
         // primero debemos obtener los productos actuales, usamos el query
         const { obtenerProductos } = cache.readQuery({
            query: OBTENER_PRODUCTOS,
         });

         // Luego, reescribimos el cache (lesson 105):
         cache.writeQuery({
            // datos actuales:
            query: OBTENER_PRODUCTOS,
            // con qué datos se va a reescribir:
            data: {
               obtenerProductos: obtenerProductos.filter(
                  (productoActual) => productoActual.id !== id
               ),
            },
         });
      },
   });

   const confirmarEliminarProducto = (id) => {
      Swal.fire({
         title: "¿Estás seguro que quieres eliminar este producto?",
         text: "Esta acción no se puede deshacer",
         icon: "warning",
         showCancelButton: true,
         confirmButtonColor: "#d33",
         confirmButtonText: "Si, eliminar",
         cancelButtonColor: "#3085d6",
         cancelButtonText: "No, cancelar",
      }).then(async (result) => {
         if (result.isConfirmed) {
            // Aqui elimina el producto:
            try {
               const { data } = await eliminarProducto({
                  variables: {
                     id,
                  },
               });

               console.log(data);

               // Mostrar Alerta:
               Swal.fire("¡Eliminado!", data.eliminarProducto, "success");
            } catch (error) {
               console.log(error);
            }
         }
      });
   };

   // Editar Producto: (lesson 111)
   const editarProducto = (id) => {
      // Router nos permite pasar parámetros
      Router.push({
         pathname: "/editarproducto/[id]",
         query: { id },
      });
   };

   return (
      <tr>
         <td className="border px-4 py-2">{nombre}</td>
         <td className="border px-4 py-2">{existencia} unidades</td>
         <td className="border px-4 py-2">$ {precio}</td>
         <td className="border px-4 py-2">
            {" "}
            <button
               className="flex justify-center items-center bg-green-800 hover:bg-green-600 py-1 px-4 w-full text-white rounded text-xs uppercase font-bold"
               type="button"
               onClick={() => editarProducto(id)}
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
               onClick={() => confirmarEliminarProducto(id)}
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
