import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Soulacais } from 'src/app/models/soulacais/soulacais.models';
import { SoulacaisService } from 'src/app/services/soulacais/soulacais.service';
import { UserService } from 'src/app/services/user/user.service';
import { UserSettingsComponent } from '../user-settings/user-settings.component';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit {
  constructor(
    private service: UserService,
    private soulacaisService: SoulacaisService,
    public dialog: MatDialog
  ) {}
  loggedSoulacais: Soulacais = new Soulacais();

  ngOnInit(): void {
    if (this.checkIsLogged())
      this.loggedSoulacais = this.soulacaisService.getLoggedInSoulacais();
  }

  checkIsLogged(): boolean {
    return (
      this.service.isUserLogged() &&
      this.soulacaisService.loggedInUser != undefined
    );
  }
  openDialog(): void {
    const dialogRef = this.dialog.open(UserSettingsComponent, {
      width: '40%',
      data: { loggedSoulacais: this.loggedSoulacais },
    });
  }
}
