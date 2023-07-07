import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { AgePipe } from '@saveup/utils';
import { CreateComponent } from './create/create.component';
import { ListComponent } from './list/list.component';
import { RouterOutlet } from '@angular/router';

@Component({
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    AgePipe,
    CreateComponent,
    ListComponent,
    RouterOutlet
  ],
  templateUrl: './children.component.html',
  styleUrls: ['./children.component.css'],
})
export class ChildrenComponent {
}
