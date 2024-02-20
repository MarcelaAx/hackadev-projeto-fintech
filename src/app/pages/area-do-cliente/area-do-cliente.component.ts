import { Component, HostListener } from '@angular/core';
import { HistoricoTransacoesComponent } from "../../componentes/historico-transacoes/historico-transacoes.component";
import { AcessoRapidoAreaInternaComponent } from "../../componentes/acesso-rapido-area-interna/acesso-rapido-area-interna.component";
import { SecaoSaldoComponent } from "../../componentes/secao-saldo/secao-saldo.component";
import { CabecalhoAreaInternaComponent } from "../../componentes/cabecalho-area-interna/cabecalho-area-interna.component";
import { MenuInferiorAreaInternaComponent } from "../../componentes/menu-inferior-area-interna/menu-inferior-area-interna.component";
import { MenuLateralComponent } from "../../componentes/menu-lateral/menu-lateral.component";
import { BarraDeBuscaComponent } from "../../componentes/barra-de-busca/barra-de-busca.component";
import { MenuService } from '../../servicos/menu.service';
import { CommonModule } from '@angular/common';
import { Subscription, filter } from 'rxjs';
import { NavigationEnd, Router } from '@angular/router';

@Component({
    selector: 'app-area-do-cliente',
    standalone: true,
    templateUrl: './area-do-cliente.component.html',
    styleUrl: './area-do-cliente.component.css',
    imports: [HistoricoTransacoesComponent, AcessoRapidoAreaInternaComponent, SecaoSaldoComponent, CabecalhoAreaInternaComponent, MenuInferiorAreaInternaComponent, MenuLateralComponent, CommonModule, BarraDeBuscaComponent]
})
export class AreaDoClienteComponent {
  aplicarEstiloOverflowMobile: boolean = false;
  aplicarEstiloOverflowTablet: boolean = false;
  aplicarEstiloOverflowPC: boolean = false;


  isMenuOpen: boolean = false;
  private routerSubscription: Subscription;

  constructor(private menuService: MenuService, private router: Router) {
    this.menuService.isMenuOpen$.subscribe((isOpen) => {
      this.isMenuOpen = isOpen;
    });

    this.routerSubscription = this.router.events.pipe(
      filter((event) => event instanceof NavigationEnd)
    ).subscribe(() => {
      this.isMenuOpen = false;
    });

    this.router.events.subscribe(event => {
      if (event instanceof NavigationEnd) {
        this.verificarLarguraTela();
      }
    });
  }

  @HostListener('window:resize', ['$event'])
  onResize(event: any) {
    this.verificarLarguraTela();
  }

  private verificarLarguraTela() {
    const larguraTela = window.innerWidth;

    if (larguraTela <= 744) {
      const url = this.router.url;
      this.aplicarEstiloOverflowMobile = true;
      this.aplicarEstiloOverflowTablet = false;
      this.aplicarEstiloOverflowPC = false;
    } else if  (larguraTela >= 745 && larguraTela <= 1000) {
      this.aplicarEstiloOverflowMobile = false;
      this.aplicarEstiloOverflowTablet = true;
      this.aplicarEstiloOverflowPC = false;
    } else {
      this.aplicarEstiloOverflowMobile = false;
      this.aplicarEstiloOverflowTablet = false;
      this.aplicarEstiloOverflowPC = true;
    }
  }

  onLinkClicked() {
    this.isMenuOpen = false;
  }

  ngOnDestroy(): void {
    if (this.routerSubscription) {
      this.routerSubscription.unsubscribe();
    }
  }
}

