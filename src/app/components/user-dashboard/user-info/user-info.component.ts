import { Component, Input, OnInit } from '@angular/core';
import { Soulacais } from 'src/app/models/soulacais/soulacais.models';

@Component({
  selector: 'app-user-info',
  templateUrl: './user-info.component.html',
  styleUrls: ['./user-info.component.scss'],
})
export class UserInfoComponent implements OnInit {
  @Input() loggedSoulacais: Soulacais;
  constructor() {}

  ngOnInit(): void {}
}
