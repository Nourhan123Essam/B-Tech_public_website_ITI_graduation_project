import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-select-checkbox',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './select-checkbox.component.html',
  styleUrl: './select-checkbox.component.css'
})
export class SelectCheckboxComponent {
  @Input() title: string = "";
  @Input() dataEntity: string[] = [];
  @Input() selectEntity: string | null = null;
  @Output() filterValue = new EventEmitter<string | null>();

  onDataChange(item: string): void {
    this.selectEntity = item === this.selectEntity ? null : item;
    this.filterValue.emit(this.selectEntity);
  }
}
