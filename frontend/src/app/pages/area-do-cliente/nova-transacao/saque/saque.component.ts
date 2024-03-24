import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormGroup, FormControl, Validators, ReactiveFormsModule, FormsModule } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { ApiService } from '../../../../Services/api.service';
import { Title } from '@angular/platform-browser';
import { TransacaoService } from '../../../../Services/transacao-service.service';

@Component({
  selector: 'app-saque',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, FormsModule, RouterLink],
  templateUrl: './saque.component.html',
  styleUrl: './saque.component.css'
})
export class SaqueComponent{
  errorMessage!: string;

  saque = new FormGroup({
    valor: new FormControl('', [Validators.required, Validators.min(0)]),
  });

  constructor(
    private apiService: ApiService,
    private router: Router,
    private titleService: Title,
    private transacaoService: TransacaoService
  ) {}

  ngOnInit(): void {
    this.titleService.setTitle('Capibank - Novo Saque');
  }

  sacarValor() {
    const valorInput = this.saque.get('valor')?.value;
    const valorSaque = parseFloat(valorInput!);

    this.apiService.PostSaque(this.apiService.idTitularLogado, valorSaque).subscribe(
      (response: any) => {
        if (typeof response === 'object') {
          console.log("Transação bem-sucedida. ID da transação:", response);
          this.transacaoService.notificarTransacaoConcluida();
          this.router.navigateByUrl(`/cliente/nova/saque/ok/${response.id}`);
        } else {
          console.error("Erro ao efetuar o saque:", response);
          this.errorMessage = "Erro ao efetuar o saque";

        }
       },
       error => {
        console.error("Erro ao efetuar o saque:", error);
        if (error.status === 400) {
          this.errorMessage = "Saldo insuficiente";
        }
      }
    );
  }
}
