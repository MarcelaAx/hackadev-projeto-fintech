import { Component } from '@angular/core';
import { MenuService } from '../../servicos/menu.service'

@Component({
  selector: 'app-cabecalho-area-interna',
  standalone: true,
  imports: [],
  templateUrl: './cabecalho-area-interna.component.html',
  styleUrl: './cabecalho-area-interna.component.css'
})
export class CabecalhoAreaInternaComponent {
  constructor(private menuService: MenuService) {}

  logout():void{
    localStorage.clear();
  }

  toggleMenu() {
    this.menuService.toggleMenu();
  }

}
