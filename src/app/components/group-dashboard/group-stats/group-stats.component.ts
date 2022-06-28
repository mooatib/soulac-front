import { Component, Input, OnInit } from '@angular/core';
import { Group } from 'src/app/models/group/group.model';

@Component({
  selector: 'app-group-stats',
  templateUrl: './group-stats.component.html',
  styleUrls: ['./group-stats.component.scss'],
})
export class GroupStatsComponent implements OnInit {
  @Input() group: Group;
  constructor() {}

  ngOnInit(): void {}
}
