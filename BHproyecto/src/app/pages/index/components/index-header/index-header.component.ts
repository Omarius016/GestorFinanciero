import { Component, Output, EventEmitter } from '@angular/core';
//import { SpinnerComponent } from '../../../../shared/components/spinner/spinner.component';
import { Router} from '@angular/router';
@Component({
  selector: 'app-index-header',
  standalone: true,
  imports: [],
  templateUrl: './index-header.component.html',
  styleUrl: './index-header.component.css'
})
export class IndexHeaderComponent {
  title = 'BH Proyecto';
  isLoading = false;
  @Output() loadingStateChange = new EventEmitter<boolean>();
  constructor(private router: Router) {}
  onButtonClick() {
    console.log('onButtonClick');
    this.isLoading = true;
    this.loadingStateChange.emit(this.isLoading);

    // Después de 2 segundos, desactivar el spinner
    setTimeout(() => {
      this.isLoading = false;
      this.loadingStateChange.emit(this.isLoading);
      this.router.navigate(['/login']);
    }, 1000); 
  }

}
