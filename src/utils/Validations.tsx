import * as Yup from 'yup';

export const LoginvalidationSchema = Yup.object({
  email: Yup.string().required('Username is required'),
  // password: Yup.string().min(8, 'Password must be at least 8 characters')
  // .matches(
  //   /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]+$/,
  //   'Password must contain at least one lowercase letter, one uppercase letter, one number, and one special character'
  // )
  // .required('Password is required')
  
//  .required('Password is required')
//     .test('is-strong-password', 'Password must be strong', (value) => {
//       // Example: At least 8 characters, 1 uppercase letter, 1 lowercase letter, and 1 special character
//       const strongPasswordRegex =
//         /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
//       return strongPasswordRegex.test(value || '');
//     }),
});
export const EmailvalidationSchema = Yup.object({
  // username: Yup.string().required('Username is required'),
  // password: Yup.string().min(8, 'Password must be at least 8 characters')
  // .matches(
  //   /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]+$/,
  //   'Password must contain at least one lowercase letter, one uppercase letter, one number, and one special character'
  // )
  // .required('Password is required')
  //   ,
     email: Yup.string()
    .email('Invalid email format')
    .required('Email is required'),
});

export const ChangePasswordSchema = Yup.object().shape({
  currentPassword: Yup.string()
    .required('Current Password is required'),
  newPassword: Yup.string()
    .required('New Password is required')
    .notOneOf([Yup.ref('currentPassword')], 'New Password must be different from Current Password'),
  confirmPassword: Yup.string()
    .required('Confirm Password is required')
    .oneOf([Yup.ref('newPassword')], 'Confirm Password must match New Password'),
});
