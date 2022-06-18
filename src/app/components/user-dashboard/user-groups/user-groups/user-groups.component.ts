import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { map, Observable, startWith } from 'rxjs';

@Component({
  selector: 'app-user-groups',
  templateUrl: './user-groups.component.html',
  styleUrls: ['./user-groups.component.scss'],
})
export class UserGroupsComponent implements OnInit {
  groupCtrl = new FormControl('');
  groups = [
    { name: 'group 1' },
    { name: 'group 2' },
    { name: 'group 3' },
    { name: 'group 4' },
    { name: 'group 5' },
    { name: 'group 6' },
  ];
  filteredGroups: Observable<any[]>;
  constructor() {}

  ngOnInit() {
    this.filteredGroups = this.groupCtrl.valueChanges.pipe(
      startWith(''),
      map((group) => (group ? this._filter(group) : this.groups.slice()))
    );
  }

  private _filter(value: any): any[] {
    const filterValue = value.toLowerCase();

    return this.groups.filter((group) =>
      group.name.toLowerCase().includes(filterValue)
    );
  }
}
