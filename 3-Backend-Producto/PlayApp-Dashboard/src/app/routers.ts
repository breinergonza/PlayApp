import { Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { StorageComponent } from './components/storage/storage.component';
import { UsuarioComponent } from './components/usuario/usuario.component';
import { IntencionesComponent } from './components/intenciones/intenciones.component';
import { CrearUsuarioComponent } from './components/usuario/crear-usuario/crear-usuario.component';
import { EditarUsuarioComponent } from './components/usuario/editar-usuario/editar-usuario.component';
import { EditarUsuarioResolve } from './resolvers/editar-usuario.resolve';
import { UsuarioResolve } from './resolvers/usuario.resolve';
import { DominioComponent } from './components/dominio/dominio.component';
import { EditarDominioComponent } from './components/dominio/editar-dominio/editar-dominio.component';
import { CrearDominioComponent } from './components/dominio/crear-dominio/crear-dominio.component';
import { DominioResolve } from './resolvers/dominio.resolve';
import { EditarDominioResolve } from './resolvers/editar-dominio.resolve';
import { CrearIntencionComponent } from './components/intenciones/crear-intencion/crear-intencion.component';
import { IntencionResolve } from './resolvers/intencion.resolve';
import { EditarIntencionComponent } from './components/intenciones/editar-intencion/editar-intencion.component';
import { LoginComponent } from './login/login.component';

export const appRouter: Routes = [
  { path: 'home', component: HomeComponent },
  { path: 'storage', component: StorageComponent },
  {
    path: 'usuario',
    component: UsuarioComponent,
    resolve: { usuarios: UsuarioResolve }
  },
  {
    path: 'dominio',
    component: DominioComponent,
    resolve: { dominios: DominioResolve }
  },
  { path: 'dominio-nuevo', component: CrearDominioComponent },
  {
    path: 'dominio-editar/:id',
    component: EditarDominioComponent,
    resolve: { dominio: EditarDominioResolve }
  },
  {
    path: 'usuarioCrear',
    component: CrearUsuarioComponent
  },
  {
    path: 'usuarioEditar/:id',
    component: EditarUsuarioComponent,
    resolve: { usuario: EditarUsuarioResolve }
  },

  {
    path: 'intencion',
    component: IntencionesComponent,
    resolve: { intencion: IntencionResolve }
  },
  {
    path: 'intencion-editar/:id',
    component: EditarIntencionComponent
  },
  {
    path: 'intencion-nuevo',
    component: CrearIntencionComponent,
    resolve: {
      dominios: DominioResolve,
      intenciones: IntencionResolve
    }
  },
  { path: 'login', component: LoginComponent },

  { path: '**', redirectTo: 'login', pathMatch: 'full' }
];
