export type DefaultMainInformationValues = {
  email: string;
  phone: string;
  password: string;
  invalidCredentials?: string;
};

export type DefaultPasswordInformationValues = {
  actualPassword?: string;
  newPassword1?: string;
  newPassword2?: string;
  invalidCredentials?: string;
};

export type DefaultAddressInformationValues = {
  country?: string;
  state?: string;
  city?: string;
  street?: string;
  roomNumber?: string;
  password: string;
  invalidCredentials?: string;
};

export enum FormType {
  ADD = "Add",
  NORMAL = "Normal",
}
