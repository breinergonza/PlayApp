import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Tarjeta } from '../../models/tarjeta.interface';
import { FileItem, FileUploader } from 'ng2-file-upload';
import { environment } from '../../../environments/environment';
import { Observable } from 'rxjs/Observable';
import { AngularFireStorage } from 'angularfire2/storage';
import { AlertifyService } from '../../services/alertify.service';

@Component({
  selector: 'app-upload-file',
  templateUrl: './upload-file.component.html',
  styleUrls: ['./upload-file.component.css']
})
export class UploadFileComponent implements OnInit {
  @Input() tarjetas: Tarjeta[];
  @Input() tipo: String;
  @Output() urlStorage = new EventEmitter<string>();
  files: FileItem[] = [];
  uploader: FileUploader;
  hasBaseDropZoneOver: Boolean = false;
  baseUrl = environment.apiUrl;

  uploadPercent: Observable<number>;
  downloadURL: string;

  constructor(
    private storage: AngularFireStorage,
    private alertify: AlertifyService
  ) {}

  ngOnInit() {}

  uploadImagenes(event) {
    const file = event.target.files[0];
    // console.log(file);

    if (file.type.indexOf(this.tipo) === -1) {
      this.alertify.error(`El tipo de archivo no es valido`);
      return;
    }
    // console.log(this.tipo);
    const filePath = Math.random()
      .toString(36)
      .substring(2);

    const extension = file.name.substring(
      file.name.length - 4,
      file.name.length
    );
    const task = this.storage.upload(filePath + extension, file);

    // observe percentage changes
    this.uploadPercent = task.percentageChanges();
    // get notified when the download URL is available
    // this.downloadURL = task.downloadURL();

    task.downloadURL().subscribe(
      dat => {
        this.downloadURL = dat;

        this.alertify.success('Se ha subido el archivo correctamente');

        this.urlStorage.emit(dat);
      },
      err => {
        this.alertify.error('Se ha presentado un error en la carga de archivo');
      }
    );
  }
}
