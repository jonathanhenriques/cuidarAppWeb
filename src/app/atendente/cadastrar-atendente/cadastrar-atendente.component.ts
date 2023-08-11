import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
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
    private atendenteService: AtendenteService,
    private toastr: ToastrService
    ) {}

    ngOnInit(): void {

    this.desabilitarValidacoesDoFormulario
    this.configurarFormulario(this.atendentePassado)
  }


  private configurarFormulario(atendente: AtendenteED) {
    this.formularioDeAtendente = this.fb.group({

      nome: [atendente.nome],

    },);

  }



  private constroiAtendenteParaEnvio(){

    this.atendentePassado.nome = this.formularioDeAtendente.value.nome;
    // this.atendentePassado.nome = 'vaness'

    // const { dataAtualizacao,dataCadastro, exames, ...pacienteRequest } = this.pacientePassado;
    // this.pacientePassado = { ...pacienteRequest };

    // this.pacientePassado = pacienteRequest;
  }


  cadastrarAtendente(){
    this.constroiAtendenteParaEnvio();
    this.atendenteService.postAtendente(this.atendentePassado).subscribe((atendenteData: AtendenteED) => {
      this.atendentePassado = atendenteData;
      // this.toastr.success('Mensagem de sucesso', 'Título da notificação');
      this.recarregarPagina();
    },(error) => console.error('deu errado'));
  }

  recarregarPagina() {
    window.location.reload();
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

