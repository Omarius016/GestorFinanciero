import { Component } from '@angular/core';
import { IndexHeaderComponent } from './components/index-header/index-header.component';
import { IndexHeroComponent } from './components/index-hero/index-hero.component';
import { IndexFeaturesComponent } from './components/index-features/index-features.component';
import { IndexReviewsComponent } from './components/index-reviews/index-reviews.component';

@Component({
  selector: 'app-index',
  standalone: true,
  imports: [IndexHeaderComponent, IndexHeroComponent,IndexFeaturesComponent, IndexReviewsComponent],
  templateUrl: './index.component.html',
  styleUrl: './index.component.css'
})
export class IndexComponent {

}
