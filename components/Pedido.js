import React from "react";

export default function Pedido({ pedido }) {
   const { id, total, cliente, estado } = pedido;
   return (
      <div>
         <h1>{pedido.total}</h1>
      </div>
   );
}
