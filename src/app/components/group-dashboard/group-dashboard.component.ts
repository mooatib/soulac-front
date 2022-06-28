import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Group } from 'src/app/models/group/group.model';
import { GroupService } from 'src/app/services/group/group.service';

@Component({
  selector: 'app-group-dashboard',
  templateUrl: './group-dashboard.component.html',
  styleUrls: ['./group-dashboard.component.scss'],
})
export class GroupDashboardComponent implements OnInit {
  group: Group;
  name: string;
  isLoading = false;
  constructor(private service: GroupService, private route: ActivatedRoute) {}
  ngOnInit(): void {
    this.isLoading = true;
    this.route.params.subscribe((params) => {
      this.name = params['name'];
    });
    this.service.getGroup(this.name).subscribe({
      next: (result) => {
        this.group = result;
        this.isLoading = false;
      },
    });
  }
}
