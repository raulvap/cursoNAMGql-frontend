import React from "react";
import { useRouter } from "next/router";
import { gql, useMutation, useQuery } from "@apollo/client";
import { Formik } from "formik";
import * as Yup from "yup";
import Swal from "sweetalert2";
import Layout from "../../layout/Layout";

// Consulta a la base de datos con el ID (lesson 113)
const OBTENER_PRODUCTO = gql`
   query obtenerProducto($id: ID!) {
      obtenerProducto(id: $id) {
         id
         nombre
         existencia
         precio
      }
   }
`;

// Mutation para actualizar la info del producto (lesson 115)
const ACTUALIZAR_PRODUCTO = gql`
   mutation actualizarProducto($id: ID!, $input: ProductoInput) {
      actualizarProducto(id: $id, input: $input) {
         id
         nombre
         existencia
         precio
         creado
      }
   }
`;

export default function EditarProducto() {
   const router = useRouter();
   const {
      query: { pid },
   } = router;

   // Consulta a la BD para obtener el producto:
   const { data, loading } = useQuery(OBTENER_PRODUCTO, {
      variables: {
         id: pid,
      },
   });

   // Mutation para actualizar el producto: (lesson 115)
   const [actualizarProducto] = useMutation(ACTUALIZAR_PRODUCTO);

   // Creamos el Schema de Validación (lesson 114)
   const schemaValidacion = Yup.object({
      nombre: Yup.string().required("Se requiere el nombre del producto"),
      existencia: Yup.number()
         .required("Se requiere la cantidad en existencia")
         .positive("Debe ser número positivo")
         .integer("Debe ser un número entero"),
      precio: Yup.number()
         .required("Se requiere el precio del producto")
         .positive("Debe ser número positivo"),
   });

   if (loading) {
      return "Cargando información...";
   }

   if (!data) {
      router.push("/productos");
      return "Cargando información...";
   }

   const { obtenerProducto } = data;

   const actualizarInfoProducto = async (valores) => {
      // Mutation para actualizar el producto: (lesson 115)
      const { id, nombre, existencia, precio } = valores;
      try {
         const { data } = await actualizarProducto({
            //data es el resultado de la función
            variables: {
               id,
               input: {
                  nombre,
                  existencia,
                  precio,
               },
            },
         });

         // Redirigir a productos
         router.push("/productos");

         //Mostrar alerta de confirmación
         Swal.fire("Producto Actualizado", "El producto se actualizó correctamente", "success");
      } catch (error) {
         console.log(error);
      }
   };

   return (
      <Layout>
         <h1 className="text-2xl text-gray-800 font-light">Editar Producto</h1>

         <div className="flex justify-center mt-5">
            <div className="w-full max-w-lg">
               <Formik
                  //   Para rellenar el formulario con los datos de la consulta de la BD: (lesson 114)
                  enableReinitialize
                  initialValues={obtenerProducto}
                  validationSchema={schemaValidacion}
                  onSubmit={(valores) => {
                     actualizarInfoProducto(valores);
                  }}
               >
                  {(props) => {
                     return (
                        <form
                           className="bg-white shadow-md px-8 pt-6 pb-8 mb-4"
                           onSubmit={props.handleSubmit}
                        >
                           <div className="mb-4">
                              <label
                                 className="block text-gray-700 text-sm font-bold mb-2"
                                 htmlFor="nombre"
                              >
                                 Nombre Producto
                              </label>

                              <input
                                 className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                 id="nombre"
                                 type="text"
                                 placeholder="Nombre Producto"
                                 onChange={props.handleChange}
                                 onBlur={props.handleBlur}
                                 value={props.values.nombre}
                              />
                           </div>

                           {props.touched.nombre && props.errors.nombre ? (
                              <div className="my-2 bg-red-100 border-l-4 border-red-500 text-red-700 p-4">
                                 <p className="font-bold">Error</p>
                                 <p>{props.errors.nombre}</p>
                              </div>
                           ) : null}

                           <div className="mb-4">
                              <label
                                 className="block text-gray-700 text-sm font-bold mb-2"
                                 htmlFor="precio"
                              >
                                 Precio
                              </label>

                              <input
                                 className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                 id="precio"
                                 type="number"
                                 placeholder="Precio"
                                 onChange={props.handleChange}
                                 onBlur={props.handleBlur}
                                 value={props.values.precio}
                              />
                           </div>

                           {props.touched.precio && props.errors.precio ? (
                              <div className="my-2 bg-red-100 border-l-4 border-red-500 text-red-700 p-4">
                                 <p className="font-bold">Error</p>
                                 <p>{props.errors.precio}</p>
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
                                 onChange={props.handleChange}
                                 onBlur={props.handleBlur}
                                 value={props.values.existencia}
                              />
                           </div>

                           {props.touched.existencia && props.errors.existencia ? (
                              <div className="my-2 bg-red-100 border-l-4 border-red-500 text-red-700 p-4">
                                 <p className="font-bold">Error</p>
                                 <p>{props.errors.existencia}</p>
                              </div>
                           ) : null}

                           <input
                              type="submit"
                              className="bg-gray-800 w-full mt-5 p-2 text-white uppercase font-bold hover:bg-gray-900"
                              value="Editar Producto"
                           />
                        </form>
                     );
                  }}
               </Formik>
            </div>
         </div>
      </Layout>
   );
}
