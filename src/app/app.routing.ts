import { NgModule } from "@angular/core";
import { Routes, RouterModule } from '@angular/router';

import { CadastrarClientesComponent } from "./cadastrar-clientes/cadastrar-clientes.component";
import { ListarClientesComponent } from "./listar-clientes/listar-clientes.component";
import { EditarClientesComponent } from "./editar-clientes/editar-clientes.component";

const routes: Routes = [
    { path : 'cadastrar-clientes', component: CadastrarClientesComponent },
    { path : 'listar-clientes', component: ListarClientesComponent },
    { path : 'editar-clientes/:idCliente', component: EditarClientesComponent }
]

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})
 
//exportando este modulo de configuração
export class AppRoutingModule { }
