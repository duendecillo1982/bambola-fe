import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HeroesComponent } from './heroes/heroes.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { HeroDetailComponent } from './hero-detail/hero-detail.component';
import { CustomersComponent } from './customers/customers.component';
import { CustomerDetailComponent } from './customer-detail/customer-detail.component';
import { CustomerEditorComponent } from './customer-editor/customer-editor.component';
import { SearchCustomerComponent } from './search-customer/search-customer.component';

const routes: Routes = [
  { path: 'detail/:id', component: HeroDetailComponent },
  { path: '', redirectTo: '/searchcustomer', pathMatch: 'full' },
  { path: 'dashboard', component: DashboardComponent },
  { path: 'heroes', component: HeroesComponent },
  { path: 'customers', component: CustomersComponent },
  { path: 'customers/:id', component: CustomerDetailComponent },
  { path: 'customers/:id/edit', component: CustomerEditorComponent },
  { path: 'searchcustomer', component: SearchCustomerComponent }
];

@NgModule({
  imports: [ RouterModule.forRoot(routes) ],
  exports: [ RouterModule ]
})
export class AppRoutingModule {}
