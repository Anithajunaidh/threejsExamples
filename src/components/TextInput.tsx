
// import React from 'react';
// import { Field, ErrorMessage, FieldProps, useFormikContext } from 'formik';
// import { TextField } from '@mui/material';
// interface TextInputProps {
//   label: string;
//   name: string;
//   type:string;
//   className?: string;
// }
// const TextInput: React.FC<TextInputProps> = ({ label, name,...props }) => {
//   const { touched } = useFormikContext();
//   const _props={label,name,...props}
//   return(
//   <div>
//     <Field name={name}>
//       {({ field }: FieldProps) => (
//         <TextField
//           fullWidth
//           label={label}
//           variant="outlined"
//           id={name}
//           {...field}
//           {...props}

//           className={props.className}
//         />
//       )}
//     </Field>
//     {touched&& <ErrorMessage name={name} component="div" className="error-message" />}  </div>
// );
//       };
// export default TextInput;
import React from 'react';
import { TextField, TextFieldProps } from '@mui/material';
import { useField } from 'formik';
type CustomTextFieldProps = TextFieldProps & {
  name: string;  // Name is made required here
};

const TextInput: React.FC<CustomTextFieldProps> = ({ name, ...props }) => {
  const [field, meta] = useField(name);

  const config = {
    ...field,
    ...props,
    error: Boolean(meta.touched && meta.error),
    helperText: meta.touched && meta.error ? meta.error : '',
  };

  return ( 
    <TextField {...config} className=" dark:text-white dark:placeholderColor" />
       );
};

export default TextInput;

