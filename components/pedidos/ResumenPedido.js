import React, { useContext } from "react";
import PedidoContext from "../../context/pedidos/PedidoContext";
import ProductoResumen from "./ProductoResumen";

const ResumenPedido = () => {
   // Context: extraer los productos del context (lesson 127)
   const pedidoContext = useContext(PedidoContext);
   const { productos } = pedidoContext;

   // if (!productos) return null;

   return (
      <>
         <p className="mt-10 my-2 bg-white border-l-4 border-gray-800 text-gray-700 p-2 text-sm font-bold">
            3.- Seleccione la cantidad de productos
         </p>

         {productos.length > 0 ? (
            <>
               {productos.map((item) => (
                  <ProductoResumen key={item.id} producto={item} />
               ))}
            </>
         ) : (
            <p className="mt-5 text-sm text-center">Aún no hay productos</p>
         )}
      </>
   );
};

export default ResumenPedido;
