import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-local-master',
  templateUrl: './local-master.component.html',
  styleUrls: ['./local-master.component.scss']
})
export class LocalMasterComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
    this.rolarTelaParaBaixo();
  }

  private rolarTelaParaBaixo() {
    const element = document.getElementById('lista-de-locais'); // id do componente de lista
    if (element) {
      element.scrollIntoView({
        behavior: 'smooth',
        block: 'end',
        inline: 'nearest',
      });
    }
  }
}
