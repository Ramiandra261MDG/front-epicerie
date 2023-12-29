import { Component } from "@angular/core";
import { Router, RouterOutlet } from "@angular/router";
import { CommonModule } from "@angular/common";
import { NzLayoutModule } from "ng-zorro-antd/layout";
import { NzMenuModule } from "ng-zorro-antd/menu";
import { NzToolTipModule } from "ng-zorro-antd/tooltip";
import { NzIconModule } from "ng-zorro-antd/icon";

@Component({
  selector: "app-root",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.css"],
  standalone: true,
  imports: [
    RouterOutlet,
    CommonModule,
    NzLayoutModule,
    NzMenuModule,
    NzToolTipModule,
    NzIconModule,
    RouterOutlet
  ]
})
export class AppComponent {
  user: boolean | undefined = false;
  isCollapsed = false;

  constructor(private router: Router) {}

  toggleCollapsed(): void {
    this.isCollapsed = !this.isCollapsed;
  }

  navigateToCaisse() {
    this.router.navigate(["/caisse"]);
  }
}
