import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { HeaderAppComponent } from '../shared/header-app/header-app.component';
import { SearchBarComponent } from '../shared/search-bar/search-bar.component';
import { BookCarouselComponent } from '../shared/book-carousel/book-carousel.component';
import { OneAdvSectionComponent } from '../shared/one-adv-section/one-adv-section.component';
import { TwoAdvSectionComponent } from '../shared/two-adv-section/two-adv-section.component';

/**
 * Clase que dibuja el resto de los componentes
 *
 * @see {@link https://angular.io/api/common/http/HttpInterceptor. }
 *
 * @author Omar Rodriguez <omar.jesus.rodriguez@gmail.com>
 */
@Component({
  selector: 'app-landing-page',
  imports: [HeaderAppComponent,
            SearchBarComponent,
            BookCarouselComponent,
            OneAdvSectionComponent,
            TwoAdvSectionComponent],
  templateUrl: './landing-page.component.html',
  styleUrl: './landing-page.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LandingPageComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {

  }



}
