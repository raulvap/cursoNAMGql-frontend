// Lesson 106
import React, { useState } from "react";
import { gql, useMutation } from "@apollo/client";
import { useRouter } from "next/router";
import { useFormik } from "formik";
import * as Yup from "yup";
import Swal from "sweetalert2";
import Layout from "../layout/Layout";

// Mutation para agregar productos: (lesson 109)
const NUEVO_PRODUCTO = gql`
   mutation nuevoProducto($input: ProductoInput) {
      nuevoProducto(input: $input) {
         id
         nombre
         existencia
         precio
         creado
      }
   }
`;

// Para actualizar el cache, debemos hacer la consulta:
const OBTENER_PRODUCTOS = gql`
   query obtenerProductos {
      obtenerProductos {
         id
         nombre
         precio
         existencia
         creado
      }
   }
`;

export default function nuevoproducto() {
   const router = useRouter();

   // Mutation para agregar productos: (lesson 109)
   const [nuevoProducto] = useMutation(NUEVO_PRODUCTO, {
      // debemos actualizar el cache con el nuevo producto: (lesson 110)
      update(cache, { data: { nuevoProducto } }) {
         const { obtenerProductos } = cache.readQuery({
            // 1: obtener el objeto del cache
            query: OBTENER_PRODUCTOS,
         });

         // 2: Reescribimos el cache de ese objeto:
         cache.writeQuery({
            query: OBTENER_PRODUCTOS,
            data: {
               obtenerProductos: [...obtenerProductos, nuevoProducto],
            },
         });
      },
   });

   // Formulario para nuevos productos (Lesson 108)
   const formik = useFormik({
      initialValues: {
         nombre: "",
         precio: "",
         existencia: "",
      },
      validationSchema: Yup.object({
         nombre: Yup.string().required("Se requiere el nombre del producto"),
         existencia: Yup.number()
            .required("Se requiere la cantidad en existencia")
            .positive("Debe ser número positivo")
            .integer("Debe ser un número entero"),
         precio: Yup.number()
            .required("Se requiere el precio del producto")
            .positive("Debe ser número positivo"),
      }),
      onSubmit: async (valores) => {
         try {
            // Mutation para agregar productos: (lesson 109)
            const { nombre, existencia, precio } = valores;

            const { data } = await nuevoProducto({
               //data es la respuesta del servidor
               variables: {
                  input: {
                     nombre,
                     existencia,
                     precio,
                  },
               },
            });

            // Mostrar alerta de confirmación
            Swal.fire("Producto Creado", "El producto se creó correctamente", "success");

            // Redirrecionar a los productos
            router.push("/productos");
         } catch (error) {
            console.log(error);
         }
      },
   });

   return (
      <Layout>
         <h1 className="text-2xl text-gray-800 font-light">Nuevo Producto</h1>

         <div className="flex justify-center mt-5">
            <div className="w-full max-w-lg">
               <form
                  className="bg-white shadow-md px-8 pt-6 pb-8 mb-4"
                  onSubmit={formik.handleSubmit}
               >
                  <div className="mb-4">
                     <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="nombre">
                        Nombre Producto
                     </label>

                     <input
                        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                        id="nombre"
                        type="text"
                        placeholder="Nombre Producto"
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        value={formik.values.nombre}
                     />
                  </div>

                  {formik.touched.nombre && formik.errors.nombre ? (
                     <div className="my-2 bg-red-100 border-l-4 border-red-500 text-red-700 p-4">
                        <p className="font-bold">Error</p>
                        <p>{formik.errors.nombre}</p>
                     </div>
                  ) : null}

                  <div className="mb-4">
                     <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="precio">
                        Precio
                     </label>

                     <input
                        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                        id="precio"
                        type="number"
                        placeholder="Precio"
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        value={formik.values.precio}
                     />
                  </div>

                  {formik.touched.precio && formik.errors.precio ? (
                     <div className="my-2 bg-red-100 border-l-4 border-red-500 text-red-700 p-4">
                        <p className="font-bold">Error</p>
                        <p>{formik.errors.precio}</p>
                     </div>
                  ) : null}

                  <div className="mb-4">
                     <label
                        className="block text-gray-700 text-sm font-bold mb-2"
                        htmlFor="existencia"
                     >
                        Existencia
                     </label>

                     <input
                        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                        id="existencia"
                        type="number"
                        placeholder="Existencia"
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        value={formik.values.existencia}
                     />
                  </div>

                  {formik.touched.existencia && formik.errors.existencia ? (
                     <div className="my-2 bg-red-100 border-l-4 border-red-500 text-red-700 p-4">
                        <p className="font-bold">Error</p>
                        <p>{formik.errors.existencia}</p>
                     </div>
                  ) : null}

                  <input
                     type="submit"
                     className="bg-gray-800 w-full mt-5 p-2 text-white uppercase font-bold hover:bg-gray-900"
                     value="Agregar Producto"
                  />
               </form>
            </div>
         </div>
      </Layout>
   );
}
