import { Component, Input, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { firstValueFrom, map, Observable, startWith } from 'rxjs';
import { Group } from 'src/app/models/group/group.model';
import { Page } from 'src/app/models/page.model';
import { Soulacais } from 'src/app/models/soulacais/soulacais.models';
import { SoulacaisService } from 'src/app/services/soulacais/soulacais.service';

@Component({
  selector: 'app-user-groups',
  templateUrl: './user-groups.component.html',
  styleUrls: ['./user-groups.component.scss'],
})
export class UserGroupsComponent implements OnInit {
  page = new Page();
  groupCtrl = new FormControl('');
  groups: Group[];
  filteredGroups: Observable<Group[]>;
  @Input() loggedSoulacais: Soulacais;
  constructor(private service: SoulacaisService) {}

  ngOnInit() {
    firstValueFrom(
      this.service.getSoulacaisGroups(this.loggedSoulacais.id, this.page)
    ).then((result) => {
      this.groups = result;
      this.searchFilterInit();
    });
  }

  private filter(value: any): any[] {
    const filterValue = value.toLowerCase();

    return this.groups.filter((group) =>
      group.name.toLowerCase().includes(filterValue)
    );
  }

  private searchFilterInit() {
    this.filteredGroups = this.groupCtrl.valueChanges.pipe(
      startWith(''),
      map((group) => (group ? this.filter(group) : this.groups.slice()))
    );
  }
}
