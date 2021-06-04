import React from "react";
import { useRouter } from "next/router";
import { useQuery, gql } from "@apollo/client";

// Lesson 84:
const OBTENER_USUARIO = gql`
   query obtenerUsuario {
      obtenerUsuario {
         id
         nombre
         apellido
      }
   }
`;

export default function Header() {
   // Routing:
   const router = useRouter();

   // Consulta de Apollo // lesson 85: corregío error en las preguntas agregando client
   const { data, loading, client } = useQuery(OBTENER_USUARIO);

   // Esperar a que lleguen los resultados
   if (loading) {
      return <p>Loading...</p>;
   }

   // Si no day data, no hay usuario loggeado:
   if (!data) {
      return router.push("/login");
   }

   // sacando la info:
   const { nombre, apellido } = data.obtenerUsuario;

   const cerrarSesion = () => {
      localStorage.removeItem("token");
      client.clearStore();
      router.push("/login");
   };

   return (
      <div className="sm:flex sm:justify-between mb-6">
         <p className="mr-2 mb-5 lg:mb-0">
            {" "}
            Usuario: {nombre} {apellido}
         </p>
         <button
            className="bg-blue-800 hover:bg-gray-800  w-full sm:w-auto font-bold uppercase text-xs rounded py-2 px-4 text-white shadow-md"
            type="button"
            onClick={() => cerrarSesion()}
         >
            Cerrar Sesión
         </button>
      </div>
   );
}
