import Layout from "../layout/Layout";
import Link from "next/link";

export default function Pedidos() {
   return (
      <div>
         <Layout>
            <h1 className="text-2xl text-gray-800 font-light">Pedidos</h1>

            <Link href="/nuevopedido">
               <a className="bg-blue-800 py-2 px-5 mt-3 inline-block text-white rounded text-sm hover:bg-gray-800 mb-3 uppercase font-bold ">
                  Crear Pedido
               </a>
            </Link>
         </Layout>
      </div>
   );
}
