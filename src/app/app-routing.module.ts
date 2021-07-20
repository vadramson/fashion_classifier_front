import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {RegionsComponent} from "./regions/regions.component";
import {TownsComponent} from "./towns/towns.component";
import {AgenciesComponent} from "./agencies/agencies.component";
import {WelcomeComponent} from "./welcome/welcome.component";

const routes: Routes = [
  {path: '', component: WelcomeComponent},
  {path: 'clothing', component: RegionsComponent},
  {path: 'towns', component: TownsComponent},
  {path: 'agency', component: AgenciesComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
