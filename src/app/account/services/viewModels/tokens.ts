export class Tokens {
    token: string;
    refreshToken : string
  }

export class AccountCreationModel {
  username : string;
  email: string;
  password: string;
  firstname:string;
  lastname:string;
  dateOfBirth: string;
  address: string;
  city: string;
  country:string;
  source: string;
  referralCode: string;
  language: string;
}

export class AccountCorrect {
  usernameAvailable: boolean;
  emailAvailable: boolean;
  passwordCorrect: boolean;
}

export class AccountChangeModel
{
  Password: string;
  FirstName: string;
  LastName: string;
  DateOfBirth: string;
  Address: string;
  City: string;
  PostalCode: string;
  Country: string;
}
