import { Component } from '@angular/core';
import { ButtonModule } from 'primeng/button';
import { BaseBtnConfig } from '../../../core/base-btn-config';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-at-button-component',
  imports: [ButtonModule, CommonModule],
  templateUrl: './at-button-component.html',
  styleUrl: './at-button-component.css',
})
export class AtButtonComponent extends BaseBtnConfig {

}
