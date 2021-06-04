import React, { useContext, useEffect, useState } from "react";
import { number } from "yup";
import PedidoContext from "../../context/pedidos/PedidoContext";

export default function ProductoResumen({ producto }) {
   const { nombre, precio } = producto;

   // State local
   const [cantidad, setCantidad] = useState(0);

   // Context: extraer lo que queramos del context
   const pedidoContext = useContext(PedidoContext);
   const { cantidadProductos, actualizarTotal } = pedidoContext;

   useEffect(() => {
      actualizarCantidad();
      actualizarTotal();
   }, [cantidad]);

   const actualizarCantidad = () => {
      const nuevoProducto = { ...producto, cantidad: Number(cantidad) };
      cantidadProductos(nuevoProducto);
   };

   return (
      <div className="md:flex md:justify-between md:items-center mt-5">
         <div className="md:w-2/4 mb-2 md:mb-0">
            <p className="text-sm">{nombre}</p>
            <p> $ {precio}</p>
         </div>

         <input
            type="number"
            placeholder="Cantidad"
            className="shadow apperance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline md:ml-4"
            onChange={(e) => setCantidad(e.target.value)}
            value={cantidad}
         />
      </div>
   );
}
