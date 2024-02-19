import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-formulario-criar-conta-pg-tres',
  standalone: true,
  imports: [RouterLink, ReactiveFormsModule, FormsModule, CommonModule],
  templateUrl: './formulario-criar-conta-pg-tres.component.html',
  styleUrl: './formulario-criar-conta-pg-tres.component.css'
})
export class FormularioCriarContaPgTresComponent {

  @Input() email: string = '';
  @Input() newPassword: string = '';
  @Input() confirmPassword: string = '';
  passwordRequirements = {
    length: false,
    number: false,
    lowercase: false,
    uppercase: false
  };
  hasStartedTyping = false; // Novo campo para rastrear a digitação do usuário

  onPasswordInput() {
    this.hasStartedTyping = true;
    this.checkPasswordRequirements();
  }

  checkPasswordRequirements() {
    const numberPattern = /\d/; // Padrão para detectar números
    const lowercasePattern = /[a-z]/; // Padrão para detectar letras minúsculas
    const uppercasePattern = /[A-Z]/; // Padrão para detectar letras maiúsculas

    this.passwordRequirements.length = this.newPassword.length >= 8;
    this.passwordRequirements.number = numberPattern.test(this.newPassword);
    this.passwordRequirements.lowercase = lowercasePattern.test(this.newPassword);
    this.passwordRequirements.uppercase = uppercasePattern.test(this.newPassword);
  }
  passwordIsValid() {
    return this.passwordRequirements.length &&
           this.passwordRequirements.number &&
           this.passwordRequirements.lowercase &&
           this.passwordRequirements.uppercase;
  }

  passwordsMatch() {
    return this.newPassword === this.confirmPassword;
  }
}
