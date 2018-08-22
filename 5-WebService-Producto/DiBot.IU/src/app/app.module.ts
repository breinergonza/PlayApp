import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { NavComponent } from './components/nav/nav.component';
import { FooterComponent } from './components/footer/footer.component';
import { HomeComponent } from './components/home/home.component';
import { appRouter } from './routers';
import { RouterModule } from '@angular/router';
import { HttpModule } from '@angular/http';
import { FormsModule } from '@angular/forms';
import { UsuarioComponent } from './components/usuario/usuario.component';
import { TarjetasComponent } from './components/tarjetas/tarjetas.component';
import { IntencionesComponent } from './components/intenciones/intenciones.component';
import { StorageComponent } from './components/storage/storage.component';
import { AlertifyService } from './services/alertify.service';
import { EditarUsuarioComponent } from './components/usuario/editar-usuario/editar-usuario.component';
import { CrearUsuarioComponent } from './components/usuario/crear-usuario/crear-usuario.component';
import { DataTablesModule } from 'angular-datatables';
import { UsuarioService } from './services/usuario.service';

@NgModule({
  declarations: [
    AppComponent,
    NavComponent,
    FooterComponent,
    HomeComponent,
    UsuarioComponent,
    TarjetasComponent,
    IntencionesComponent,
    StorageComponent,
    EditarUsuarioComponent,
    CrearUsuarioComponent
  ],
  imports: [
    BrowserModule,
    HttpModule,
    FormsModule,
    RouterModule.forRoot(appRouter),
    DataTablesModule
  ],
  providers: [AlertifyService, UsuarioService],
  bootstrap: [AppComponent]
})
export class AppModule {}
