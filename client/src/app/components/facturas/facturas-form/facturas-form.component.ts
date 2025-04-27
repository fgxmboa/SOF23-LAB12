import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { Factura } from '../../../models/factura.model';
import { FacturaService } from '../../../service/factura.service';

// Angular Material Modules
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatCardModule } from '@angular/material/card';
import { MatSnackBarModule } from '@angular/material/snack-bar';

// Angular Core Modules
import { ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';


@Component({
  selector: 'app-facturas-form',
  imports: [
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatToolbarModule,
    MatCardModule,
    ReactiveFormsModule,
    MatSnackBarModule,
    RouterModule,
    CommonModule
  ],
  templateUrl: './facturas-form.component.html',
  styleUrls: ['./facturas-form.component.css']
})
export class FacturasFormComponent implements OnInit {

  //***************************************************************/
  //Atributos del compomente
  //***************************************************************/

  idFactura: number = 0;
  textPantalla: string = 'Crear factura';
  isInsertar: boolean = true;
  form:FormGroup;
  factura = new Factura;

  constructor(private facturaService: FacturaService,
    private fb: FormBuilder, private router: Router,
    private _snackbar: MatSnackBar,
    private activeRouter: ActivatedRoute) {

      //Formulario de la página de factura
      this.form = this.fb.group({
        numFactura: ['', Validators.required],
        nomCliente: ['', Validators.required],
        dirCliente: ['', Validators.required],
        telCliente: ['', Validators.required]
      });

     }


    ngOnInit(): void {
      // Escuchar si hay parámetros en la ruta (ID de factura)
      this.activeRouter.params.subscribe((params: Params) => {
        console.log(params); // Verificar en consola
        this.idFactura = params['id'];

        if (this.idFactura !== undefined) {
          this.isInsertar = false;  // Cambia de modo insertar a modificar
          this.textPantalla = 'Modificar factura';  // Cambia el título de la pantalla

          // Consultar la factura por ID
          this.facturaService.get(this.idFactura)
            .subscribe({
              next: (res: any) => {
                this.factura = res;  // Guardar la factura en la variable local
                // Cargar los datos en el formulario
                this.form.setValue({
                  numFactura: this.factura.numFactura,
                  nomCliente: this.factura.nomCliente,
                  dirCliente: this.factura.dirCliente,
                  telCliente: this.factura.telCliente
                });

                console.log(this.factura);  // Verificar datos cargados

                // Mostrar mensaje de éxito
                this._snackbar.open('La factura fue cargada con éxito, por favor verificar', '', {
                  duration: 5000,
                  horizontalPosition: 'center',
                  verticalPosition: 'bottom'
                });
              },
              error: (e: any) => console.error(e)
            });

          console.log('ID de factura: ' + this.idFactura);  // Confirmar ID en consola
        }
      });
    }


  //***************************************************************/
  //Método para guardar una nueva factura
  //***************************************************************/

  saveFactura(): void{
    const data = {
      numFactura: this.form.value.numFactura,
      nomCliente: this.form.value.nomCliente,
      dirCliente: this.form.value.dirCliente,
      telCliente: this.form.value.telCliente
    };

    console.log(data);

    this.facturaService.create(data)
      .subscribe({
        next: (res: any) => {
          this.form.reset;
          console.log(res);
          this.router.navigateByUrl('dashboard/facturas');

          this._snackbar.open('La factura fue agregada con exito, por favor verificar', '',{
            duration: 5000,
            horizontalPosition: 'center',
            verticalPosition: 'bottom'
          })

        },
        error: (e:any) => console.error(e)
      });
  }

  //***************************************************************/
  //Método para modificar una factura
  //***************************************************************/
  modificarFactura(): void{
    const data = {
      numFactura: this.form.value.numFactura,
      nomCliente: this.form.value.nomCliente,
      dirCliente: this.form.value.dirCliente,
      telCliente: this.form.value.telCliente,
      estado: this.form.value.estado
    };

    console.log(data);

    this.facturaService.update(this.idFactura,data)
      .subscribe({
        next: (res: any) => {
          this.form.reset;
          console.log(res);
          this.router.navigateByUrl('/dashboard/facturas');

          this._snackbar.open('La factura fue modificada con exito, por favor verificar', '',{
            duration: 5000,
            horizontalPosition: 'center',
            verticalPosition: 'bottom'
          })

        },
        error: (e:any) => console.error(e)
      });

  }


}
