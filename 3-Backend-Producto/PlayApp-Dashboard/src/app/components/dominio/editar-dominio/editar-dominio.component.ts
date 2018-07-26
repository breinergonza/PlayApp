import { Component, OnInit, ViewChild } from '@angular/core';
import { Dominio } from '../../../models/dominio.interface';
import { AlertifyService } from '../../../services/alertify.service';
import { DominioService } from '../../../services/dominio.service';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-editar-dominio',
  templateUrl: './editar-dominio.component.html',
  styleUrls: ['./editar-dominio.component.css']
})
export class EditarDominioComponent implements OnInit {
  @ViewChild('dominioForm') dominioForm: Dominio;

  model: Dominio;

  constructor(
    private alertify: AlertifyService,
    private dominioService: DominioService,
    private router: Router,
    private activeRouter: ActivatedRoute
  ) {}

  ngOnInit() {
    this.activeRouter.data.subscribe(data => {
      this.model = <Dominio>data['dominio'];
    });
  }

  editarDominio() {
    this.dominioService.putDominio(this.model._id, this.model).subscribe(
      res => {
        this.alertify.success('Se ha editado el dominio corectamente');
      },
      err => {
        this.alertify.error(err);
      },
      () => {
        this.router.navigate(['/dominio']);
      }
    );
  }
}
