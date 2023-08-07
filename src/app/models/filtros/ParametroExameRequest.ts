export interface ParametroExameRequest {
  codigo?: string;
  medicoId?: number;
  pacienteId?: number;
  pacienteCodigo?: string;
  pacienteRG?: string;
  atendenteId?: number;
  nomeExame?: string;
  localId?: number;
  dataExame?: Date
  valor?: number;
  isAtivo?: boolean;


}
