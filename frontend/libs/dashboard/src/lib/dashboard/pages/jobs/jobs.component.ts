import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ListComponent } from '../jobs/list/list.component';
import { CreateComponent } from '../jobs/create/create.component';

@Component({
  standalone: true,
  templateUrl: './jobs.component.html',
  styleUrls: ['./jobs.component.css'],
  imports: [CommonModule, ListComponent, CreateComponent],
})
export class JobsComponent {}
