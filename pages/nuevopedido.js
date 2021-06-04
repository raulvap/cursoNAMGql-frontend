import React, { useContext, useState } from "react";
import Layout from "../layout/Layout";
import AsignarCliente from "../components/pedidos/AsignarCliente";
import AsignarProducto from "../components/pedidos/AsignarProducto";
import ResumenPedido from "../components/pedidos/ResumenPedido";
import TotalPedido from "../components/pedidos/Total";
import { gql, useMutation } from "@apollo/client";
import { useRouter } from "next/router";
import Swal from "sweetalert2";

// Lesson 121: context de pedidos, esto nos va a traer el state de la app
import PedidoContext from "../context/pedidos/PedidoContext";

// Lesson 134: useMutation
const NUEVO_PEDIDO = gql`
   mutation nuevoPedido($input: PedidoInput) {
      nuevoPedido(input: $input) {
         id
      }
   }
`;

export default function NuevoPedido() {
   const router = useRouter();
   const [mensaje, setMensaje] = useState(null);

   // Utilizar context y extraer sus funciones y valores del state de la app: (lesson 133)
   const pedidoContext = useContext(PedidoContext);
   const { cliente, productos, total } = pedidoContext;

   // Lesson 134: useMutation para crear un nuevo pedido
   const [nuevoPedido] = useMutation(NUEVO_PEDIDO);

   const validarPedido = () => {
      // Lesson 133: para validar el formulario de nuevo pedido, habilitar o deshabilitar el botón
      return !productos.every((producto) => producto.cantidad > 0) ||
         total === 0 ||
         cliente.length === 0
         ? " opacity-50 cursor-not-allowed "
         : "";
   };

   const crearNuevoPedido = async () => {
      // Lesson 134: useMutation para crear un nuevo pedido
      // sacamos el id de cliente para enviarlo con el mutation:
      const { id } = cliente;

      // Remover lo no deseado de productos
      const pedido = productos.map(({ __typename, existencia, ...producto }) => producto);

      try {
         const { data } = await nuevoPedido({
            //data es lo que te regresa la función de graphQL:
            variables: {
               input: {
                  cliente: id,
                  total,
                  pedido,
               },
            },
         });

         console.log(data);

         // Redireccionar
         router.push("/pedidos");

         // Mostrar alerta
         Swal.fire("Correcto", "El pedido se registró correctamente", "success");
      } catch (error) {
         setMensaje(error.message);

         setTimeout(() => {
            setMensaje(null);
         }, 3000);
      }
   };

   const mostrarMensaje = () => {
      return (
         <div className="bg-white py-2 px-3 w-full my-3 max-w-sm text-center mx-auto ">
            <p>{mensaje} </p>
         </div>
      );
   };

   return (
      <Layout>
         <h1 className="text-2xl text-gray-800 font-light">Nuevo Pedido</h1>
         {mensaje && mostrarMensaje()}

         <div className="flex justify-center mt-5">
            <div className="w-full max-w-lg">
               <AsignarCliente />
               <AsignarProducto />
               <ResumenPedido />
               <TotalPedido />

               <button
                  type="button"
                  className={` bg-gray-800 w-full mt-5 p-2 text-white uppercase font-bold hover:bg-gray-900  ${validarPedido()} `}
                  onClick={() => crearNuevoPedido()}
               >
                  Crear Pedido
               </button>
            </div>
         </div>
      </Layout>
   );
}
