import React, { useEffect } from "react";
import Layout from "../layout/Layout";
import {
   BarChart,
   Bar,
   XAxis,
   YAxis,
   CartesianGrid,
   Tooltip,
   Legend,
   ResponsiveContainer,
} from "recharts";
import { gql, useQuery } from "@apollo/client";

const MEJORES_VENDEDORES = gql`
   query mejoresVendedores {
      mejoresVendedores {
         vendedor {
            nombre
            email
         }
         total
      }
   }
`;

const MejoresVendedores = () => {
   // Lesson 145: graficando mejores vendedores

   const { data, loading, error, startPolling, stopPolling } = useQuery(MEJORES_VENDEDORES);
   //  startPolling, stopPolling es para funcionalidad en tiempo real de Apollo (Lesson 146)

   useEffect(() => {
      startPolling(3000);
      return () => {
         stopPolling();
      };
   }, [startPolling, stopPolling]);

   if (loading) return "cargando...";

   //    console.log(data);

   const { mejoresVendedores } = data;

   const vendedorGrafica = [];

   mejoresVendedores.map((vendedor, index) => {
      // Lesson 145: debemos modificar la información en un solo objeto plano
      vendedorGrafica[index] = {
         ...vendedor.vendedor[0],
         total: vendedor.total,
      };
   });

   // console.log(vendedorGrafica);

   return (
      <Layout>
         <h1 className="text-2xl text-gray-800 font-light">Mejores Vendedores</h1>

         <ResponsiveContainer width={"99%"} height={550}>
            {/* ResponsiveContainer sirve para hacer responsivo las gráficas: */}
            <BarChart
               className="mt-10"
               width={600}
               height={500}
               data={vendedorGrafica}
               margin={{
                  top: 5,
                  right: 30,
                  left: 20,
                  bottom: 5,
               }}
            >
               <CartesianGrid strokeDasharray="3 3" />
               <XAxis dataKey="nombre" />
               <YAxis />
               <Tooltip />
               <Legend />
               <Bar dataKey="total" fill="#3182CE" />
            </BarChart>
         </ResponsiveContainer>
      </Layout>
   );
};

export default MejoresVendedores;
