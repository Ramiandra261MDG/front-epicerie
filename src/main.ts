import { platformBrowserDynamic } from "@angular/platform-browser-dynamic";

import { importProvidersFrom } from "@angular/core";
import { AppComponent } from "./app/app.component";
import { provideRouter, Routes } from "@angular/router";
import { provideAnimations } from "@angular/platform-browser/animations";
import {
  withInterceptorsFromDi,
  provideHttpClient
} from "@angular/common/http";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { BrowserModule, bootstrapApplication } from "@angular/platform-browser";
import { NZ_I18N, fr_FR } from "ng-zorro-antd/i18n";

const routes: Routes = [
  {
    path: "",
    loadComponent: () =>
      import("./app/component/auth/login/login.component").then(
        m => m.LoginComponent
      )
  },
  {
    path: "caisse",
    loadComponent: () =>
      import("./app/component/item/item-box/item-box.component").then(
        m => m.ItemBoxComponent
      )
  },
  {
    path: "table",
    loadComponent: () =>
      import("./app/component/table/test/test.component").then(
        m => m.NzDemoTableSortFilterComponent
      )
  }
];

bootstrapApplication(AppComponent, {
  providers: [
    importProvidersFrom(BrowserModule, FormsModule, ReactiveFormsModule),
    { provide: NZ_I18N, useValue: fr_FR },
    provideHttpClient(withInterceptorsFromDi()),
    provideAnimations(),
    provideRouter(routes)
  ]
}).catch(err => console.error(err));
