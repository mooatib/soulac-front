import { Component, Input, OnInit } from '@angular/core';
import { Group } from 'src/app/models/group/group.model';
import { Page } from 'src/app/models/page.model';
import { Soulacais } from 'src/app/models/soulacais/soulacais.models';
import { GroupService } from 'src/app/services/group/group.service';

@Component({
  selector: 'app-group-users',
  templateUrl: './group-users.component.html',
  styleUrls: ['./group-users.component.scss'],
})
export class GroupUsersComponent implements OnInit {
  @Input() group: Group;
  page = new Page();
  soulacais: Soulacais[];
  constructor(private service: GroupService) {}

  ngOnInit(): void {
    if (this.group) {
      this.service.getGroupUsers(this.group.id, this.page).subscribe({
        next: (result) => {
          this.soulacais = result;
        },
      });
    }
  }
}
