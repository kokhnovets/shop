import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { StoreModule } from '@ngrx/store';
import { productReducer } from './store/products.reducers';
import { EffectsModule } from '@ngrx/effects';
import { provideHttpClient, withInterceptors } from '@angular/common/http';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { PRODUCTS_API_SERVICE } from './app.const';
import { apiInterceptor } from './interceptors/api.interceptor';
import { ProductsApiService } from './services/products-api.service';
import { ProductsEffects } from './store/products.effects';
import { CurrencyPipe } from '@angular/common';
import { ModalModule } from 'ngx-bootstrap/modal';
import { FormComponent } from './form/form.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [AppComponent, FormComponent],
  imports: [
    CurrencyPipe,
    BrowserModule,
    FormsModule,
    AppRoutingModule,
    ReactiveFormsModule,
    ModalModule.forRoot(),
    StoreModule.forRoot({ products: productReducer }),
    EffectsModule.forRoot([ProductsEffects]),
    StoreDevtoolsModule.instrument({ maxAge: 25, logOnly: false }),
  ],
  providers: [
    {
      provide: PRODUCTS_API_SERVICE,
      useClass: ProductsApiService,
    },
    provideHttpClient(withInterceptors([apiInterceptor])),
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
