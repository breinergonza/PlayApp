import { Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { StorageComponent } from './components/storage/storage.component';
import { UsuarioComponent } from './components/usuario/usuario.component';
import { TarjetasComponent } from './components/tarjetas/tarjetas.component';
import { IntencionesComponent } from './components/intenciones/intenciones.component';
import { CrearUsuarioComponent } from './components/usuario/crear-usuario/crear-usuario.component';
import { EditarUsuarioComponent } from './components/usuario/editar-usuario/editar-usuario.component';

export const appRouter: Routes = [
  { path: 'home', component: HomeComponent },
  { path: 'storage', component: StorageComponent },
  { path: 'usuario', component: UsuarioComponent },
  { path: 'tarjeta', component: TarjetasComponent },
  { path: 'usuarioCrear', component: CrearUsuarioComponent },
  { path: 'usuarioEditar/:id', component: EditarUsuarioComponent },
  { path: 'intencion', component: IntencionesComponent },
  // {
  //   path: '',
  //   runGuardsAndResolvers: 'always',
  //   canActivate: [AuthGuard],
  //   children: [
  //     { path: 'lists', component: ListsComponent },
  //     {
  //       path: 'messages',
  //       component: MessagesComponent
  //     },
  //     {
  //       path: 'members',
  //       component: MemberListComponent
  //     },
  //     {
  //       path: 'members/:id',
  //       component: MemberDetailComponent,
  //       resolve: { user: MemberDetailResolver }
  //     },
  //     {
  //       path: 'member/edit',
  //       component: MemberEditComponent,
  //       resolve: { user: MemberEditResolver }
  //     }
  //   ]
  // },
  { path: '**', redirectTo: 'home', pathMatch: 'full' }
];
