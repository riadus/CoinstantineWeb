import { Component, Output, EventEmitter, Input, ViewChild, ElementRef, OnInit, ChangeDetectorRef, AfterViewInit } from '@angular/core';
import { FormControl, FormGroup, Validators, FormBuilder } from '@angular/forms';
import { AppConfig } from '../../../../config/appConfig';
import {ReCaptcha2Component, InvisibleReCaptchaComponent} from 'ngx-captcha/'
declare var hljs: any;
@Component({
  selector: 'app-captcha',
  templateUrl: './captcha.component.html',
  styleUrls: ['./captcha.component.less']
})
export class CaptchaComponent implements AfterViewInit {
  form: FormGroup;

  ngOnInit(): void {
    this.captchaElem.siteKey = this.config.configOptions.reCaptchaKey;
  }

  @Output() validated = new EventEmitter();
  @ViewChild('captchaElem') captchaElem: InvisibleReCaptchaComponent;
  
  public captchaIsLoaded = false;
  public captchaSuccess = false;
  public captchaResponse?: string;
  public captchaIsReady = false;

  public badge: 'bottomright' | 'bottomleft' | 'inline' = 'bottomright';
  public type: 'image' | 'audio';
  public theme: 'light' | 'dark' = 'light';

  public recaptcha: any = null;

  
  constructor(private config: AppConfig, private formBuilder: FormBuilder, private cdr: ChangeDetectorRef) { 
    this.form = this.formBuilder.group({
      recaptcha: ['', Validators.required]
    });
  }
 
  ngAfterViewInit(): void {
    this.captchaIsLoaded = true;
    this.cdr.detectChanges();
    this.highlight();
  }

  execute(): void {
    this.captchaElem.execute();
  }

  handleReset(): void {
    this.captchaSuccess = false;
    this.captchaResponse = undefined;
  }

  handleSuccess(captchaResponse: string): void {
    this.validated.emit(captchaResponse);
    this.captchaSuccess = true;
    this.captchaResponse = captchaResponse;
  }

  handleLoad(): void {
    this.captchaIsLoaded = true;
  }

  handleReady(): void {
    this.captchaIsReady = true;
  }

  changeBadge(badge: 'bottomright' | 'bottomleft' | 'inline' = 'bottomright'): void {
    this.badge = badge;
  }

  changeType(type: 'image' | 'audio'): void {
    this.type = type;
  }

  getResponse(): void {
    const response = this.captchaElem.getResponse();
    if (!response) {
      alert(`There is no response from grecaptcha script - try using 'getCurrentResponse' method or subscribe to 'success' event`);
    } else {
      alert(response);
    }
  }

  reload(): void {
    this.captchaElem.reloadCaptcha();
  }

  getCaptchaId(): void {
    alert(this.captchaElem.getCaptchaId());
  }

  reset(): void {
    this.captchaElem.resetCaptcha();
  }

  getCurrentResponse(): void {
    const currentResponse = this.captchaElem.getCurrentResponse();
    if (!currentResponse) {
      alert('There is no current response - have you submitted captcha?');
    } else {
      alert(currentResponse);
    }
  }

  changeTheme(theme: 'light' | 'dark'): void {
    this.theme = theme;
  }

  private highlight(): void {
    const highlightBlocks = document.getElementsByTagName('code');
    for (let i = 0; i < highlightBlocks.length; i++) {
      const block = highlightBlocks[i];
      hljs.highlightBlock(block);
    }
  }
}
