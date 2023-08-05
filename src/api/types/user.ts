export interface IMutationLoginArgs {
  username: string;
  password: string;
}

export interface IResponseLogin {
  user: {
    id: number
  };
  email: string;
  token: string;
  expiry: string;
  username: string;
}
export interface IResponseUserLogin {
  id: number;
  email: string;
  username: string;
}

export interface IMutationRegisterArgs {
  username: string;
  email: string;
  password: string;
  first_name: string;
  last_name: string;
  country: string;
  zip_code: string;
  city: string;
  address: string;
  phone_number: string;
  referral_code?: string | undefined;
  terms_and_conditions_accepted: boolean;
  personal_identification: string;
}

export interface IMutationChangePasswordArgs {
  old_password: string;
  new_password: string;
}

export interface IResponseChangePassword {
  id: number;
}

export interface IResponseRegister {
  id: number;
  first_name: string;
  username: string;
  email: string;
  phone_number: string;
  country: string;
  city: string;
  address: string;
  zip_code: string;
  referral_code: string;
  terms_and_conditions_accept: boolean;
}

export interface IMutationVerifyEmailArgs {
  key: string;
}

export interface IResponseVerifyEmail {}

export interface IMutationResetPasswordArgs {
  email: string;
  old_password: string;
  new_password: string;
}

export interface IResponseResetPassword {}

export interface IQueryGetUserDataArgs {
  id: number | string;
}

export interface IResponseGetUserData {
  id: number;
  first_name: string;
  last_name: string;
  username: string;
  email: string;
  phone_number: string;
  country: string;
  city: string;
  address: string;
  zip_code: string;
  referral_code: string;
  profile_image?: string
}

export interface IResponseGetUserAccountData {
  date_joined: string;
  email: string;
  email_verified: boolean;
  has_active_kitplan: boolean;
  has_network: boolean;
  has_pending_kitplan_transaction: boolean;
  has_sales_funnel: boolean;
  has_trading_plan: boolean;
  is_active: boolean;
  is_cofounder: boolean;
  is_staff: boolean;
  last_login: string;
  leadership_pool_type_id: string | null;
  username: string;
}

export interface ISecurityProfile {
  id: number;
  dni_image: string;
  dni_back_image: string;
  terms_and_conditions: boolean;
  user: number;
}

export interface IMutationSendActiveKey {
  id: string | number;
}

export interface IResponseSendActiveKey {
  message: string;
}

export interface IQueryNetworkArgs {
  id: number | string;
}

export interface IResponseGetNetWork {
  id: number;
  user: number;
}

export interface IMutationEditUserArgs {
  id: number | undefined;
  username: string | undefined;
  email: string | undefined;
  address: string;
  phone_number: string;
  zip_code: string;
  profile_image: string;
}

export interface IResponsePostUserUpdate extends IResponseGetUserData {}
