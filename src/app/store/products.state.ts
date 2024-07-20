import { IProduct } from '../type';

export interface IProductState {
  products: IProduct[];
  error: any;
}

export const initialState: IProductState = {
  products: [],
  error: null,
};
