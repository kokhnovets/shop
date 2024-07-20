import { createAction, props } from '@ngrx/store';
import { IProduct } from '../type';

export enum ProductsActionType {
  loadProducts = '[Products] Load Products',
  loadProductsSuccess = '[Products] Load Products Success',
  loadProductsFailure = '[Products] Load Products Failure',
  addProduct = '[Products] Add Product',
  addProductSuccess = '[Products] Add Product Success',
  addProductFailure = '[Products] Add Product Failure',
  updateProduct = '[Products] Update Product',
  updateProductSuccess = '[Products] Update Product Success',
  updateProductFailure = '[Products] Update Product Failure',
  deleteProduct = '[Products] Update Delete Product',
  deleteProductSuccess = '[Products] Delete Product Success',
  deleteProductFailure = '[Products] Delete Product Failure',
}

export class ProductsActions {
  public static loadProducts = createAction(ProductsActionType.loadProducts);

  public static loadProductsSuccess = createAction(
    ProductsActionType.loadProductsSuccess,
    props<{ products: IProduct[] }>()
  );

  public static loadProductsFailure = createAction(
    ProductsActionType.loadProductsFailure,
    props<{ error: any }>()
  );

  public static addProduct = createAction(
    ProductsActionType.addProduct,
    props<{ product: IProduct }>()
  );

  public static addProductSuccess = createAction(
    ProductsActionType.addProductSuccess,
    props<{ product: IProduct }>()
  );

  public static addProductFailure = createAction(
    ProductsActionType.addProductFailure,
    props<{ error: any }>()
  );

  public static updateProduct = createAction(
    ProductsActionType.updateProduct,
    props<{ product: IProduct }>()
  );

  public static updateProductSuccess = createAction(
    ProductsActionType.updateProductSuccess,
    props<{ product: IProduct }>()
  );

  public static updateProductFailure = createAction(
    ProductsActionType.updateProductFailure,
    props<{ error: any }>()
  );

  public static deleteProduct = createAction(
    ProductsActionType.deleteProduct,
    props<{ id: number }>()
  );

  public static deleteProductSuccess = createAction(
    ProductsActionType.deleteProductSuccess,
    props<{ id: number }>()
  );

  public static deleteProductFailure = createAction(
    ProductsActionType.deleteProductFailure,
    props<{ error: any }>()
  );
}
