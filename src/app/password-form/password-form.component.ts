import { Component, OnInit, Input } from '@angular/core';
import {FormControl, FormGroupDirective, FormGroup, NgForm, Validators} from '@angular/forms';

import {MatFormFieldControl} from '@angular/material/form-field';
import { PasswordForm } from '../model/password-form';

@Component({
  selector: 'app-password-form',
  templateUrl: './password-form.component.html',
  styleUrls: ['./password-form.component.css']
})
export class PasswordFormComponent implements OnInit {
  @Input() form: PasswordForm;

  showPasswordSettings = {
    type: 'text',
    icon: 'visibility_off'
  };
  hidePasswordSettings = {
    type: 'password',
    icon: 'visibility'
  };
  originalPasswordVisibility = {
    type: this.hidePasswordSettings.type,
    icon: this.hidePasswordSettings.icon
  };



  myForm = new FormGroup({
    website: new FormControl({url: '',baseUrl:''}, [
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

  showPassword(settings) {
    console.log('show');
    settings.type = this.showPasswordSettings.type;
    settings.icon = this.showPasswordSettings.icon;
  }
  hidePassword(settings) {
    settings.type = this.hidePasswordSettings.type;
    settings.icon = this.hidePasswordSettings.icon;
    console.log('hide', settings, this.hidePasswordSettings);
  }

  constructor() { }

  ngOnInit() {
    console.log('form', this.form);
    this.myForm.patchValue({
      website: { url: this.form.website }
    });
 }

}
