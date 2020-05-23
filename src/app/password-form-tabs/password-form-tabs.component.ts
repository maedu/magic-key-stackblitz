import { Component, OnInit } from '@angular/core';
import { PasswordForm } from '../model/password-form'

@Component({
  selector: 'app-password-form-tabs',
  templateUrl: './password-form-tabs.component.html',
  styleUrls: ['./password-form-tabs.component.css']
})
export class PasswordFormTabsComponent implements OnInit {

  forms: PasswordForm[] = [];

  constructor() { }

  ngOnInit() {
    this.forms.push(new PasswordForm());
    this.forms[0].website = "www.test.com";
  }

}