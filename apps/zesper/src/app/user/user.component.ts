import { Component, OnInit } from '@angular/core';
import { UserService } from './user.service';

@Component({
  selector: 'zesper-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.scss'],
})
export class UserComponent implements OnInit {
  currentUser$ = this.userService.currentUser$;

  constructor(private readonly userService: UserService) {}

  ngOnInit() {}

  update() {
  }

  delete() {
    this.userService.delete();
  }
}
