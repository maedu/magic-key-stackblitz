import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'app-password-form',
  templateUrl: './password-form.component.html',
  styleUrls: ['./password-form.component.css']
})
export class PasswordFormComponent implements OnInit {
templateDrivenForm = 'www.google.ch';
  myControl = new FormControl;
  constructor() { }

  ngOnInit() {
     this.myControl.setValue('www.google.ch');
 }

}
