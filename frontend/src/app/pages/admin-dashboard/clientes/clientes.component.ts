import { Component } from '@angular/core';
import { FormChamadoComponent } from "../../../pages/area-do-cliente/chamado/form-chamado/form-chamado.component";
import { CommonModule } from '@angular/common';
import { MenuLateralAdminComponent } from "../menu-lateral-admin/menu-lateral-admin.component";
import { DashboardComponent } from "../dashboard/dashboard.component";
import { CLIENTES } from '../../../Data/Dados-clientes';
import { Cliente } from '../../../Models/Cliente';
import { FormsModule } from '@angular/forms';

@Component({
    selector: 'app-clientes',
    standalone: true,
    templateUrl: './clientes.component.html',
    styleUrl: './clientes.component.css',
    imports: [FormsModule, CommonModule, FormChamadoComponent, MenuLateralAdminComponent, DashboardComponent]
})
export class ClientesComponent {

  filtro: string = '';
  filtroTipo: string = 'nome';
  clienteSelecionado: Cliente | null = null;

  clientes: Cliente[] = CLIENTES;

  pesquisar() {
    switch (this.filtroTipo) {
      case 'cpf':
        this.pesquisarPorCPF();
        break;
      case 'nome':
        this.pesquisarPorNome();
        break;
      case 'conta':
        this.pesquisarPorNumeroConta();
        break;
      default:
        alert('Tipo de filtro inválido.');
        break;
    }
  }

  pesquisarPorCPF() {
    const clienteEncontrado = this.clientes.find(cliente => cliente.cpf === this.filtro);
    if (clienteEncontrado) {
      this.selecionarCliente(clienteEncontrado);
    } else {
      alert('CPF não encontrado.');
      this.clienteSelecionado = null;
    }
  }

  removerAcentos(texto: string): string {
    return texto.normalize("NFD").replace(/[\u0300-\u036f]/g, "");
  }

  pesquisarPorNome() {
    const filtroSemAcentos = this.removerAcentos(this.filtro.toLowerCase());
    const clienteEncontrado = this.clientes.find(cliente => {
    if (cliente.nome) {
      const nomeSemAcentos = this.removerAcentos(cliente.nome.toLowerCase());
      return nomeSemAcentos === filtroSemAcentos;
    }
    return false;
  });
    if (clienteEncontrado) {
      this.selecionarCliente(clienteEncontrado);
    } else {
      alert('Nome não encontrado.');
      this.clienteSelecionado = null;
    }
  }

  pesquisarPorNumeroConta() {
    const clienteEncontrado = this.clientes.find(cliente => cliente.numeroConta === this.filtro);
    if (clienteEncontrado) {
      this.selecionarCliente(clienteEncontrado);
    } else {
      alert('Número da conta não encontrado.');
      this.clienteSelecionado = null;
    }
  }

  selecionarCliente(cliente: Cliente) {
    this.clienteSelecionado = cliente;
  }

  bloquearDesbloquearConta() {
    if (this.clienteSelecionado) {
      console.log('Bloquear/desbloquear conta do cliente:', this.clienteSelecionado.nome);
    }
  }

  editarConta() {
    if (this.clienteSelecionado) {
      console.log('Logica para editar contas:', this.clienteSelecionado.nome);
    }
  }
}
