import { Component, OnInit } from '@angular/core';
import { Soulacais } from 'src/app/models/soulacais/soulacais.models';
import { SoulacaisService } from 'src/app/services/soulacais/soulacais.service';

@Component({
  selector: 'app-user-dashboard',
  templateUrl: './user-dashboard.component.html',
  styleUrls: ['./user-dashboard.component.scss'],
})
export class UserDashboardComponent implements OnInit {
  loggedSoulacais: Soulacais;
  constructor(private soulacaisService: SoulacaisService) {
    this.getLoggedInSoulacais();
  }
  ngOnInit(): void {}

  getLoggedInSoulacais(): void {
    this.loggedSoulacais = this.soulacaisService.getLoggedInSoulacais();
  }
}
