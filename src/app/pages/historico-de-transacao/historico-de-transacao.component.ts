import { Component } from '@angular/core';
import { CabecalhoAreaInternaComponent } from "../../componentes/cabecalho-area-interna/cabecalho-area-interna.component";
import { SecaoSaldoComponent } from "../../componentes/secao-saldo/secao-saldo.component";
import { HistoricoTransacoesComponent } from "../../componentes/historico-transacoes/historico-transacoes.component";
import { MenuInferiorAreaInternaComponent } from "../../componentes/menu-inferior-area-interna/menu-inferior-area-interna.component";
import { MenuLateralComponent } from "../../componentes/menu-lateral/menu-lateral.component";
import { Cliente } from '../../Models/Cliente';
import { MenuService } from '../../servicos/menu.service';
import { CommonModule } from '@angular/common';

@Component({
    selector: 'app-historico-de-transacao',
    standalone: true,
    templateUrl: './historico-de-transacao.component.html',
    styleUrl: './historico-de-transacao.component.css',
    imports: [CabecalhoAreaInternaComponent, SecaoSaldoComponent, HistoricoTransacoesComponent, MenuInferiorAreaInternaComponent, MenuLateralComponent, CommonModule]
})
export class HistoricoDeTransacaoComponent {
  isMenuOpen: boolean = false;

  constructor(private menuService: MenuService) {
    this.menuService.isMenuOpen$.subscribe((isOpen) => {
      this.isMenuOpen = isOpen;
    });
  }

}
