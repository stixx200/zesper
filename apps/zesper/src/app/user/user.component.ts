import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth/auth.service';

@Component({
  selector: 'zesper-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent implements OnInit {
  user$ = this.userService.getCurrentUser();

  constructor(private readonly userService: AuthService) {}

  ngOnInit() {}
}
