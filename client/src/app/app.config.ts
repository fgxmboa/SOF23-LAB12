import { ApplicationConfig, provideZoneChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';
import { provideHttpClient } from '@angular/common/http';

import { LoginComponent } from './components/login/login.component';
import { PerfilComponent } from './components/perfil/perfil.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { FacturasComponent } from './components/facturas/facturas.component';
import { FacturasFormComponent } from './components/facturas/facturas-form/facturas-form.component';

import { routes } from './app.routes';

export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter([
      { path: '', redirectTo: 'login', pathMatch: 'full' }, // Ruta inicial redirige a login
      { path: 'login', component: LoginComponent },
      { path: 'perfil', component: PerfilComponent },
      { path: 'dashboard', component: DashboardComponent },
      { path: 'dashboard/facturas', component: FacturasComponent },
      { path: 'dashboard/facturas/form', component: FacturasFormComponent}
    ]),
    provideHttpClient()
  ]
};
