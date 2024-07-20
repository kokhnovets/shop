import { HttpInterceptorFn, HttpResponse } from '@angular/common/http';
import { delay, of } from 'rxjs';
import { IProduct } from '../type';

let products: IProduct[] = [
  { id: 1, name: 'Товар 1', price: 100, desc: 'Lorem Ipsum 1' },
  { id: 2, name: 'Товар 2', price: 100, desc: 'Lorem Ipsum 2' },
  { id: 3, name: 'Товар 3', price: 100, desc: 'Lorem Ipsum 3' },
];

export const apiInterceptor: HttpInterceptorFn = (req, next) => {
  const { url, method, body } = req;
  // Имитация GET-запроса
  if (url.endsWith('/api/products') && method === 'GET') {
    return of(new HttpResponse({ status: 200, body: products })).pipe(
      delay(500)
    );
  }

  // Имитация POST-запроса
  if (url.endsWith('/api/products') && method === 'POST') {
    const newItem: IProduct = {
      id: Math.floor(Math.random() * 1000) + 1,
      ...(body as Omit<IProduct, 'id'>),
    };
    return of(new HttpResponse({ status: 201, body: newItem })).pipe(
      delay(500)
    );
  }

  // Имитация PUT-запроса
  if (url.match(/\/api\/products\/\d+$/) && method === 'PUT') {
    return of(new HttpResponse({ status: 200, body })).pipe(delay(500));
  }

  // Имитация DELETE-запроса
  if (url.match(/\/api\/products\/\d+$/) && method === 'DELETE') {
    return of(new HttpResponse({ status: 204, body })).pipe(delay(500));
  }

  return next(req);
};
