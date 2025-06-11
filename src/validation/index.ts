import * as yup from "yup";

export const registerSchema = yup.object({
  username: yup
    .string()
    .required("username is required")
    .min(5, "username must be at least 5 characters")
    .max(20, "username must be at most 20 characters"),
  email: yup
    .string()
    .email()
    .required("email is required")
    .matches(/^[a-zA-Z0-9+_.-]+@[a-zA-Z0-9.-]+$/, "Invalid email"),
  password: yup
    .string()
    .required("Password is required")
    .min(8, "Password must be at least 8 characters"),
  confirm_password: yup
    .string()
    .required("confirm password is required")
    .oneOf([yup.ref("password")], "Passwords do not match"),
});

export const loginSchema = yup.object({
  email: yup
    .string()
    .email()
    .required("email is required")
    .matches(/^[a-zA-Z0-9+_.-]+@[a-zA-Z0-9.-]+$/, "Invalid email"),
  password: yup
    .string()
    .required("Password is required")
    .min(8, "Password must be at least 8 characters"),
});
