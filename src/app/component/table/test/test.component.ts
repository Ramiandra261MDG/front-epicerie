import { CommonModule } from "@angular/common";
import { Component, OnInit } from "@angular/core";
import { NzTableModule } from "ng-zorro-antd/table";
import { NzTableSortFn, NzTableSortOrder } from "ng-zorro-antd/table";
import { NzPaginationModule } from "ng-zorro-antd/pagination";
import { ItemService } from "../../_services/item.service";
import { NzSpinModule } from "ng-zorro-antd/spin";

interface Iitem {
  id: number;
  name: string;
  price: number;
}

interface ColumnItem {
  name: string;
  sortOrder: NzTableSortOrder | null;
  sortFn: NzTableSortFn<Iitem> | null;
  sortDirections: NzTableSortOrder[];
}

@Component({
  selector: "nz-demo-table-sort-filter",
  standalone: true,
  imports: [NzTableModule, CommonModule, NzPaginationModule, NzSpinModule],
  template: `
  <nz-spin [nzSpinning]="loading">
    <nz-table #itemTable 
    nzBordered 
    [nzData]="data" 
    [nzFrontPagination]="false" 
    [nzTotal]="totalItems" 
    [nzPageIndex]="currentPage" 
    [nzPageSize]="10"
    [nzScroll]="{ y: '400px' }" 
    (nzPageIndexChange)="handlePageIndexChange($event)"
    nzTableLayout="fixed">
      <thead>
        <tr>
          <th
            *ngFor="let column of listOfColumns"
            [nzSortOrder]="column.sortOrder"
            [nzSortFn]="column.sortFn"
            [nzSortDirections]="column.sortDirections"
            [nzWidth]="column.name === 'Prix' ? '200px' : null"
          >
            {{ column.name }}
          </th>
          <th>Action</th>
        </tr>
      </thead>
      <tbody>
        <tr *ngFor="let data of itemTable.data">
          <td>{{ data.name }}</td>
          <td>{{ data.price | number : "1.2-2" }} Ariary</td>
          <td>
              <a>Ajouter</a>
          </td>
        </tr>
      </tbody>
    </nz-table>
  </nz-spin>
    `
})
export class NzDemoTableSortFilterComponent implements OnInit {
  data: Iitem[];
  currentPage = 1;
  totalItems: number;
  loading: boolean;

  ngOnInit(): void {
    this.getAllItems();
  }

  constructor(private itemService: ItemService) {}

  getAllItems() {
    this.loading = true;
    this.itemService.get(this.currentPage).subscribe({
      next: res => {
        this.data = res.items.data;
        this.totalItems = res.items.total;
        console.log(this.data);
      },
      complete: () => {
        this.loading = false;
      }
    });
  }

  listOfColumns: ColumnItem[] = [
    {
      name: "Nom du produit",
      sortOrder: "ascend",
      sortFn: (a: Iitem, b: Iitem) => a.name.localeCompare(b.name),
      sortDirections: ["ascend", "descend"]
    },
    {
      name: "Prix",
      sortOrder: null,
      sortFn: (a: Iitem, b: Iitem) => a.price - b.price,
      sortDirections: ["ascend", "descend"]
    }
  ];

  handlePageIndexChange(pageIndex: number) {
    this.currentPage = pageIndex;
    this.getAllItems();
  }
}
