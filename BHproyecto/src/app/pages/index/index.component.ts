import { Component } from '@angular/core';
import { IndexHeaderComponent } from './components/index-header/index-header.component';
import { IndexHeroComponent } from './components/index-hero/index-hero.component';
@Component({
  selector: 'app-index',
  standalone: true,
  imports: [IndexHeaderComponent, IndexHeroComponent],
  templateUrl: './index.component.html',
  styleUrl: './index.component.css'
})
export class IndexComponent {

}
