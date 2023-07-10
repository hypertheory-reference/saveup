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
  template: `<ul>
    <li *ngFor="let kid of model">
      <p class="">
        {{ kid.name }}
        <a [routerLink]="['../child', kid.id]">
          <fa-icon [icon]="faCheck" />
        </a>
      </p>
 
    </li>
  </ul>`,
})
export class ChildListComponent {
 
  faCheck = faPenToSquare;
  @Input({ required: true }) model: ChildListModel[] = [];


  
}
