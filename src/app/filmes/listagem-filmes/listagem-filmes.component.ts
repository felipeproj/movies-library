import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { debounceTime } from 'rxjs/operators';
import { FilmesService } from 'src/app/core/filmes.service';
import { InputSelectDto } from 'src/app/shared/components/campos/input-select/dto/input-select.dto';
import { ConfigParams } from 'src/app/shared/models/config-params';
import { Filme } from 'src/app/shared/models/filme';

@Component({
  selector: 'dio-listagem-filmes',
  templateUrl: './listagem-filmes.component.html',
  styleUrls: ['./listagem-filmes.component.scss']
})
export class ListagemFilmesComponent implements OnInit {

  readonly semFoto = 'https://www.tribunadeituverava.com.br/wp-content/uploads/2017/12/sem-foto.gif';
  config: ConfigParams = {
    pagina: 0,
    limite: 4,
  };
  filmes: Filme[] = [];
  generos: InputSelectDto[];
  filtrosListagem: FormGroup;

  constructor(
    private filmesService: FilmesService,
    private fb: FormBuilder,
    private router: Router
  ) { }

  ngOnInit() {
    this.filtrosListagem = this.fb.group({
      texto: [''],
      genero: [''],
    });

    this.filtrosListagem.get('texto')
      .valueChanges
      .pipe(debounceTime(400))
      .subscribe((val: string) => {
        this.config.pesquisa = val;
        this.resetarConsulta();
      });
    this.filtrosListagem.get('genero')
      .valueChanges
      .subscribe((val: string) => {
        this.config.campo = {tipo: 'genero', valor: val};
        this.resetarConsulta();
      });

    this.generos = [
      {label: 'Ação', value: 'Ação'},
      {label: 'Romance', value: 'Romance'},
      {label: 'Aventura', value: 'Aventura'},
      {label: 'Terror', value: 'Terror'},
      {label: 'Ficcção cientifica', value: 'Ficcção cientifica'},
      {label: 'Comédia', value: 'Comédia'},
      {label: 'Drama', value: 'Drama'}
    ];

    this.listarFilmes();
  }

  onScroll(): void {
    this.listarFilmes();
  }

  abrir(id: number): void {
    this.router.navigateByUrl(`/filmes/${id}`);
  }

  private listarFilmes(): void {
    this.config.pagina++;
    this.filmesService.listar(this.config).subscribe({
      next: (filmes: Filme[]) => {
        this.filmes.push(...filmes);
      }
    });
  }

  private resetarConsulta(): void {
    this.config.pagina = 0;
    this.filmes = [];
    this.listarFilmes();
  }

}
