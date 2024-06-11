export interface InputListProductDto {}

type Producer = {
  id: string;
  name: string;
  price: number;
};

export interface OutputListProductDto {
  Producers: Producer[];
}
