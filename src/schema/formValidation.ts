import * as yup from "yup";

export const phoneSchema = yup.object().shape({
  phone: yup
    .string()
    .matches(/^\d{10}$/, "Phone number must be exactly 10 digits")
    .required("Required"),
});
export const createAccountSchema = yup.object().shape({
  firstName: yup.string().required("Required"),
  lastName: yup.string().required("Required"),
  email: yup.string().email("Invalid Email Address").required("Required"),
  password: yup.string().min(8, "Min. 8 Characters").required("Required"),
});
export const bvnSchema = yup.object().shape({
  bvn: yup
    .string()
    .matches(/^\d{11}$/, "BVN must be exactly 11 digits")
    .required("Required"),
});
export const forgotPasswordSchema = yup.object().shape({
  email: yup.string().email("Invalid Email Address").required("Required"),
});
export const resetPasswordSchema = yup.object().shape({
  newPass: yup.string().min(8, "Min 8 Characters").required("Required"),
  confirmNewPass: yup
    .string()
    .oneOf([yup.ref("newPass"), null] as any[], "Passwords must match")
    .required("Required"),
});
export const loginSchema = yup.object().shape({
  email: yup.string().email("Invalid Email Address").required("Required"),
  password: yup.string().min(8, "Min. 8 Characters").required("Required"),
});

export const signupSchema = yup.object().shape({
  email: yup.string().email("Invalid Email Address").required("Required"),
  password: yup.string().min(8, "Min. 8 Characters").required("Required"),
  confirmpass: yup.string().min(8, "Min. 8 Characters").required("Required"),
});
