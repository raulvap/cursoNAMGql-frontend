import React, { useState } from "react";
import { useRouter } from "next/router";
import { useFormik } from "formik";
import * as Yup from "yup";
import { gql, useMutation } from "@apollo/client";

// --- COMPONENTS ---
import Layout from "../layout/Layout";

// --- MUTATIONS ---
// Creamos el mutation: (lesson 80)
const AUTENTICAR_USUARIO = gql`
   mutation autenticarUsuario($input: AutenticarInput) {
      autenticarUsuario(input: $input) {
         token
      }
   }
`;

export default function login() {
   // Mutation para crear nuevos usuarios en apollo (backend): lesson 80
   const [autenticarUsuario] = useMutation(AUTENTICAR_USUARIO);
   const [mensaje, setMensaje] = useState(null);

   // Routing
   const router = useRouter();

   // Lesson 79: para validar con formik
   const formik = useFormik({
      initialValues: {
         email: "",
         password: "",
      },
      validationSchema: Yup.object({
         email: Yup.string().email("debe ser un email válido").required("el email es obligatorio"),
      }),
      onSubmit: async (valores) => {
         // Lesson 80: la respuesta que tenemos es el data, que es el token del usuario
         const { email, password } = valores;
         try {
            const { data } = await autenticarUsuario({
               variables: {
                  input: {
                     email,
                     password,
                  },
               },
            });

            setMensaje("Iniciando sesión, espere...");

            // Guardar el token en LocalStorage
            setTimeout(() => {
               const { token } = data.autenticarUsuario;
               localStorage.setItem("token", token);
            }, 1000);

            //Redireccionar hacia página principal
            setTimeout(() => {
               setMensaje(null);
               router.push("/");
            }, 1500);
         } catch (error) {
            setMensaje(error.message);
            setTimeout(() => {
               setMensaje(null);
            }, 2000);
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
            <h1 className="text-center text-2xl text-white font-light ">Login</h1>
            <div className=" flex justify-center mt-5">
               <div className="w-full max-w-sm">
                  <form
                     className="bg-white rounded shadow-md px-8 pt-6 pb-8 mb-4"
                     onSubmit={formik.handleSubmit}
                  >
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
                     </div>

                     <input
                        type="submit"
                        className="bg-gray-800 w-full mt-5 p-2 text-white uppercase hover:cursor-pointer hover:bg-gray-900 hover:font-bold"
                        value="Iniciar Sesión"
                     />
                  </form>
               </div>
            </div>
         </Layout>
      </>
   );
}
