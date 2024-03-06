import { useRouter } from 'next/router';
import {  Field, Form, Formik, } from 'formik';
import TextInput from '@/components/TextInput';
import { ChangePasswordSchema } from '@/utils/Validations';
import CustomButtonNew from '@/components/button';
const ChangePasswordPage: React.FC = () => {
const router=useRouter();
const initialValues={currentPassword:'',newPassword:'',confirmPassword:''}
  const onSubmit = (values:{currentPassword:string,newPassword:string ,confirmPassword:string}) => {
    console.log('Form Values:', values);
router.push('/loginpage')
  };

  return (
    <div className="flex h-screen flex-col items-center justify-center bg-gray-100">
      <h1 className="mb-4 text-4xl font-bold">Change Password</h1>
      <Formik initialValues={initialValues} onSubmit={onSubmit} validationSchema={ChangePasswordSchema}>
      <Form className="rounded bg-white p-6 shadow-md space-y-6">
      <Field type="password" name="currentPassword" label="Current Password" as={TextInput} fullWidth/> 
      <Field type="password" name="newPassword" label="New Password" as={TextInput} fullWidth/> 
      <Field type="password" name="confirmPassword" label="Confirm Password" as={TextInput} fullWidth/>
        {/* Change Password Button */}
        <CustomButtonNew
          type="submit" buttonType='PRIMARY'        >
          Change Password
        </CustomButtonNew>
      </Form>
      </Formik>
    </div>
  );
};

export default ChangePasswordPage;
