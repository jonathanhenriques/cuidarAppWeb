import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-atendente-master',
  templateUrl: './atendente-master.component.html',
  styleUrls: ['./atendente-master.component.scss']
})
export class AtendenteMasterComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
    this.rolarTelaParaBaixo();
  }


    private rolarTelaParaBaixo() {
      const element = document.getElementById('lista-de-atendentes'); // id do componente de lista
      if (element) {
        element.scrollIntoView({ behavior: 'smooth', block: 'end', inline: 'nearest' });
      }
    }

}
