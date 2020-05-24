import { Action, combineReducers } from '@ngrx/store';
import {
  box,
  Boxed,
  createFormGroupState,
  createFormStateReducerWithUpdate,
  disable,
  enable,
  FormGroupState,
  updateGroup,
  validate,
} from 'ngrx-forms';
import { equalTo, minLength, required, requiredTrue } from 'ngrx-forms/validation';

import { State as RootState } from './app.reducer';

export interface PasswordValue {
  password: string;
  confirmPassword: string;
}

export interface FormValue {
  website: string;
  userName: string;
  email: string;
  password: string;

}

export interface State extends RootState {
  passwordForm: {
    formState: FormGroupState<FormValue>;
    submittedValue: FormValue | undefined;
  };
}

export class SetSubmittedValueAction implements Action {
  static readonly TYPE = 'passwordForm/SET_SUBMITTED_VALUE';
  readonly type = SetSubmittedValueAction.TYPE;
  constructor(public submittedValue: FormValue) { }
}

export const FORM_ID = 'passwordForm';

export const INITIAL_STATE = createFormGroupState<FormValue>(FORM_ID, {
  website: 'blab.com',
  userName: '',
  email: '',
  password: ''
});

const validationFormGroupReducer = createFormStateReducerWithUpdate<FormValue>(updateGroup<FormValue>({
  website: validate(required),
  userName: validate(required),
  email: validate(required),
  password: validate(required),
}));

const reducers = combineReducers<State['passwordForm'], any>({
  formState(s = INITIAL_STATE, a: Action) {
    return validationFormGroupReducer(s, a);
  },
  submittedValue(s: FormValue | undefined, a: SetSubmittedValueAction) {
    switch (a.type) {
      case SetSubmittedValueAction.TYPE:
        return a.submittedValue;

      default:
        return s;
    }
  },
});

export function reducer(s: State['passwordForm'], a: Action) {
  return reducers(s, a);
}