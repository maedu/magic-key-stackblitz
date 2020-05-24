import { Component, OnInit } from '@angular/core';
import { select, Store } from '@ngrx/store';
import { FormGroupState } from 'ngrx-forms';
import { Observable } from 'rxjs';
import { PasswordForm } from '../model/password-form';
import { FormValue, State } from '../password-form.reducer';

@Component({
  selector: 'app-password-form-tabs',
  templateUrl: './password-form-tabs.component.html',
  styleUrls: ['./password-form-tabs.component.css']
})
export class PasswordFormTabsComponent implements OnInit {

  forms: PasswordForm[] = [];
  formState$: Observable<FormGroupState<FormValue>>;

  constructor(private store: Store<State>) {
    this.formState$ = store.pipe(select(s => s.passwordForm.formState));
  }

  ngOnInit() {
    this.forms.push(new PasswordForm());
    this.forms[0].website = "www.test.com";
    this.forms[0].username = "my username";
  }

}