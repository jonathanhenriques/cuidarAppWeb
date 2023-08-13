import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { AtendenteED } from 'src/app/models/AtendenteED';
import { MedicoED } from 'src/app/models/MedicoED';
import { AtendenteService } from 'src/app/service/atendente.service';
import { MedicoService } from 'src/app/service/medico.service';

@Component({
  selector: 'app-cadastrar-medico',
  templateUrl: './cadastrar-medico.component.html',
  styleUrls: ['./cadastrar-medico.component.scss']
})
export class CadastrarMedicoComponent implements OnInit {


  formularioDeMedico: FormGroup;

  MedicoPassado =   {
      nome: '',
      isAtivo: true
    }


  constructor(
    private fb: FormBuilder,
    private MedicoService: MedicoService,
    ) {}

    ngOnInit(): void {

    this.desabilitarValidacoesDoFormulario
    this.configurarFormulario(this.MedicoPassado)
  }


  private configurarFormulario(medico: MedicoED) {
    this.formularioDeMedico = this.fb.group({

      nome: [medico.nome],

    },);

  }



  private constroiMedicoParaEnvio(){

    this.MedicoPassado.nome = this.formularioDeMedico.value.nome;
    // this.MedicoPassado.nome = 'vaness'

    // const { dataAtualizacao,dataCadastro, exames, ...medicoRequest } = this.medicoPassado;
    // this.medicoPassado = { ...medicoRequest };

    // this.medicoPassado = medicoRequest;
  }


  cadastrarMedico(){
    this.constroiMedicoParaEnvio();
    this.MedicoService.postmedico(this.MedicoPassado).subscribe((medicoData: MedicoED) => {
      this.MedicoPassado = medicoData;
      // this.toastr.success('Mensagem de sucesso', 'Título da notificação');
      this.recarregarPagina();
    },(error) => console.error('deu errado'));
  }

  recarregarPagina() {
    window.location.reload();
  }




  novo() {
    this.formularioDeMedico.reset();
  }



  private desabilitarValidacoesDoFormulario() {
    Object.keys(this.formularioDeMedico.controls).forEach(key => {
      const control = this.formularioDeMedico.controls[key];
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

