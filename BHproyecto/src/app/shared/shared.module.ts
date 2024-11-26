import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SpinnerComponent } from './components/spinner/spinner.component';
import { AuthHeroComponent } from './components/auth-hero/auth-hero.component';



@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    SpinnerComponent,
    AuthHeroComponent
  ],
  exports: [
    SpinnerComponent, 
    AuthHeroComponent
  ]
})
export class SharedModule { }
