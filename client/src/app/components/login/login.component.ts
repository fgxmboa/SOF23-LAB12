import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';

// Angular Material
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatSnackBarModule } from '@angular/material/snack-bar';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatProgressSpinnerModule,
    MatSnackBarModule
  ],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  form: FormGroup;
  loading = false;
  msg: string = '';

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private _snackbar: MatSnackBar
  ) {
    this.form = this.fb.group({
      usuario: ['', Validators.required],
      password: ['', Validators.required]
    });
  }

  // Método que se ejecuta al iniciar el componente
  ngOnInit(): void {
    this.loading = false;
  }

  // Método para simular el proceso de login
  simulacionLoading() {
    this.loading = true;
    setTimeout(() => {
      this.ingresar();
    }, 1000);
  }

  // Método para validar el ingreso
  ingresar() {
    const dataInput = {
      username: this.form.value.usuario,
      password: this.form.value.password
    };

    if (dataInput.username === 'user' || dataInput.username === 'admin') {
      if (dataInput.username === 'user') {
        this.router.navigateByUrl('/perfil');
      }
      if (dataInput.username === 'admin') {
        this.router.navigateByUrl('/dashboard');
      }
    } else {
      this.showMsg_snackBar("Usuario no válido");
    }

    this.loading = false;
  }

  // Método para mostrar snack bar
  showMsg_snackBar(msg: string) {
    this._snackbar.open(msg, 'Cerrar', {
      duration: 5000,
      horizontalPosition: 'center',
      verticalPosition: 'bottom'
    });
  }
}
