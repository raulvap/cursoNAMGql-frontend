import Layout from "../layout/Layout";
// import Cliente from '../components/Cliente';
import { gql, useQuery } from "@apollo/client";
import { useRouter } from "next/router";
import Link from "next/link";

// Lesson 83: obtener clientes del server
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

export default function Index() {
   // Routing
   const router = useRouter();

   // Consulta de Apollo // lesson 85: corregío error en las preguntas agregando client
   const { data, loading, client } = useQuery(OBTENER_CLIENTES_USUARIO);

   console.log(client);

   if (loading) return "Cargando....";

   if (!data.obtenerClientesVendedor) {
      client.clearStore();
      router.push("/login");
      return <p>Loading...</p>;
   }

   return (
      <div>
         <Layout>
            <h1 className="text-2xl text-gray-800 font-light">Clientes</h1>
            <Link href="/nuevocliente">
               <a className="bg-blue-800 py-2 px-5 mt-3 inline-block text-white rounded- text-sm hover:bg-gray-800 mb-3 uppercase font-bold ">
                  Agregar Cliente
               </a>
            </Link>

            <table className="table-auto shadow-md mt-10 w-full w-lg">
               <thead className="bg-gray-800">
                  <tr className="text-white">
                     <th className="w-1/5 py-2">Nombre</th>
                     <th className="w-1/5 py-2">Empresa</th>
                     <th className="w-1/5 py-2">Email</th>
                  </tr>
               </thead>

               <tbody className="bg-white">
                  {
                     // llenamos la tabla, la función es la que nos retorna el query:
                     data.obtenerClientesVendedor.map((cliente) => (
                        // el return está implicito
                        <tr key={cliente.id}>
                           <td className="border px-4 py-2">
                              {cliente.nombre} {cliente.apellido}
                           </td>
                           <td className="border px-4 py-2">{cliente.empresa}</td>
                           <td className="border px-4 py-2">{cliente.email}</td>
                        </tr>
                     ))
                  }
               </tbody>
            </table>
         </Layout>
      </div>
   );
}
