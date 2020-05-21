import { Component, OnInit } from '@angular/core';
import {FormControl, FormGroupDirective, FormGroup, NgForm, Validators} from '@angular/forms';

import {MatFormFieldControl} from '@angular/material/form-field';

@Component({
  selector: 'app-password-form',
  templateUrl: './password-form.component.html',
  styleUrls: ['./password-form.component.css']
})
export class PasswordFormComponent implements OnInit {
templateDrivenForm = 'www.google.ch';
urlSelected = true;


myForm = new FormGroup({
    gender: new FormControl('', [
      Validators.required
    ]),
    name: new FormControl('', [
      Validators.required,
      Validators.minLength(2)
    ]),
    birthdate: new FormControl('', [
      Validators.required,
    ]),
  });

  myControl = new FormControl;
  constructor() { }

  ngOnInit() {
     this.myControl.setValue('www.google.ch');
 }

}
