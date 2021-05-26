import React from "react";
import Link from "next/link";
import { useRouter } from "next/router";

export default function Sidebar() {
   // routing:
   const router = useRouter();

   return (
      <aside className="bg-gray-800 sm:w-1/3 xl:w-1/5 sm:min-h-screen p-5">
         <div>
            <p className="text-white text-2xl font-black">CRM Clientes</p>
         </div>
         <nav className="mt-5 list-none">
            <li className={router.pathname === "/" ? "bg-blue-800" : ""}>
               <Link href="/">
                  <a className="text-white mb-2 pl-5 block">Clientes</a>
               </Link>
            </li>
            <li className={router.pathname === "/pedidos" ? "bg-blue-800" : ""}>
               <Link href="/pedidos">
                  <a className="text-white mb-2 pl-5 block">Pedidos</a>
               </Link>
            </li>
            <li className={router.pathname === "/productos" ? "bg-blue-800" : ""}>
               <Link href="/productos">
                  <a className="text-white mb-2 pl-5 block">Productos</a>
               </Link>
            </li>
         </nav>
      </aside>
   );
}
