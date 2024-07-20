import { Component, OnInit } from '@angular/core';
import { IProduct } from './type';
import { ProductsActions } from './store/products.actions';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { selectAllProducts } from './store/products.selectors';
import { IProductState, initialState } from './store/products.state';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { FormComponent } from './form/form.component';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  public products$: Observable<IProduct[]>;
  private _modalRef?: BsModalRef;

  constructor(
    private readonly _store: Store<IProductState>,
    private readonly _modalService: BsModalService
  ) {
    this.products$ = this._store.select(selectAllProducts);
    this.products$.subscribe((val) => console.log(val));
  }

  public ngOnInit(): void {
    this._store.dispatch(ProductsActions.loadProducts());
  }

  public editProduct(product: IProduct) {
    const initialState = {
      model: product,
      isEdit: true,
      callback: (model: Omit<IProduct, 'id'>) => {
        const updateModel: IProduct = {
          id: product.id,
          ...model,
        };
        this._store.dispatch(
          ProductsActions.updateProduct({ product: updateModel })
        );

        this._modalRef?.hide();
      },
    };

    this._modalRef = this._modalService.show(FormComponent, {
      initialState,
    });
  }

  public addProduct(): void {
    const initialState = {
      isEdit: false,
      callback: (model: Omit<IProduct, 'id'>) => {
        this._store.dispatch(
          ProductsActions.addProduct({ product: model as IProduct })
        );

        this._modalRef?.hide();
      },
    };

    this._modalRef = this._modalService.show(FormComponent, { initialState });
  }

  public deleteProduct(id: number) {
    this._store.dispatch(ProductsActions.deleteProduct({ id }));
  }
}
