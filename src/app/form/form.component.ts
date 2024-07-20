import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { IProduct } from '../type';
import { BsModalRef } from 'ngx-bootstrap/modal';

type Nullable<T> = T | null;

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.scss'],
})
export class FormComponent implements OnInit {
  public form!: FormGroup<any>;

  public callback!: (model: IProduct) => void;
  public isEdit: boolean = false;

  private model: Nullable<IProduct> = null;
  constructor(public bsModalRef: BsModalRef) {}
  ngOnInit(): void {
    this.form = new FormGroup({
      name: new FormControl(this.model?.name, [Validators.required]),
      price: new FormControl(this.model?.price, [Validators.required]),
      desc: new FormControl(this.model?.desc),
    });
  }

  public submit(): void {
    const model: IProduct = this.form?.value;
    this.callback(model);
  }
}
