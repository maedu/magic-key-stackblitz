import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule } from '@angular/router';

import { AppComponent } from './app.component';
import { TopBarComponent } from './top-bar/top-bar.component';
import { PasswordFormComponent } from './password-form/password-form.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ContenteditableModule } from '@ng-stack/contenteditable';
import { HighlightBaseurlDirective } from './highlight-baseurl.directive';
import { UrlMatInputComponent } from './url-mat-input/url-mat-input.component'; 
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatIconModule} from '@angular/material/icon';
import {MatInputModule} from '@angular/material/input';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

@NgModule({
  imports: [
    ContenteditableModule,
    FormsModule,
    BrowserModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatIconModule,
    MatInputModule,
    BrowserAnimationsModule,
    RouterModule.forRoot([
      { path: '', component: PasswordFormComponent },
    ])
  ],
  declarations: [
    AppComponent,
    TopBarComponent,
    PasswordFormComponent,
    HighlightBaseurlDirective,
    UrlMatInputComponent
  ],
  bootstrap: [ AppComponent ]
})
export class AppModule { }


/*
Copyright Google LLC. All Rights Reserved.
Use of this source code is governed by an MIT-style license that
can be found in the LICENSE file at http://angular.io/license
*/