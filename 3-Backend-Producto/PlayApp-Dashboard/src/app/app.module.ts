import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule } from '@angular/router';
import { DataTablesModule } from 'angular-datatables';
import { AngularFireModule } from 'angularfire2';
import { AngularFireAuthModule } from 'angularfire2/auth';
import { AngularFirestoreModule } from 'angularfire2/firestore';
import { AngularFireStorageModule } from 'angularfire2/storage';
import { FileUploadModule } from 'ng2-file-upload';

import { environment } from '../environments/environment';
import { AppComponent } from './app.component';
import { CrearDominioComponent } from './components/dominio/crear-dominio/crear-dominio.component';
import { DominioComponent } from './components/dominio/dominio.component';
import { EditarDominioComponent } from './components/dominio/editar-dominio/editar-dominio.component';
import { FooterComponent } from './components/footer/footer.component';
import { HomeComponent } from './components/home/home.component';
import { CrearIntencionComponent } from './components/intenciones/crear-intencion/crear-intencion.component';
import { OpcionesComponent } from './components/intenciones/crear-intencion/Opciones/Opciones.component';
import { PreguntasComponent } from './components/intenciones/crear-intencion/preguntas/preguntas.component';
import { TarjetasRespuestaComponent } from './components/intenciones/crear-intencion/tarjetas-respuesta/tarjetas-respuesta.component';
import { EditarIntencionComponent } from './components/intenciones/editar-intencion/editar-intencion.component';
import { IntencionesComponent } from './components/intenciones/intenciones.component';
import { NavComponent } from './components/nav/nav.component';
import { StorageComponent } from './components/storage/storage.component';
import { TarjetaBasicaComponent } from './components/tarjeta-basica/tarjeta-basica.component';
import { TarjetasAudioComponent } from './components/tarjetas-audio/tarjetas-audio.component';
import { TarjetasListComponent } from './components/tarjetas-list/tarjetas-list.component';
import { TarjetasVideoComponent } from './components/tarjetas-video/tarjetas-video.component';
import { TarjetasComponent } from './components/tarjetas/tarjetas.component';
import { UploadFileComponent } from './components/upload-file/upload-file.component';
import { CrearUsuarioComponent } from './components/usuario/crear-usuario/crear-usuario.component';
import { EditarUsuarioComponent } from './components/usuario/editar-usuario/editar-usuario.component';
import { UsuarioComponent } from './components/usuario/usuario.component';
import { DominioResolve } from './resolvers/dominio.resolve';
import { EditarDominioResolve } from './resolvers/editar-dominio.resolve';
import { EditarUsuarioResolve } from './resolvers/editar-usuario.resolve';
import { IntencionResolve } from './resolvers/intencion.resolve';
import { UsuarioResolve } from './resolvers/usuario.resolve';
import { appRouter } from './routers';

import { AlertifyService } from './services/alertify.service';
import { DominioService } from './services/dominio.service';
import { FirebaseService } from './services/firebase.service';
import { IntencionService } from './services/intencion.service';
import { TarjetasService } from './services/tarjetas.service';
import { UploadFileService } from './services/upload-file.service';
import { UsuarioService } from './services/usuario.service';
import { TarjetaResolve } from './resolvers/tarjeta.resolve';
import { LoginComponent } from './login/login.component';

// import { IntencionComponent } from './components/intencion/intencion.component';
@NgModule({
  declarations: [
    AppComponent,
    NavComponent,
    FooterComponent,
    HomeComponent,
    UsuarioComponent,
    IntencionesComponent,
    StorageComponent,
    EditarUsuarioComponent,
    CrearUsuarioComponent,
    DominioComponent,
    CrearDominioComponent,
    EditarDominioComponent,
    CrearIntencionComponent,
    PreguntasComponent,
    TarjetasComponent,
    OpcionesComponent,
    TarjetasRespuestaComponent,
    EditarIntencionComponent,
    TarjetaBasicaComponent,
    TarjetasAudioComponent,
    TarjetasVideoComponent,
    UploadFileComponent,
    TarjetasListComponent,
    LoginComponent
  ],
  imports: [
    BrowserModule,
    HttpModule,
    FormsModule,
    RouterModule.forRoot(appRouter),
    DataTablesModule,
    FileUploadModule,
    AngularFireModule.initializeApp(environment.firebase),
    AngularFirestoreModule,
    AngularFireAuthModule,
    AngularFireStorageModule
  ],
  providers: [
    AlertifyService,
    UsuarioService,
    EditarUsuarioResolve,
    UsuarioResolve,
    DominioService,
    TarjetasService,
    IntencionService,
    EditarDominioResolve,
    DominioResolve,
    IntencionResolve,
    UploadFileService,
    FirebaseService,
    TarjetaResolve
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
