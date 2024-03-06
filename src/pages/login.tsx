
// import React from 'react';
// import { useDispatch } from 'react-redux';
// import { login } from './user/userSlice';
// import { Field, Form,  Formik } from 'formik';
// import Link from 'next/link';
// import { useRouter } from 'next/router';
// import { LoginvalidationSchema } from '@/utils/Validations';
// import TextInput from '@/components/TextInput';
// import CustomButtonNew from '@/components/button';


// const LoginPage: React.FC = () => {
//   const dispatch = useDispatch();
//   const router=useRouter();
//   const initialValues = {
//     email: '', 
//     password: '',
//   };
//   const graphqlEndpoint = 'http://localhost:3000/graphql'; 

//   const onSubmit = async (values: { email: string; password: string }) => {
//     try {
//       const response = await fetch(graphqlEndpoint, {
//         method: 'POST',
//         headers: {
//           'Content-Type': 'application/json',
//         },
//         body: JSON.stringify({
//           query: `
//             query userLogin($payload:LoginUserDto!) {
//               userLogin(payload: $payload) {
//                 accessToken
//                 refreshToken
//               }
//             }
//           `,
//           variables: {
//             payload:{
//             email: values.email,
//             password: values.password,
//             }
//           },
//         }),
//       });
  
//      if (response.ok) {
//         const data = await response.json();
//         // for (let key in data) {
//         //   if (data.hasOwnProperty(key)) {
//         //     console.log(data[key]);
//         //   }
//         // }
//         const { accessToken, refreshToken } = data.data.userLogin;
//         dispatch(login({accessToken,refreshToken}));
//        // router.push('/landing-page');
//        } else {
//          // Handle authentication errors
//         console.error('Authentication failed');
//        }
//     } catch (error) {
//       console.error('Authentication error:', error);
//     }
//   };
  

//   return (
//     <div className="flex h-screen flex-col items-center justify-center text-onNeutralBg">
//       <h1 className="mb-4 text-4xl font-bold">Login</h1>
//       <Formik
//         initialValues={initialValues}
//         validationSchema={LoginvalidationSchema}
//         onSubmit={onSubmit}
//       >
//         <Form className="rounded p-6 shadow-md space-y-6">
//           <Field type="text" name="email" label="Email" as={TextInput} fullWidth />
//           <Field type="password" name="password" label="Password" as={TextInput} fullWidth />
//           <CustomButtonNew type="submit" buttonType="PRIMARY">
//             Login
//           </CustomButtonNew>
//         </Form>
//       </Formik>
//       <Link className="login-link text-onNeutralBg" href="/change-password">
//         Change Password
//       </Link>
//       <Link className="login-link text-onNeutralBg" href="/forgot-password">
//         Forgot Password
//       </Link>
//       <Link className="login-link text-onNeutralBg" href="/register">
//         Register
//       </Link>
//     </div>
//   );
// };

// export default LoginPage;

