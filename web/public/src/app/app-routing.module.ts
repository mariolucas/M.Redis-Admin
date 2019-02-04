import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { InfoComponent } from './pages/info/info.component';
import { PageNotFoundComponent } from './pages/page-not-found/page-not-found.component';
import { AppService } from './app.service';

const routes: Routes = [
  {
    path:'',
    component: HomeComponent
  },
  {
    path:'dashboard/:server',
    component: DashboardComponent
  },
  {
    path:'info/:server',
    component: InfoComponent
  },
  {
    path: '**', 
    component: PageNotFoundComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
