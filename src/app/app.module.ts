import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app.routing';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { AppComponent } from './app.component';
import { CadastrarClientesComponent } from './cadastrar-clientes/cadastrar-clientes.component';
import { ListarClientesComponent } from './listar-clientes/listar-clientes.component';
import { EditarClientesComponent } from './editar-clientes/editar-clientes.component';

@NgModule({
  declarations: [
    AppComponent,
    CadastrarClientesComponent,
    ListarClientesComponent,
    EditarClientesComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
