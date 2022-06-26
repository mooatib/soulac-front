import { Component, OnInit } from '@angular/core';
import { SoulacaisService } from 'src/app/services/soulacais/soulacais.service';
import { UserService } from 'src/app/services/user/user.service';

@Component({
  selector: 'app-drink-button',
  templateUrl: './drink-button.component.html',
  styleUrls: ['./drink-button.component.scss'],
})
export class DrinkButtonComponent implements OnInit {
  constructor(
    private userService: UserService,
    private soulacaisService: SoulacaisService
  ) {}

  ngOnInit(): void {}
  checkIsLogged(): boolean {
    return (
      this.userService.isUserLogged() &&
      this.soulacaisService.loggedInUser != undefined
    );
  }
}
