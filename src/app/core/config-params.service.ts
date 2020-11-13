import { HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ConfigParams } from '../shared/models/config-params';

@Injectable({
  providedIn: 'root'
})
export class ConfigParamsService {

  constructor() { }

  configurarParametros(config: ConfigParams): HttpParams {
    let params = new HttpParams();
    if (config.pagina) {
      params = params.set('_page', config.pagina.toString());
    }
    if (config.limite) {
      params = params.set('_limit', config.limite.toString());
    }
    if (config.pesquisa) {
      params = params.set('q', config.pesquisa);
    }
    if (config.campo) {
      params = params.set(config.campo.tipo, config.campo.valor.toString());
    }

    params = params.set('_sort', 'id');
    params = params.set('_order', 'desc');

    return params;
  }
}
