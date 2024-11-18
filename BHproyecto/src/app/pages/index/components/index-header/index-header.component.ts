import { Component, Output, EventEmitter } from '@angular/core';
import { SpinnerComponent } from '../../../../shared/components/spinner/spinner.component';

@Component({
  selector: 'app-index-header',
  standalone: true,
  imports: [[SpinnerComponent]],
  templateUrl: './index-header.component.html',
  styleUrl: './index-header.component.css'
})
export class IndexHeaderComponent {
  title = 'BH Proyecto';
  isLoading = false;
  @Output() loadingStateChange = new EventEmitter<boolean>();

  onButtonClick() {
    console.log('onButtonClick');
    this.isLoading = true;
    this.loadingStateChange.emit(this.isLoading);
  }
}
