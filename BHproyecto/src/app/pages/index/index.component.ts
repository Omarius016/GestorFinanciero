import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

import { IndexHeaderComponent } from './components/index-header/index-header.component';
import { IndexHeroComponent } from './components/index-hero/index-hero.component';
import { IndexFeaturesComponent } from './components/index-features/index-features.component';
import { IndexReviewsComponent } from './components/index-reviews/index-reviews.component';
import { IndexFooterComponent } from './components/index-footer/index-footer.component';
//import { SpinnerComponent } from '../../shared/components/spinner/spinner.component';
import { SharedModule } from '../../shared/shared.module';

@Component({
  selector: 'app-index',
  standalone: true,
  imports: [CommonModule, IndexHeaderComponent, 
    IndexHeroComponent,IndexFeaturesComponent, IndexReviewsComponent, 
    IndexFooterComponent, SharedModule],
  templateUrl: './index.component.html',
  styleUrl: './index.component.css'
})
export class IndexComponent {
  isLoading = false;
  
  handleLoadingChange(isLoading: boolean) {
    this.isLoading = isLoading;
  }
}
