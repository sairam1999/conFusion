import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { Routes, RouterModule } from '@angular/router';

import { MenuComponent } from './menu/menu.component';
import { DishdetailComponent } from './dishdetail/dishdetail.component';
import { HomeComponent } from './home/home.component';
import { AboutComponent } from './about/about.component';
import { ContactComponent } from './contact/contact.component';

export const routes: Routes = [
  { path: 'home',  component: HomeComponent },
  { path: 'menu',     component: MenuComponent },
  { path: '', redirectTo: '/home', pathMatch: 'full' },
  { path: 'dishdetail/:id', component: DishdetailComponent },
  { path: 'contactus',     component: ContactComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
