import { Component } from "@angular/core";
import { NzGridModule } from "ng-zorro-antd/grid";
import { NzCardModule } from "ng-zorro-antd/card";
import { NzFormModule } from "ng-zorro-antd/form";
import { NzInputModule } from "ng-zorro-antd/input";
import { NzButtonModule } from "ng-zorro-antd/button";

@Component({
  selector: "app-login",
  templateUrl: "./login.component.html",
  styleUrls: ["./login.component.css"],
  standalone: true,
  imports: [
    NzGridModule,
    NzCardModule,
    NzFormModule,
    NzInputModule,
    NzButtonModule,
  ],
})
export class LoginComponent {}
