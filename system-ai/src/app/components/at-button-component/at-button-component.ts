import { Component } from '@angular/core';
import { ButtonModule } from 'primeng/button';
import { BaseTableInOut } from '../../core/app-base-io';

@Component({
  selector: 'app-at-button-component',
  imports: [ButtonModule],
  templateUrl: './at-button-component.html',
  styleUrl: './at-button-component.css',
})
export class AtButtonComponent extends BaseTableInOut {

}
