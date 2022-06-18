import { Component, Input, OnInit } from '@angular/core';
import { Soulacais } from 'src/app/models/soulacais/soulacais.models';

@Component({
  selector: 'app-user-drinks',
  templateUrl: './user-drinks.component.html',
  styleUrls: ['./user-drinks.component.scss'],
})
export class UserDrinksComponent implements OnInit {
  @Input() loggedSoulacais: Soulacais;
  constructor() {}

  ngOnInit(): void {}
}
