export class PasswordForm {
  website: string = '';
  username: string = '';
  email: string = '';
  hint: string = '';
  settings: PassFormSettings = {
  smallLetters: true,
  capitalLetters: true,
  numbers: true,
  specialCharacters: true,
  specialCharacterList: '][?/<~#`!@$%^&*()+=}|:";\',>{',
  length: 20,
  algorithm: PassFormSettings.ALGORITHM_NEW
  }
};

export class PassFormSettings {
  public static ALGORITHM_OLD = 'old';
  public static ALGORITHM_NEW = 'new';

  smallLetters: boolean = true;
  capitalLetters: boolean = true;
  numbers: boolean = true;
  specialCharacters: boolean =  true;
  specialCharacterList: string = '][?/<~#`!@$%^&*()+=}|:";\',>{';
  length: number = 20;
  algorithm: string = PassFormSettings.ALGORITHM_NEW;
};