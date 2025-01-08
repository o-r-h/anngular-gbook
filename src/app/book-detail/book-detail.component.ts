import { ChangeDetectionStrategy, Component } from '@angular/core';
import { CarouselModule } from 'ngx-bootstrap/carousel';
@Component({
  selector: 'app-book-detail',
  imports: [CarouselModule],
  templateUrl: './book-detail.component.html',
  styleUrl: './book-detail.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class BookDetailComponent {

  lines= ['Free shipping on orders over $50', 'Free returns', 'Free in-store pickup'];

}
