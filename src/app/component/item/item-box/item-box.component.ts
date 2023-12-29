import { Component, OnInit } from "@angular/core";
import { CommonModule } from "@angular/common";
import jsPDF from "jspdf";
import html2canvas from "html2canvas";
import { NzGridModule } from "ng-zorro-antd/grid";
import { NzTableModule } from "ng-zorro-antd/table";
import { ItemService } from "../../_services/item.service";
import { NzDividerModule } from "ng-zorro-antd/divider";
import {
  NzTableFilterFn,
  NzTableFilterList,
  NzTableSortFn,
  NzTableSortOrder
} from "ng-zorro-antd/table";
import { Iitem } from "../../_models/item";
import { NzSpinModule } from "ng-zorro-antd/spin";
import { NzButtonModule } from "ng-zorro-antd/button";
import { NzInputModule } from "ng-zorro-antd/input";
import { Ticket } from "../../_models/ticket";
import { NzIconModule } from "ng-zorro-antd/icon";
import { FormsModule } from "@angular/forms";

interface ColumnItem {
  name: string;
  sortOrder: NzTableSortOrder | null;
  sortFn: NzTableSortFn<Iitem> | null;
  sortDirections: NzTableSortOrder[];
}

@Component({
  selector: "app-item-box",
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    NzGridModule,
    NzTableModule,
    NzDividerModule,
    NzSpinModule,
    NzButtonModule,
    NzInputModule,
    NzIconModule
  ],
  templateUrl: "./item-box.component.html",
  styleUrls: ["./item-box.component.css"]
})
export class ItemBoxComponent implements OnInit {
  data: Iitem[];
  currentPage = 1;
  totalItems: number;
  loading: boolean;
  itemToAdd: Ticket;
  clientTicket: Ticket[] = [];
  clientPay: number;

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

  addToTicket(i: Iitem) {
    const ticketToValidate: Ticket = {
      name: i.name,
      price: i.price,
      qte: i.quantity,
      totalPrice: i.price * i.quantity
    };
    this.clientTicket.push(ticketToValidate);
    console.log(this.clientTicket);

    i.quantity = 0;
    let totaux = 0;
    this.clientTicket.forEach((el, i) => {
      totaux += el.totalPrice;
    });
    this.clientPay = totaux;
  }

  cancelItemTicket(index: number) {
    console.log(index);
    this.clientTicket.splice(index, 1);

    let totaux = 0;
    this.clientTicket.forEach((el, i) => {
      totaux += el.totalPrice;
    });
    this.clientPay = totaux;
    console.log(this.clientTicket);
  }

  public exportToPDF() {
    const data = document.getElementById("divToExport") as HTMLElement;
    html2canvas(data).then(canvas => {
      const imgWidth = 208; // la largeur que vous voulez pour l'image dans le PDF
      const pageHeight = 295; // la hauteur d'une page A4 en mm
      const imgHeight = canvas.height * imgWidth / canvas.width;
      const heightLeft = imgHeight;

      const contentDataURL = canvas.toDataURL("image/png");
      let pdf = new jsPDF("p", "mm", "a4"); // crée une nouvelle instance jsPDF
      let position = 0;
      pdf.addImage(contentDataURL, "PNG", 0, position, imgWidth, imgHeight);
      pdf.save("MYPdf.pdf"); // génère un PDF et l'ouvre dans une nouvelle fenêtre
    });
  }
}
