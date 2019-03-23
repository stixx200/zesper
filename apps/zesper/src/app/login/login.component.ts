import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../auth/auth.service';

@Component({
  selector: 'zesper-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  username: string;
  password: string;
  showSpinner = false;

  constructor(
    private readonly userService: AuthService,
    private readonly router: Router
  ) {}

  ngOnInit() {}

  login(loginForm: NgForm) {
    // stop here if form is invalid
    if (loginForm.invalid) {
      return;
    }

    this.showSpinner = true;
    this.userService.login(this.username, this.password).subscribe(
      () => {
        this.showSpinner = false;
        this.router.navigate(['/orders']);
      },
      () => {
        this.showSpinner = false;
      }
    );
  }
}
