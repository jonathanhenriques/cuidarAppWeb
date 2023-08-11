import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-medico-master',
  templateUrl: './medico-master.component.html',
  styleUrls: ['./medico-master.component.scss'],
})
export class MedicoMasterComponent implements OnInit {
  constructor() {}

  ngOnInit(): void {
    this.rolarTelaParaBaixo();
  }

  private rolarTelaParaBaixo() {
    const element = document.getElementById('lista-de-medicos'); // id do componente de lista
    if (element) {
      element.scrollIntoView({
        behavior: 'smooth',
        block: 'end',
        inline: 'nearest',
      });
    }
  }
}
