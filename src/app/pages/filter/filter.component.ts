import {Component, EventEmitter, Output} from '@angular/core';
import {MatFormField, MatInput, MatLabel} from '@angular/material/input';
import {FormBuilder, FormGroup, ReactiveFormsModule} from '@angular/forms';

@Component({
  selector: 'app-filter',
  imports: [
    MatFormField,
    MatInput,
    MatLabel,
    ReactiveFormsModule,

  ],
  templateUrl: './filter.component.html',
  styleUrl: './filter.component.scss'
})
export class FilterComponent {
  filterForm: FormGroup;
  @Output() filterChanged = new EventEmitter<string>();

  constructor(private fb: FormBuilder) {
    this.filterForm = this.fb.group({
      search: ['']
    });
    this.filterForm.get('search')?.valueChanges.subscribe(value => {
      this.filterChanged.emit(value);
    });
  }


}
