import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { AtendenteED } from 'src/app/models/AtendenteED';
import { AtendenteService } from 'src/app/service/atendente.service';


@Component({
  selector: 'app-cadastrar-atendente',
  templateUrl: './cadastrar-atendente.component.html',
  styleUrls: ['./cadastrar-atendente.component.scss']
})
export class CadastrarAtendenteComponent implements OnInit {

  formularioDeAtendente: FormGroup;

  atendentePassado =   {
      nome: '',
      isAtivo: true
    }


  constructor(
    private fb: FormBuilder,
    private atendenteService: AtendenteService
    ) {}

    ngOnInit(): void {

    this.desabilitarValidacoesDoFormulario
    this.configurarFormulario(this.atendentePassado)
    this.constroiAtendenteParaEnvio
  }


  private configurarFormulario(atendente: AtendenteED) {
    this.formularioDeAtendente = this.fb.group({

      nomeAtendente: [atendente.nome],

    },[
      // {
      //   Validator:Validacoes.comecaComNove
      // },
      // {
      //   validator: Validacoes.maiorDeIdade
      // }
    ]
    );

  }



  private constroiAtendenteParaEnvio(){

    this.atendentePassado.nome = this.formularioDeAtendente.value.exame;

    // const { dataAtualizacao,dataCadastro, exames, ...pacienteRequest } = this.pacientePassado;
    // this.pacientePassado = { ...pacienteRequest };

    // this.pacientePassado = pacienteRequest;
  }


  cadastrarAtendente(){
    this.atendenteService.postAtendente(this.atendentePassado).subscribe((atendenteData: AtendenteED) => {
      this.atendentePassado = atendenteData;
    },(error) => console.error('deu errado'));
  }


  novo() {
    this.formularioDeAtendente.reset();
  }



  private desabilitarValidacoesDoFormulario() {
    Object.keys(this.formularioDeAtendente.controls).forEach(key => {
      const control = this.formularioDeAtendente.controls[key];
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

