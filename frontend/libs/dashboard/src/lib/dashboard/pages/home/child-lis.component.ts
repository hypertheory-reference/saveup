import { Component, Input } from '@angular/core';
import { ChildListModel } from '../../models';
import { CurrencyPipe, NgFor } from '@angular/common';

@Component({
  selector: 'saveup-child-list',
  imports: [NgFor, CurrencyPipe],
  standalone: true,
  template: ` <ul>
    <li *ngFor="let kid of model">
      {{ kid.name }} ({{ kid.weeklyAllowance | currency }}/week)
    </li>
  </ul>`,
})
export class ChildListComponent {
  @Input({ required: true }) model: ChildListModel[] = [];
}
