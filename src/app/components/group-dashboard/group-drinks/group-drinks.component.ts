import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { Drink } from 'src/app/models/drink/drink.model';
import { Group } from 'src/app/models/group/group.model';
import { Page } from 'src/app/models/page.model';
import { GroupService } from 'src/app/services/group/group.service';

@Component({
  selector: 'app-group-drinks',
  templateUrl: './group-drinks.component.html',
  styleUrls: ['./group-drinks.component.scss'],
})
export class GroupDrinksComponent implements OnInit {
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @Input() group: Group;
  isLoading = false;
  page = new Page();
  drinks: Drink[];
  totalDrinks: number = 0;
  constructor(private service: GroupService) {}

  ngOnInit(): void {
    this.getGroupDrinks();
  }

  getGroupDrinks() {
    if (this.group) {
      this.isLoading = true;
      this.service.getGroupDrinks(this.group.id, this.page).subscribe({
        next: (result) => {
          this.drinks = result;
          this.isLoading = false;
        },
      });
    }
  }

  pageChanged(event: PageEvent) {
    this.page.limit = event.pageSize;
    this.page.nbr = event.pageIndex;
    this.getGroupDrinks();
  }

  applySearchFilter(event: Event) {
    this.page.nbr = 0;
    this.page.search = (event.target as HTMLInputElement).value;
    this.ngOnInit();
  }
}
