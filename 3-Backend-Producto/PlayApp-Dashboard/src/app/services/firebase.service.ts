import { Injectable } from '@angular/core';
import { AngularFirestore } from 'angularfire2/firestore';
import * as firebase from 'firebase';
import { FileItem } from 'ng2-file-upload';

@Injectable()
export class FirebaseService {
  CARPETA = 'img';
  constructor(private db: AngularFirestore) {}

  private guardarImagen(image: { nombre: string; url: string }) {
    this.db.collection(`/${this.CARPETA}`).add(image);
  }

  cargarImagenes(files: FileItem[]) {
    console.log(files);
  }
}
