import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { InputSelectDto } from '../shared/components/campos/input-select/dto/input-select.dto';
import { ConfigParamsService } from './config-params.service';

const url = 'http://localhost:3000/generos/';

@Injectable({
  providedIn: 'root'
})
export class GenerosService {

  constructor(
    private httpClient: HttpClient,
    private configParamsService: ConfigParamsService
  ) { }

  salvar(genero: InputSelectDto): Observable<InputSelectDto> {
    return this.httpClient.post<InputSelectDto>(url, genero);
  }

  editar(genero: InputSelectDto): Observable<InputSelectDto> {
    return this.httpClient.put<InputSelectDto>(url + genero.id, genero);
  }

  listar(): Observable<InputSelectDto[]> {
    return this.httpClient.get<InputSelectDto[]>(url);
  }

  visualizar(id: number): Observable<InputSelectDto> {
    return this.httpClient.get<InputSelectDto>(url + id);
  }

  excluir(id: number): Observable<void> {
    return this.httpClient.delete<void>(url + id);
  }
}
