import { Component, Input, signal } from '@angular/core';
import { ChildListModel } from '../../models';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { CurrencyPipe, NgFor, NgIf } from '@angular/common';
import { AgePipe } from '@saveup/utils';
@Component({
  selector: 'saveup-child-list',
  imports: [NgFor, NgIf, CurrencyPipe, AgePipe, FontAwesomeModule],
  standalone: true,
  template: ` <ul>
    <li *ngFor="let kid of model" class="card card-compact">
      <p class="card-title">{{ kid.name }}</p>
      <div class="card-body">
        <p *ngIf="kid.birthDate">
          Age: {{ kid.birthDate! | dateToAgePipe }}
          <button (click)="editBirthdate(true)">
            <i class="fa-solid fa-pen-to-square"></i>
          </button>
        </p>
        <div *ngIf="editingBirthdate()">
          <p>edit the birthdate</p>
          <button (click)="editBirthdate(false)">Cancel</button>
        </div>
        Weekly Allowance: {{ kid.weeklyAllowance | currency }}/week
      </div>
    </li>
  </ul>`,
})
export class ChildListComponent {
  editingBirthdate = signal(false);
  editingAllowance = signal(false);
  @Input({ required: true }) model: ChildListModel[] = [];
  editBirthdate(e: boolean) {
    this.editingBirthdate.set(e);
  }
}
