import { Component, Input, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { select, Store } from '@ngrx/store';
import { FormGroupState, NgrxValueConverter, NgrxValueConverters, ResetAction, SetValueAction } from 'ngrx-forms';
import { Observable } from 'rxjs';
import { filter, map, take } from 'rxjs/operators';
import { PasswordForm } from '../model/password-form';
import { FormValue, INITIAL_STATE, SetSubmittedValueAction, State } from '../password-form.reducer';


@Component({
  selector: 'app-password-form',
  templateUrl: './password-form.component.html',
  styleUrls: ['./password-form.component.css']
})
export class PasswordFormComponent implements OnInit {
  @Input() passwordForm: PasswordForm;

  formState$: Observable<FormGroupState<FormValue>>;
  submittedValue$: Observable<FormValue | undefined>;

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

  formGroup = new FormGroup({
    website: new FormControl({ url: '', baseUrl: '' }, [
      Validators.required
    ]),
    email: new FormControl('', []),
    username: new FormControl('', []),
    password: new FormControl('', []),
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

  constructor(private store: Store<State>) {
    this.formState$ = store.pipe(select(s => s.passwordForm.formState));
    this.submittedValue$ = store.pipe(select(s => s.passwordForm.submittedValue));
  }

  ngOnInit() {
    console.log('form', this.passwordForm);
    this.formGroup.patchValue({
      website: { url: this.passwordForm.website }
    });

    this.formGroup.setValue({
      website: { url: this.passwordForm.website },
      username: this.passwordForm.username,
      email: this.passwordForm.email,
      password: this.formGroup.get('password').value
    });
  }

  dateValueConverter: NgrxValueConverter<Date | null, string | null> = {
    convertViewToStateValue(value) {
      if (value === null) {
        return null;
      }

      // the value provided by the date picker is in local time but we want UTC so we recreate the date as UTC
      value = new Date(Date.UTC(value.getFullYear(), value.getMonth(), value.getDate()));
      return NgrxValueConverters.dateToISOString.convertViewToStateValue(value);
    },
    convertStateToViewValue: NgrxValueConverters.dateToISOString.convertStateToViewValue,
  };

  reset() {
    this.store.dispatch(new SetValueAction(INITIAL_STATE.id, INITIAL_STATE.value));
    this.store.dispatch(new ResetAction(INITIAL_STATE.id));
  }

  submit() {
    this.formState$.pipe(
      take(1),
      filter(s => s.isValid),
      map(fs => new SetSubmittedValueAction(fs.value)),
    ).subscribe(this.store);
  }

}
