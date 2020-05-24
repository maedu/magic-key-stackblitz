import { FocusMonitor } from '@angular/cdk/a11y';
import { coerceBooleanProperty } from '@angular/cdk/coercion';
import { Component, ElementRef, Input, OnDestroy, Optional, Self, Renderer2 } from '@angular/core';
import { FormBuilder, FormGroup, ControlValueAccessor, NgControl, Validators } from '@angular/forms';
import { MatFormFieldControl } from '@angular/material/form-field';
import { Subject } from 'rxjs';
import { FormControl } from '@angular/forms';
import { Website } from '../model/website';
import * as Util from '../util';
import { FormViewAdapter, FormControlState, NGRX_FORM_VIEW_ADAPTER } from 'ngrx-forms';


@Component({
  selector: 'url-mat-input',
  templateUrl: './url-mat-input.component.html',
  styleUrls: ['./url-mat-input.component.css'],
  providers: [{ provide: MatFormFieldControl, useExisting: UrlMatInputComponent },
  {
    provide: NGRX_FORM_VIEW_ADAPTER,
    useExisting: UrlMatInputComponent,
    multi: true
  }
  ],
  host: {
    '[class.example-floating]': 'true',
    '[id]': 'id',
    '[attr.aria-describedby]': 'describedBy',
  }
})
export class UrlMatInputComponent implements ControlValueAccessor, MatFormFieldControl<string>, OnDestroy, FormViewAdapter {

  private state: FormControlState<any>;
  private nativeIdWasSet = false;
  
  urlFormControl = new FormControl;

  static nextId = 0;

  parts: FormGroup;
  stateChanges = new Subject<void>();
  focused = false;
  errorState = false;
  controlType = 'url-mat-input';
  id = `url-mat-input-input-${UrlMatInputComponent.nextId++}`;
  describedBy = '';
  onChange = (_: any) => { };
  onTouched = () => { };

  @Input() set ngrxFormControlState(value: FormControlState<any>) {
    if (!value) {
      throw new Error('The control state must not be undefined!');
    }

    this.state = value;
    const nativeId = this.elementRef.nativeElement.id;
    const shouldSetNativeId = value.id !== nativeId && this.nativeIdWasSet;
    if (shouldSetNativeId) {
      this.renderer.setProperty(this.elementRef.nativeElement, 'id', value.id);
    }
  }

  get empty() {
    return !this.urlFormControl.value;
  }

  get shouldLabelFloat() { return this.focused || !this.empty; }

  @Input()
  get placeholder(): string { return this._placeholder; }
  set placeholder(value: string) {
    this._placeholder = value;
    this.stateChanges.next();
  }
  private _placeholder: string;

  @Input()
  get required(): boolean { return this._required; }
  set required(value: boolean) {
    this._required = coerceBooleanProperty(value);
    this.stateChanges.next();
  }
  private _required = false;

  @Input()
  get disabled(): boolean { return this._disabled; }
  set disabled(value: boolean) {
    this._disabled = coerceBooleanProperty(value);
    this._disabled ? this.parts.disable() : this.parts.enable();
    this.stateChanges.next();
  }
  private _disabled = false;

  @Input()
  get value(): string | null {
    return this.urlFormControl.value;
  }
  set value(website: string | null) {
    this.urlFormControl.setValue(website);
    this.stateChanges.next();
  }

  constructor(
    formBuilder: FormBuilder,
    private _focusMonitor: FocusMonitor,
    private _elementRef: ElementRef<HTMLElement>,
    private renderer: Renderer2,
    private elementRef: ElementRef,
    @Optional() @Self() public ngControl: NgControl) {

    this.parts = formBuilder.group({
      area: [null, [Validators.required, Validators.minLength(3), Validators.maxLength(3)]],
      exchange: [null, [Validators.required, Validators.minLength(3), Validators.maxLength(3)]],
      subscriber: [null, [Validators.required, Validators.minLength(4), Validators.maxLength(4)]],
    });

    _focusMonitor.monitor(_elementRef, true).subscribe(origin => {
      if (this.focused && !origin) {
        this.onTouched();
      }
      this.focused = !!origin;
      this.stateChanges.next();
    });

    if (this.ngControl != null) {
      this.ngControl.valueAccessor = this;
    }
  }

  ngAfterViewInit() {
    const nativeId = this.elementRef.nativeElement.id;
    const shouldSetNativeId = this.state.id !== nativeId && !nativeId;
    if (shouldSetNativeId) {
      this.renderer.setProperty(this.elementRef.nativeElement, 'id', this.state.id);
      this.nativeIdWasSet = true;
    }
  }

  setViewValue(value: any) {
    console.log('setViewValue', value);
    this.urlFormControl.setValue(value);
    
  }

  setOnChangeCallback(fn: (value: any) => void): void {
    this.onChange = fn;
  }
  setOnTouchedCallback(fn: () => void): void {
    this.onTouched = fn;
  }
  setIsDisabled?(isDisabled: boolean): void {
    this.renderer.setProperty(this.elementRef.nativeElement, 'disabled', isDisabled);
  }

  ngOnDestroy() {
    this.stateChanges.complete();
    this._focusMonitor.stopMonitoring(this._elementRef);
  }

  setDescribedByIds(ids: string[]) {
    this.describedBy = ids.join(' ');
  }

  onContainerClick(event: MouseEvent) {
    if ((event.target as Element).tagName.toLowerCase() != 'input') {
      this._elementRef.nativeElement.querySelector('div')!.focus();
    }
  }

  writeValue(website: Website | null): void {
    console.log('writeValue', website);
    this.value = website;
  }

  registerOnChange(fn: any): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: any): void {
    this.onTouched = fn;
  }

  setDisabledState(isDisabled: boolean): void {
    this.disabled = isDisabled;
  }

  _handleInput(): void {
    this.onChange(this.value);
  }

  static ngAcceptInputType_disabled: boolean | string | null | undefined;
  static ngAcceptInputType_required: boolean | string | null | undefined;
}