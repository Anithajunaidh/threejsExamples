"use client";
import React from "react";
import { EmailvalidationSchema } from "@/utils/Validations";
import { Formik, Form, Field } from "formik";
import TextInput from "@/components/TextInput";
import CustomButtonNew from "@/components/button";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { useTheme } from "next-themes";

const ForgotPasswordPage: React.FC = () => {
  const { theme } = useTheme();
  const router = useRouter();
  const initialValues = {
    email: "",
  };
  const onSubmit =async (values:{email:string}) => { 
    console.log("Form Values:", values);
    router.push("/loginpage");
  };

  return (
    <div className={`theme-${theme}`}>
    <div className="flex flex-col items-center justify-center bg-gray-100">
      <h1 className="mb-4 text-4xl font-bold">Reset Password</h1>
      <Formik
        initialValues={initialValues}
        validationSchema={EmailvalidationSchema}
        onSubmit={onSubmit}
      >
        <Form className="rounded bg-white p-6 shadow-md space-y-6">
          <Field
            type="email"
            name="email"
            label="Email"
            as={TextInput}
            fullWidth
          />

          {/* Reset Password Button */}
          <CustomButtonNew type="submit" buttonType="PRIMARY">
            Reset Password
          </CustomButtonNew>
        </Form>
      </Formik>
      <Link className="login-link text-onNeutralBg" href="/loginpage">
        Remember Password?
      </Link>
    </div>
    </div>
  );
};

export default ForgotPasswordPage;
