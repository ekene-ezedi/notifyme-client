import { enableProdMode } from '@angular/core';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';

import { AppModule } from './app/app.module';
import { environment } from './environments/environment';

if (environment.production) {
  enableProdMode();
}

platformBrowserDynamic().bootstrapModule(AppModule)
//   .then(()=>{
// // Check that service workers are supported
//   if ('serviceWorker' in navigator) {
//     // Use the window load event to keep the page load performant
//     console.log("FROM MAIN TS WITH SUCCESS")
//     window.addEventListener('load', () => {
//       navigator.serviceWorker.register('sw.js');
//     });
//   }else{
//     console.log("FROM MAIN TS WITH ERROR")
//   }
//   })
  .catch(err => console.error(err));
