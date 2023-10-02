
export interface driverModel {
  id?: string;
  dni?: string;
  firstName?: string;
  secondName?: string;
  firstSurname?: string;
  secondSurname?: string;
  password?: string;
  phone?: number;
  companyEmail?: string;
  licenseNumber?: string;
  authorizedCategory?: {
    id?: string;
    category?: string;
    validity: string;
  };
}
