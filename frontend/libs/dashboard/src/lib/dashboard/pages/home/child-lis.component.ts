import { Component, Input, signal } from '@angular/core';
import { ChildListModel } from '../../models';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { CurrencyPipe, NgFor, NgIf } from '@angular/common';
import { AgePipe } from '@saveup/utils';
import { faPenToSquare } from '@fortawesome/free-solid-svg-icons';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';
@Component({
  selector: 'saveup-child-list',
  imports: [
    NgFor,
    NgIf,
    RouterLink,
    CurrencyPipe,
    AgePipe,
    FontAwesomeModule,
    ReactiveFormsModule,
  ],
  standalone: true,
  template: ` <ul>
    <li *ngFor="let kid of model" class="card card-compact">
      <p class="card-title">
        {{ kid.name }}
        <a [routerLink]="['../child', kid.id]">
          <fa-icon [icon]="faCheck" />
        </a>
      </p>
      <div class="card-body">
        <p *ngIf="kid.birthDate">Age: {{ kid.birthDate! | dateToAgePipe }}</p>

        Weekly Allowance: {{ kid.weeklyAllowance | currency }}/week
      </div>
    </li>
  </ul>`,
})
export class ChildListComponent {
  editingBirthdate = signal(false);
  editingAllowance = signal(false);
  faCheck = faPenToSquare;
  @Input({ required: true }) model: ChildListModel[] = [];

  birthDateForm = new FormGroup({
    birthDate: new FormControl(''),
  });

  editBirthdate(e: boolean, kid?: ChildListModel) {
    this.editingBirthdate.set(e);
    if (e && kid?.birthDate) {
      this.birthDateForm.patchValue({ birthDate: kid.birthDate });
    } else {
      this.birthDateForm.reset();
    }
  }
}
