import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { EnderecoED } from 'src/app/models/EnderecoED';
import { LocalED } from 'src/app/models/LocalED';
import { LocalService } from 'src/app/service/local.service';

@Component({
  selector: 'app-cadastrar-local',
  templateUrl: './cadastrar-local.component.html',
  styleUrls: ['./cadastrar-local.component.scss']
})
export class CadastrarLocalComponent implements OnInit {

  formularioDeLocal: FormGroup;


  enderecoPassado = {
    endRua: '',
    endNumero: '',
    endBairro: '',
    endCidade: '',
    endTipoResidencia: '',
    endCep: '',
    endObservacao: '',
  }

  localPassado =   {
    nomeLocal: '',
      // isAtivo: true
     endereco: this.enderecoPassado
    }

  constructor(
    private fb: FormBuilder,
    private localService: LocalService,
    ) {}

    ngOnInit(): void {

    this.desabilitarValidacoesDoFormulario
    this.configurarFormulario(this.localPassado, this.enderecoPassado)
  }


  private configurarFormulario(local: LocalED, endereco: EnderecoED) {
    this.formularioDeLocal = this.fb.group({

      nome: [local.nomeLocal],

      endRua: [endereco.endRua],
      endNumero: [endereco.endNumero],
      endBairro: [endereco.endBairro],
      endCidade: [endereco.endCidade],
      endCep: [endereco.endCep],
      endTipoResidencia: [endereco.endTipoResidencia],
      endObservacao: [endereco.endObservacao],

    },);

  }



  private constroiMedicoParaEnvio(){

    this.localPassado.nomeLocal = this.formularioDeLocal.value.nome;

    this.enderecoPassado.endRua = this.formularioDeLocal.value.endRua;
    this.enderecoPassado.endNumero = this.formularioDeLocal.value.endNumero;
    this.enderecoPassado.endBairro = this.formularioDeLocal.value.endBairro;
    this.enderecoPassado.endCidade = this.formularioDeLocal.value.endCidade;
    this.enderecoPassado.endCep = this.formularioDeLocal.value.endCep;
    this.enderecoPassado.endTipoResidencia = this.formularioDeLocal.value.endTipoResidencia;
    this.enderecoPassado.endObservacao = this.formularioDeLocal.value.endObservacao;

    this.localPassado.endereco = this.enderecoPassado;
    // this.localPassado.nome = 'vaness'

    // const { dataAtualizacao,dataCadastro, exames, ...medicoRequest } = this.localPassado;
    // this.localPassado = { ...localRequest };

    // this.localPassado = localRequest;
  }


  cadastrarLocal(){
    this.constroiMedicoParaEnvio();
    this.localService.postLocal(this.localPassado).subscribe((localData: LocalED) => {
      this.localPassado = localData;
      // this.toastr.success('Mensagem de sucesso', 'Título da notificação');
      this.recarregarPagina();
    },(error) => console.error('deu errado'));
  }

  recarregarPagina() {
    window.location.reload();
  }




  novo() {
    this.formularioDeLocal.reset();
  }



  private desabilitarValidacoesDoFormulario() {
    Object.keys(this.formularioDeLocal.controls).forEach(key => {
      const control = this.formularioDeLocal.controls[key];
      control.clearValidators();
      control.updateValueAndValidity();
    });
  }

  onKeyDown(event: KeyboardEvent): void {
    if (event.key === 'Enter') {
      event.preventDefault(); // Evita o comportamento padrão de enviar o formulário
    }
  }


}

