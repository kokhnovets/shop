import { Inject, Injectable } from '@angular/core';
import { ActionsSubject } from '@ngrx/store';
import { createEffect, ofType } from '@ngrx/effects';
import { PRODUCTS_API_SERVICE } from '../app.const';
import { ProductsApiService } from '../services/products-api.service';
import { ProductsActions } from './products.actions';
import { catchError, map, mergeMap, of, switchMap } from 'rxjs';
import { IProduct } from '../type';

@Injectable()
export class ProductsEffects {
  constructor(
    private readonly _actions$: ActionsSubject,
    @Inject(PRODUCTS_API_SERVICE)
    private readonly _productsApiService: ProductsApiService
  ) {}

  public loadProducts$ = createEffect(() =>
    this._actions$.pipe(
      ofType(ProductsActions.loadProducts),
      mergeMap(() =>
        this._productsApiService.getProducts().pipe(
          map((products: IProduct[]) =>
            ProductsActions.loadProductsSuccess({ products })
          ),
          catchError((error) =>
            of(ProductsActions.loadProductsFailure({ error }))
          )
        )
      )
    )
  );

  public addProduct$ = createEffect(() =>
    this._actions$.pipe(
      ofType(ProductsActions.addProduct),
      switchMap(({ product }) =>
        this._productsApiService.createProduct(product).pipe(
          map((product: IProduct) =>
            ProductsActions.addProductSuccess({ product })
          ),
          catchError((error) =>
            of(ProductsActions.addProductFailure({ error }))
          )
        )
      )
    )
  );

  public updateProduct$ = createEffect(() =>
    this._actions$.pipe(
      ofType(ProductsActions.updateProduct),
      switchMap(({ product }) =>
        this._productsApiService.updateProduct(product).pipe(
          map((product) => ProductsActions.updateProductSuccess({ product })),
          catchError((error) =>
            of(ProductsActions.updateProductFailure({ error }))
          )
        )
      )
    )
  );

  public deleteProduct$ = createEffect(() =>
    this._actions$.pipe(
      ofType(ProductsActions.deleteProduct),
      switchMap(({ id }) =>
        this._productsApiService.deleteProduct(id).pipe(
          map(() => ProductsActions.deleteProductSuccess({ id })),
          catchError((error) =>
            of(ProductsActions.updateProductFailure({ error }))
          )
        )
      )
    )
  );
}
