import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-listar-clientes',
  templateUrl: './listar-clientes.component.html',
  styleUrls: ['./listar-clientes.component.css']
})
export class ListarClientesComponent implements OnInit {
 
  //atributos
  clientes: any[] = []; //array vazio!
 
  mensagem_sucesso : string = '';
  mensagem_erro : string = ''; 
 
  //declarar um objeto para a classe HttpClient
  //este objeto já será inicializado automaticamente
  //pelo Angular atraves de injeção de dependência

  constructor(
    private httpClient: HttpClient
  ) { }

  ngOnInit(): void {
    
   
    //executando a consulta de empresas na API..
    this.httpClient.get(environment.apiUrl + "/Clientes")
      .subscribe( //capturando o retorno
        data => {          
          //armazenar o retorno da API no componente
          this.clientes = data as any[];  
  }
      )

}
excluirCliente(idCliente : string): void {
 
  if(window.confirm('Deseja realmente excluir o cliente selecionado?')){

    this.limparMensagens();

    this.httpClient.delete(environment.apiUrl + "/Clientes/" + idCliente)
      .subscribe(
        (data:any) => {

          //exibir mensagem de sucesso
          this.mensagem_sucesso = data.mensagem;
          //fazer uma nova consulta na API
          this.ngOnInit();
        },
        e => {
          //verificar o tipo do erro obtido
          switch(e.status) { //código do erro
            case 422:
              this.mensagem_erro = e.error.mensagem;
              break;
            case 500:
              this.mensagem_erro = "Erro! Entre em contato com o suporte.";
              break;
          }
        }
      )
  }
}
  //função para limpar as mensagens
  limparMensagens(): void {
    this.mensagem_sucesso = '';
    this.mensagem_erro = '';
  }
 
}
 