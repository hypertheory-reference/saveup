import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { Store } from '@ngrx/store';
import { selectJobsListModel } from '../../../state';

@Component({
  selector: 'saveup-list',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css'],
})
export class ListComponent {
  jobs = inject(Store).selectSignal(selectJobsListModel);
}
