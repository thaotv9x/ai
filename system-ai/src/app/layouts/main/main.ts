import { Component } from '@angular/core';
import { Header } from "../header/header";
import { Sidebar } from "../sidebar/sidebar";
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-main',
  imports: [Header, Sidebar, RouterOutlet, CommonModule, ReactiveFormsModule],
  templateUrl: './main.html',
  styleUrl: './main.css',
})
export class MainComponent {

  isSidebarVisible = true;
  
}
