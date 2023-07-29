import {
  AbstractControl,
  ValidationErrors,
  ValidatorFn,
  Validators,
} from '@angular/forms';

export class Validacoes {
  static ValidaRg(controle: AbstractControl): ValidationErrors | null {
    const rg = controle.value;

    const regex = new RegExp('^([A-Za-z]{1}[0-9]{8}|[0-9]{9})$'); //  RGs compostos por uma letra e 8 números quanto RGs com 9 números.
    if (!regex.test(rg)) {
      return { rgInvalido: true };
    }

    const digitos = rg.split('');
    const digitoVerificador = parseInt(digitos[8]);
    const soma = digitos
      .slice(0, 8)
      .reduce((total: number, num: string, i: number) => {
        return total + parseInt(num) * (i + 2);
      }, 0);

    const resto = soma % 11;
    const digitoCorreto = resto < 2 ? 0 : 11 - resto;
    if (digitoCorreto !== digitoVerificador) {
      return { rgInvalido: true };
    }

    return null;
  }

  static cpfValido(controle: AbstractControl): ValidationErrors | null {
    const cpf = controle.value;

    const cpfInvalidos = [
      '00000000000',
      '11111111111',
      '22222222222',
      '33333333333',
      '44444444444',
      '55555555555',
      '66666666666',
      '77777777777',
      '88888888888',
      '99999999999',
    ];

    if (!cpf || cpfInvalidos.includes(cpf)) {
      return { cpfInvalido: true };
    }

    const numerosCpf = cpf
      .substring(0, 9)
      .split('')
      .map((num: string) => parseInt(num));
    const digitosCpf = cpf
      .substring(9)
      .split('')
      .map((num: string) => parseInt(num));

    let soma = 0;
    for (let i = 0; i < 9; i++) {
      soma += numerosCpf[i] * (10 - i);
    }
    let resto = soma % 11;

    if (resto === 10 || resto === 11) {
      resto = 0;
    }
    if (resto !== digitosCpf[0]) {
      return { cpfInvalido: true };
    }

    soma = 0;
    for (let i = 0; i < 10; i++) {
      soma += numerosCpf[i] * (11 - i);
    }
    soma += resto * 2;
    resto = soma % 11;

    if (resto === 10 || resto === 11) {
      resto = 0;
    }
    if (resto !== digitosCpf[1]) {
      return { cpfInvalido: true };
    }

    return null;
  }

  static comecaComNove(controle: AbstractControl): ValidationErrors | null {
    const value = controle.value;
    if (value && !value.startsWith('9')) {
      return { telInvalido: true };
    } else {
      return null;
    }
  }

  // static responsavelMenorDeIdade(controle: AbstractControl) {
  //   let idadePaciente = controle.get('idade')?.value;
  //   console.log(idadePaciente)
  //   let nomeResponsavel = controle.get('nomeResponsavelPaciente')?.value;
  //   console.log(nomeResponsavel)
  //   if (idadePaciente == nomeResponsavel) return null;
  //   return controle.get('nomeResponsavelPaciente')?.setErrors({ pacienteMenorDeIdade: true});

  // }

  // static maiorDeIdade(controle: AbstractControl): ValidationErrors | null {
  //   const idadePaciente = controle.get('idade')?.value;
  //   console.log(controle.get('idade')?.value)
  //   if(!idadePaciente) return { menorDeIdade: true }
  //   const [ano, mes, dia] = idadePaciente?.split('-');
  //   const nascimentoPaciente = new Date(ano, mes -1 , dia); // -1 pois o mês começa em 0
  //   const verificacaoDeIdade = 1000 * 60 * 60 * 24 * 365.25 * 18; // 18 anos em milissegundos
  //   const hoje = new Date();

  //   return (hoje.getTime() - nascimentoPaciente.getTime() >= verificacaoDeIdade) ? null : { menorDeIdade: true };

  // }
}
