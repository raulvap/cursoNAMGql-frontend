import React, { useState } from "react";
import { useRouter } from "next/router";
import { useFormik } from "formik";
import * as Yup from "yup";
import { useQuery, gql, useMutation } from "@apollo/client";

// --- COMPONENTS ---
import Layout from "../layout/Layout";

// Query para GraphQL (lesson 75)
// const QUERY = gql`
//    query obtenerProductos {
//       obtenerProductos {
//          id
//          nombre
//          precio
//          existencia
//       }
//    }
// `;

// Mutation para crear un nuevo usuario con GraphQL (lesson 76)
const NUEVA_CUENTA = gql`
   mutation nuevoUsuario($input: UsuarioInput) {
      nuevoUsuario(input: $input) {
         id
         nombre
         apellido
         email
      }
   }
`;

export default function NuevaCuenta() {
   // State para el mensaje de respuesta (Lesson 77)
   const [mensaje, setMensaje] = useState(null);

   // Obtener Productos de GraphQL (lesson 75)
   // const { data, loading, error } = useQuery(QUERY);

   // Mutation para crear nuevos usuario (Lesson 76)
   const [nuevoUsuario] = useMutation(NUEVA_CUENTA);

   // Routing: para redireccionar al usuario (lesson 78)
   const router = useRouter();

   // Validación de Formulario: (Lesson 70)
   const formik = useFormik({
      initialValues: {
         nombre: "",
         apellido: "",
         email: "",
         password: "",
      },
      validationSchema: Yup.object({
         // Lesson 71: usando Yup para validación de formulario:
         nombre: Yup.string().required("el nombre es obligatorio"),
         apellido: Yup.string().required("el apellido es obligatorio"),
         email: Yup.string().email("debe ser un email válido").required("el email es obligatorio"),
         password: Yup.string()
            .required("se necesita la contraseña")
            .min(6, "la contraseña debe tener al menos 6 caracteres"),
      }),
      onSubmit: async (valores) => {
         console.log("Enviando...", valores);
         // Aqui se usa la función que retorna el Mutarion (Lesson 76)
         const { nombre, apellido, email, password } = valores;
         try {
            const { data } = await nuevoUsuario({
               // las variables deben ser tal cual se configuraron en el backend: (lesson 76)
               variables: {
                  input: {
                     nombre,
                     apellido,
                     email,
                     password,
                  },
               },
            });
            console.log("Respuesta:", data);
            // Usuario creado correctamente
            setMensaje(`Usuario creado: ${data.nuevoUsuario.nombre}, ya puede iniciar sesión`);

            // Redirigir al usuario para iniciar sesión:
            setTimeout(() => {
               setMensaje(null);
               router.push("/login");
            }, 3000);
         } catch (error) {
            setMensaje(error.message);

            setTimeout(() => {
               setMensaje(null);
            }, 3000);
         }
      },
   });

   const mostrarMensaje = () => {
      return (
         <div className="bg-white p-2 w-full my-3 max-w-sm text-center mx-auto">
            <p>{mensaje}</p>
         </div>
      );
   };

   return (
      <>
         <Layout>
            {mensaje && mostrarMensaje()}

            <h1 className="text-center text-2xl text-white font-light ">Crear Nuevo Usuario</h1>
            <div className=" flex justify-center mt-5">
               <div className="w-full max-w-sm">
                  <form
                     className="bg-white rounded shadow-md px-8 pt-6 pb-8 mb-4"
                     onSubmit={formik.handleSubmit}
                  >
                     <div className="mb-6">
                        <label
                           className="block text-gray-700 text-sm font-bold mb-2"
                           htmlFor="nombre"
                        >
                           Nombre
                        </label>
                        <input
                           className="shadow appearance-none  boder rounded w-full py-2 px-2 text-gray-700 leading-tight focus:outline-none focus:shadow-outline "
                           id="nombre"
                           type="text"
                           placeholder="Nombre"
                           value={formik.values.nombre}
                           onChange={formik.handleChange}
                           onBlur={formik.handleBlur}
                        />
                        {formik.touched.nombre && formik.errors.nombre ? (
                           <div className="my-2 bg-red-100 border-l-4 border-red-500 text-red-700 p-2">
                              <p className="font-bold">{`Error: ${formik.errors.nombre}`}</p>
                           </div>
                        ) : null}
                     </div>

                     <div className="mb-6">
                        <label
                           className="block text-gray-700 text-sm font-bold mb-2"
                           htmlFor="apellido"
                        >
                           Apellido
                        </label>
                        <input
                           className="shadow appearance-none  boder rounded w-full py-2 px-2 text-gray-700 leading-tight focus:outline-none focus:shadow-outline "
                           id="apellido"
                           type="text"
                           placeholder="Apellido"
                           value={formik.values.apellido}
                           onChange={formik.handleChange}
                           onBlur={formik.handleBlur}
                        />
                        {formik.touched.apellido && formik.errors.apellido ? (
                           <div className="my-2 bg-red-100 border-l-4 border-red-500 text-red-700 p-2">
                              <p className="font-bold">{`Error: ${formik.errors.apellido}`}</p>
                           </div>
                        ) : null}
                     </div>

                     <div className="mb-6">
                        <label
                           className="block text-gray-700 text-sm font-bold mb-2"
                           htmlFor="email"
                        >
                           Email
                        </label>
                        <input
                           className="shadow appearance-none  boder rounded w-full py-2 px-2 text-gray-700 leading-tight focus:outline-none focus:shadow-outline "
                           id="email"
                           type="email"
                           placeholder="Email"
                           value={formik.values.email}
                           onChange={formik.handleChange}
                           onBlur={formik.handleBlur}
                        />
                        {formik.touched.email && formik.errors.email ? (
                           <div className="my-2 bg-red-100 border-l-4 border-red-500 text-red-700 p-2">
                              <p className="font-bold">{`Error: ${formik.errors.email}`}</p>
                           </div>
                        ) : null}
                     </div>
                     <div className="mb-6">
                        <label
                           className="block text-gray-700 text-sm font-bold mb-2"
                           htmlFor="password"
                        >
                           Password
                        </label>
                        <input
                           className="shadow appearance-none  boder rounded w-full py-2 px-2 text-gray-700 leading-tight focus:outline-none focus:shadow-outline "
                           id="password"
                           type="password"
                           placeholder="Contraseña"
                           value={formik.values.password}
                           onChange={formik.handleChange}
                           onBlur={formik.handleBlur}
                        />
                        {formik.touched.password && formik.errors.password ? (
                           <div className="my-2 bg-red-100 border-l-4 border-red-500 text-red-700 p-2">
                              <p className="font-bold">{`Error: ${formik.errors.password}`}</p>
                           </div>
                        ) : null}
                     </div>

                     <input
                        type="submit"
                        className="bg-gray-800 w-full mt-5 p-2 text-white uppercase hover:cursor-pointer hover:bg-gray-900 hover:font-bold "
                        value="Crear Usuario"
                     />
                  </form>
               </div>
            </div>
         </Layout>
      </>
   );
}
