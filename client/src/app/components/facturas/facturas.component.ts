import { Component, OnInit, ViewChild } from '@angular/core';


// Angular Material
import { ReactiveFormsModule } from '@angular/forms';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { MatSort, MatSortModule } from '@angular/material/sort';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatTooltipModule } from '@angular/material/tooltip';
import { CommonModule } from '@angular/common';

// Servicios y modelos
import { Factura } from '../../models/factura.model';
import { FacturaService } from '../../service/factura.service';
import { Router, RouterModule } from '@angular/router';

import swal from 'sweetalert2'; // para instalarlos se debe ejecutar npm install sweetalert2

@Component({
  selector: 'app-facturas',
  imports: [
    // Angular Material modules
    MatTableModule,
    MatPaginatorModule,
    MatSortModule,
    MatSnackBarModule,
    MatIconModule,
    MatButtonModule,
    MatFormFieldModule,
    MatInputModule,
    MatToolbarModule,
    MatTooltipModule,
    RouterModule,
    ReactiveFormsModule,
    CommonModule
  ],
  templateUrl: './facturas.component.html',
  styleUrls: ['./facturas.component.css']
})
export class FacturasComponent implements OnInit {

  //Lista de facturas
  listaFacturas : Factura[] = [];

  //Configuración de la tabla
  displayedColumns: string[] = ['numFactura', 'nomCliente', 'dirCliente', 'telCliente',   'acciones'];
  dataSource!:  MatTableDataSource<any>;

  //Para la paginación
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor( private facturaService: FacturaService, private _snackbar: MatSnackBar, private router: Router ) { }

  ngOnInit(): void {
    this.consultarFacturas();
  }

  ngAfterViewInit() {
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }


  consultarFacturas():void{
    this.facturaService.getAll()
      .subscribe({
         next: (data) => {
           this.listaFacturas = data;
           this.dataSource = new MatTableDataSource(this.listaFacturas);
           this.dataSource.paginator = this.paginator;
           this.dataSource.sort = this.sort;
           console.log(data);
         },
         error: (e: any) => console.error(e)
      });

  }

  eliminarFactura(element:any){

    swal.fire({
      title: `¿Desea eliminar la factura #${element.numFactura} la a nombre de ${element.nomCliente}?`,
      icon: 'question',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Si, eliminar',
      cancelButtonText: 'Cancelar'
    }).then((result) => {
      if (result.isConfirmed) {

      }

    });

  } // fin del médoto de eliminar


  modificarFactura(element:any){

    swal.fire({
      title: `¿Desea modificar la factura #${element.numFactura} a nombre de ${element.nomCliente}?`,
      icon: 'question',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Si, modificar',
      cancelButtonText: 'Cancelar'
    }).then((result) => {
      if (result.isConfirmed) {
        console.log(element._id);

        this.router.navigateByUrl(`dashboard/facturas/${element._id}`);

      }

    });

  }// fin del método modificar

}
