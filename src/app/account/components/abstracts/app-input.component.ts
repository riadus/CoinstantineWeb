import { Input, Component } from "@angular/core";
import { AbstractControl } from "@angular/forms";

@Component({
    
    selector: 'app-input',
    template: `
    <div class="wrap-input100 validate-input">
        <input *ngIf="type == 'date'" class="form-input100" type="text" placeholder="{{placeholder}}" [formControl]="control" onfocus="this.type='date'; this.focus();" 
        onblur="if(this.value == '') this.type='text';">
        <input *ngIf="type !== 'date'" class="form-input100" type="{{type}}" placeholder="{{placeholder}}" [formControl]="control">
            <span *ngIf="flashing" class="focus-form-input100"></span>
            <span class="symbol-form-input100">
            <i class="{{icon}}"></i>
        </span>
    </div>
`})
  export class AppInputComponent {
    @Input() placeholder: string;
    @Input() type: string;
    @Input() icon: string;
    @Input() control: AbstractControl 
    @Input() flashing: Boolean;
}