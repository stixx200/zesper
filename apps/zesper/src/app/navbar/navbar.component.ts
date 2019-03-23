import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../auth/auth.service';

@Component({
  selector: 'zesper-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {
  @Input() title: string;

  user$ = this.userService.getCurrentUser();

  constructor(
    private readonly userService: AuthService,
    private readonly router: Router
  ) {}

  ngOnInit() {}

  logout() {
    this.userService.logout();
    this.router.navigate(['/login']);
  }
}
