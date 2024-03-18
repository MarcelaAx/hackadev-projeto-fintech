import { Component } from '@angular/core';
import { SecaoSaldoComponent } from "../../componentes/secao-saldo/secao-saldo.component";
import { CabecalhoAreaInternaComponent } from "../../componentes/cabecalho-area-interna/cabecalho-area-interna.component";
import { MenuInferiorAreaInternaComponent } from "../../componentes/menu-inferior-area-interna/menu-inferior-area-interna.component";
import { MenuLateralComponent } from "../../componentes/menu-lateral/menu-lateral.component";
import { SecaoSegurancaComponent } from "../../pages/seguranca/secao-seguranca/secao-seguranca.component";
import { MenuService } from '../../servicos/menu.service';
import { CommonModule } from '@angular/common';
import { Subscription, filter } from 'rxjs';
import { NavigationEnd, Router } from '@angular/router';

@Component({
  selector: 'app-seguranca',
  standalone: true,
  imports: [SecaoSegurancaComponent, SecaoSaldoComponent, CabecalhoAreaInternaComponent, MenuInferiorAreaInternaComponent, MenuLateralComponent, CommonModule],
  templateUrl: './seguranca.component.html',
  styleUrl: './seguranca.component.css'
})
export class SegurancaComponent {
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
