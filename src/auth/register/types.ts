export type RegisterFormValues = {
  firstName: string;
  lastName: string;
  email: string;
  password1: string;
  password2: string;
  country: string;
  state: string;
  city: string;
  street: string;
  roomNumber: string;
  phone: string;
};

export const defaultValues: RegisterFormValues = {
  firstName: "",
  lastName: "",
  password1: "",
  password2: "",
  email: "",
  phone: "",
  country: "",
  state: "",
  city: "",
  street: "",
  roomNumber: "",
};

export const countries = ["", "Argentina", "Brasil", "Chile"];
