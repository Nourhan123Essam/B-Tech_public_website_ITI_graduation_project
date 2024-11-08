
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';
import { CommonModule } from '@angular/common';


@Component({
  selector: 'app-city-sidebar',
  templateUrl:'./city-side-bar-component.component.html',
  standalone: true,
  imports: [FormsModule, CommonModule],
  styleUrl: './city-side-bar-component.component.css'
})
export class CitySidebarComponent {
  @Input() cities: string[] = [];
  choosenCity:string = "";
  isOpen = false;

  @Output() dataSent = new EventEmitter<string>();

  sendDataToParent() {
    this.dataSent.emit(this.choosenCity); // Emit the data to the parent
  }
  openSidebar() {
    this.isOpen = true;
  }

  closeSidebar() {
    this.isOpen = false;
  }

  selectCity(city: string) {
    console.log('Selected city:', city);
    this.choosenCity = city;
    this.sendDataToParent();
    this.closeSidebar();
  }
}
