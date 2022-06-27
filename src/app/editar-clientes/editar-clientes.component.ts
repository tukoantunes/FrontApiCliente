import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { ActivatedRoute } from '@angular/router';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-editar-clientes',
  templateUrl: './editar-clientes.component.html',
  styleUrls: ['./editar-clientes.component.css']
})
export class EditarClientesComponent implements OnInit {

  mensagem_sucesso: string = '';
  mensagem_erro: string = '';

  constructor(
    private httpClient: HttpClient,
    private activatedRoute: ActivatedRoute
  ) { }

  formEdicao = new FormGroup({
 
    //campo para armazenar o id da empresa
    idCliente: new FormControl('', []),
 
    //campo para preenchimento do nomeFantasia
    nome: new FormControl('', [
      Validators.required
    ]),
 
    //campo para preenchimento do razaoSocial
    email: new FormControl('', [
      Validators.required, //campo obrigatório      
    ]),
 
    //campo para preenchimento do cnpj
    cpf: new FormControl('', [
      Validators.required
    ]),
 
    //campo para preenchimento do status
    dataNascimento: new FormControl('', [
      Validators.required
    ])
 
  });

  ngOnInit(): void {

    const idCliente = this.activatedRoute.snapshot.paramMap.get('idCliente');
 
    //consultar cliente na API atraves do ID
    this.httpClient.get(environment.apiUrl + "/Clientes/" + idCliente)
      .subscribe(
        (data:any) => {

          data.dataNascimento = data.dataNascimento.split('T')[0];
          //populando o formulário
          this.formEdicao.patchValue(data);
        }
      )
 
  }

  get form(): any {
    return this.formEdicao.controls;
  }

  onSubmit(): void {
 
    this.limparMensagens();
 
     //fazendo a requisição para a API..
     this.httpClient.put(environment.apiUrl + "/Clientes", this.formEdicao.value)
     .subscribe(
       (data:any) => { //retorno de sucesso 2xx
         //exibir mensagem de sucesso na página
         this.mensagem_sucesso = data.mensagem;
       },
       e => { //retorno de erro 4xx ou 5xx        
         //verificar o tipo do erro obtido
         switch(e.status) { //código do erro
           case 400:
             this.mensagem_erro = 'Ocorreram erros de validação nos dados enviados.';
             break;
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
   
  limparMensagens(): void {

    this.mensagem_sucesso = '';
    this.mensagem_erro = '';

  }
}


