import { RenderMode, ServerRoute } from '@angular/ssr';

export const serverRoutes: ServerRoute[] = [
  {
    path: '**',
    renderMode: RenderMode.Client // https://blog.ninja-squad.com/2024/11/19/what-is-new-angular-19.0/
  }



];
