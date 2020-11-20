import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { take } from 'rxjs/operators';

import { InputSelectDto } from '../shared/components/campos/input-select/dto/input-select.dto';
import { GenerosService } from './generos.service';

@Injectable({
  providedIn: 'root'
})
export class GenerosDataService {
  private _generosSubject = new BehaviorSubject<InputSelectDto[]>([]);

  constructor(private readonly generosService: GenerosService) {}

  get generos$(): Observable<InputSelectDto[]> {
    return this._generosSubject.asObservable();
  }
  set generos(generos: InputSelectDto[]) {
    this._generosSubject.next(generos);
  }

  getGeneros(): void {
    this.generosService.listar().pipe(take(1)).subscribe((generosList: InputSelectDto[]) => this.generos = generosList);
  }

  getGeneroById(generoId: number): string {
    return this._generosSubject.value.find(gen => gen.id === generoId).label;
  }

  editarGenero(genero: InputSelectDto): void {
    this.generosService.editar(genero).subscribe(gene => {
      const i = this._generosSubject.value.findIndex(gen => gen.id === genero.id);
      if (i !== -1) {
        const auxGen = this._generosSubject.value;
        auxGen[i] = genero;
        this.generos = auxGen;
      }
    });
  }

  salvarGenero(label: string): void {
    const id = this.getNextId();
    this.generosService.salvar({ id , label }).subscribe(gen => this.generos = [...this._generosSubject.value, { id , label }]);
  }

  private getNextId(): number {
    const auxGen = [];
    this._generosSubject.value.forEach(gen => auxGen.push(gen.id));
    return Math.max.apply(null, auxGen ) + 1;
  }
}
