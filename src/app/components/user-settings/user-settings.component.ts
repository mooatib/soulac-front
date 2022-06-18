import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { Soulacais } from 'src/app/models/soulacais/soulacais.models';
import { UserService } from 'src/app/services/user/user.service';
@Component({
  selector: 'app-user-settings',
  templateUrl: './user-settings.component.html',
  styleUrls: ['./user-settings.component.scss'],
})
export class UserSettingsComponent {
  constructor(
    private service: UserService,
    private router: Router,
    public dialogRef: MatDialogRef<UserSettingsComponent>,
    @Inject(MAT_DIALOG_DATA) public data: Soulacais
  ) {}
  loggedSoulacais: Soulacais = this.data;

  onNoClick(): void {
    this.dialogRef.close();
  }

  logout(): void {
    this.onNoClick();
    this.service.logout();
    this.router.navigate(['/login']);
  }
}
