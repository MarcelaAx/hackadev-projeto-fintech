import { Component } from '@angular/core';
import { CabecalhoLoginComponent } from "../../componentes/cabecalho-login/cabecalho-login.component";
import { RodapeLoginComponent } from "../../componentes/rodape-login/rodape-login.component";
import { FormularioEntrarComponent } from "./forms/formulario-entrar/formulario-entrar.component";
import { Cliente } from '../../Models/Cliente';
import { BannerComponent } from "../../componentes/banner/banner.component";
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';

@Component({
    selector: 'app-inicio-login',
    standalone: true,
    templateUrl: './inicio-login.component.html',
    styleUrls: ['./inicio-login.component.css'],
    imports: [CabecalhoLoginComponent, RodapeLoginComponent, FormularioEntrarComponent, BannerComponent, CommonModule, RouterOutlet]
})
export class InicioLoginComponent {

}
