import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormGroup, FormControl, Validators, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-formulario-recuperar-pg-um',
  standalone: true,
  imports: [CommonModule,ReactiveFormsModule],
  templateUrl: './formulario-recuperar-pg-um.component.html',
  styleUrl: './formulario-recuperar-pg-um.component.css'
})
export class FormularioRecuperarPgUmComponent {
  formRecuperarSenha = new FormGroup({
    email: new FormControl('',[Validators.required, Validators.email]),

  });

}
