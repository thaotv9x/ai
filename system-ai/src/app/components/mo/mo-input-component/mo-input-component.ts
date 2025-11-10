import { Component } from '@angular/core';
import { BaseFieldComponent } from '../../../core/base-field-valid-component';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { AtInputComponent } from "../../at/at-input-component/at-input-component";

@Component({
  selector: 'app-mo-input-component',
  imports: [ReactiveFormsModule, CommonModule, AtInputComponent],
  templateUrl: './mo-input-component.html',
  styleUrl: './mo-input-component.css',
})
export class MoInputComponent extends BaseFieldComponent {

}
