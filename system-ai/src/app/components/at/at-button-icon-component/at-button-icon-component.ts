import { Component, OnInit } from '@angular/core';
import { BaseBtnConfig } from '../../../core/base-btn-config';
import { Button } from "primeng/button";
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-at-button-icon-component',
  imports: [Button, CommonModule],
  templateUrl: './at-button-icon-component.html',
  styleUrl: './at-button-icon-component.css',
})
export class AtButtonIconComponent extends BaseBtnConfig implements OnInit {
  ngOnInit(): void {
    console.log(this.customClass);
  }

}
