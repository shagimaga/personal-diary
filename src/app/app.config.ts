import { ApplicationConfig, importProvidersFrom } from '@angular/core';
import { provideRouter } from '@angular/router';
import {AngularFireModule} from '@angular/fire/compat'
import { getFirestore, provideFirestore } from '@angular/fire/firestore';
import {  } from '@angular/fire/compat/database';

import { routes } from './app.routes';
import { environment } from '../environments/environment';

export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(routes),
    importProvidersFrom(AngularFireModule.initializeApp(environment.firebase)),
    
    importProvidersFrom(
      provideFirestore(() => getFirestore())
    )
  ]
};
