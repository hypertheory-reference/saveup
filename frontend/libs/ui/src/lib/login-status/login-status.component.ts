import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'saveup-login-status',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './login-status.component.html',
  styleUrls: ['./login-status.component.css'],
})
export class LoginStatusComponent {
  @Input({required: true}) isLoggedIn = false;
  @Input() userName = '';

  @Output() loginRequested = new EventEmitter<void>();
  @Output() logoutRequested = new EventEmitter<void>();

  onLoginRequested(): void {
    this.loginRequested.emit();
  }
  onLogoutRequested(): void {
    this.logoutRequested.emit();
  }
}
