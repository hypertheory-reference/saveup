import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { Store } from '@ngrx/store';
import { AgePipe } from '@saveup/utils';
import { selectChildrenListmodel } from '../../../state/children';

@Component({
  selector: 'saveup-list',
  standalone: true,
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css'],
  imports: [CommonModule, AgePipe, RouterLink],
})
export class ListComponent {
  children = inject(Store).selectSignal(selectChildrenListmodel);
}
