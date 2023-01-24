import { FieldErrorsImpl } from "react-hook-form";

export type LoginFormValues = {
  email: string;
  password: string;
  invalidCredentials: string;
};

export type ErrorTypes = Partial<
  FieldErrorsImpl<{
    email: string;
    password: string;
    invalidCredentials: string;
  }>
>;