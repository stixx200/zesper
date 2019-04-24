import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Apollo } from 'apollo-angular';
import { UserService } from '../user/user.service';

@Component({
  selector: 'zesper-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss'],
})
export class NavbarComponent implements OnInit {
  @Input() title: string;

  currentUser$ = this.userService.currentUser$;

  constructor(
    private readonly apollo: Apollo,
    private readonly router: Router,
    private readonly userService: UserService,
  ) {
  }

  ngOnInit() {}

  logout() {
    this.userService.logout();
    this.router.navigate(['/login']);
  }
}
