import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { FormComponent } from './form/form.component';
import { LocationComponent } from './location/location.component';

const routes: Routes = [
  {
    path:"",component:FormComponent
  },{
    path:"loc",component:LocationComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
