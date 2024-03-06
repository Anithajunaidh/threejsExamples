import React from 'react';
import router from 'next/router';
import { EmailvalidationSchema } from '@/utils/Validations';
import { Formik,Form, Field } from 'formik';
import TextInput from '@/components/TextInput';
import CustomButtonNew from '@/components/button';

const ForgotPasswordPage: React.FC = () => {
  const initialValues = {
    email: '',
  };
  const onSubmit = (values: {
    email: string;
  }) => {
    console.log('Form Values:', values);
    router.push('/loginPage');
  }

  return (
    <div className="flex flex-col items-center justify-center bg-gray-100">
      <h1 className="mb-4 text-4xl font-bold">Forgot Password</h1>
      <Formik   initialValues={initialValues}
        validationSchema={EmailvalidationSchema}
        onSubmit={onSubmit}>
      <Form className="rounded bg-white p-6 shadow-md space-y-6">
      <Field type="email" name="email" label="Email" as={TextInput} fullWidth/>

        {/* Forgot Password Button */}
        <CustomButtonNew
          type="submit" buttonType='PRIMARY'        >
          Forgot Password
        </CustomButtonNew>
      </Form>
      </Formik>
    </div>
  );
};

export default ForgotPasswordPage;
