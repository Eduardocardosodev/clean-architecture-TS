export interface InputFindCustomerDto {
  id: string;
}

export interface OutPutFindCustomerDto {
  id: string;
  name: string;
  address: {
    street: string;
    city: string;
    number: number;
    zip: string;
  };
}
