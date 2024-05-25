export interface signUpForm {
  id?: string;
  dni?: string;
  firstName?: string;
  secondName?: string;
  firstSurname?: string;
  secondSurname?: string;
  password?: string;
  phone?: string;
  companyEmail?: string;
  licenseNumber?: string;
  authorizedCategory?: {
    id?: string;
    category?: string;
    validity: string;
  };
}

export interface logInForm{
  username: string;
  password: string;
}
