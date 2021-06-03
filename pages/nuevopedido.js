import React, { useContext } from "react";
import Layout from "../layout/Layout";
import AsignarCliente from "../components/pedidos/AsignarCliente";

// Lesson 121: context de pedidos, esto nos va a traer el state de la app
import PedidoContext from "../context/pedidos/PedidoContext";

export default function NuevoPedido() {
   // Utilizar context y extraer sus funciones y valores del state de la app:
   const pedidoContext = useContext(PedidoContext);

   return (
      <Layout>
         <h1 className="text-2xl text-gray-800 font-light">Nuevo Pedido</h1>

         <AsignarCliente />
      </Layout>
   );
}
