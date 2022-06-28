import { Component, Input, OnInit } from '@angular/core';
import { Group } from 'src/app/models/group/group.model';

@Component({
  selector: 'app-group-info',
  templateUrl: './group-info.component.html',
  styleUrls: ['./group-info.component.scss'],
})
export class GroupInfoComponent implements OnInit {
  @Input() group: Group;
  constructor() {}

  ngOnInit(): void {}
}
