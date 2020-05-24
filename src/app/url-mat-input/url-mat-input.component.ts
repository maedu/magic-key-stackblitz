import { coerceBooleanProperty } from '@angular/cdk/coercion';
import { Component, ElementRef, Input, OnDestroy, Optional, Renderer2, Self } from '@angular/core';
import { FocusMonitor } from '@angular/cdk/a11y';
import { FormControl } from '@angular/forms';
import { FormControlState, FormViewAdapter, NGRX_FORM_VIEW_ADAPTER } from 'ngrx-forms';
import { FormGroup, NgControl } from '@angular/forms';
import { MatFormFieldControl } from '@angular/material/form-field';
import { Subject } from 'rxjs';


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
export class UrlMatInputComponent implements OnDestroy, FormViewAdapter {

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
    private focusMonitor: FocusMonitor,
    private renderer: Renderer2,
    private elementRef: ElementRef,
    @Optional() @Self() public ngControl: NgControl) {

      focusMonitor.monitor(elementRef, true).subscribe(origin => {
        if (this.focused && !origin) {
          this.onTouched();
        }
        this.focused = !!origin;
        this.stateChanges.next();
      });
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
    this.focusMonitor.stopMonitoring(this.elementRef);
  }

  setDescribedByIds(ids: string[]) {
    this.describedBy = ids.join(' ');
  }

  _handleInput(): void {
    this.onChange(this.value);
  }
}