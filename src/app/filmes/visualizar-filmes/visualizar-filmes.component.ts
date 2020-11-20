import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { FilmesService } from 'src/app/core/filmes.service';
import { GenerosDataService } from 'src/app/core/generos-data.service';
import { AlertaComponent } from 'src/app/shared/components/alerta/alerta.component';
import { ValidarCamposService } from 'src/app/shared/components/campos/validar-campos.service';
import { Alerta } from 'src/app/shared/models/alerta';
import { Filme } from 'src/app/shared/models/filme';

@Component({
  selector: 'dio-visualizar-filmes',
  templateUrl: './visualizar-filmes.component.html',
  styleUrls: ['./visualizar-filmes.component.scss']
})
export class VisualizarFilmesComponent implements OnInit {
  
  readonly semFoto = 'https://www.tribunadeituverava.com.br/wp-content/uploads/2017/12/sem-foto.gif';
  filme: Filme;
  id: number;

  constructor(
    public validacao: ValidarCamposService,
    public dialog: MatDialog,
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private filmesService: FilmesService,
    private generosDataService: GenerosDataService
  ) { }

  ngOnInit() {
    this.id = +this.activatedRoute.snapshot.paramMap.get('id');
    this.visualizar();
  }

  editar(): void {
    this.router.navigateByUrl('/filmes/cadastro/' + this.id);
  }

  excluir(): void {
    const config = {
      data: {
        titulo: 'Tem certeza de que deseja excluir?',
        descricao: 'Caso tenha certeza de que queira excluir clique no botão Ok',
        corBtnCancelar: 'primary',
        corBtnSucesso: 'warn',
        possuiBtnFechar: true
      } as Alerta
    };
    const dialogRef = this.dialog.open(AlertaComponent, config);

    dialogRef.afterClosed().subscribe((opcao: boolean) => {
      if (opcao) {
        this.filmesService.excluir(this.id).subscribe(() => this.router.navigateByUrl('/filmes'));
      }
    });
  }

  encontrarGenero(generoId: number): string {
    return this.generosDataService.getGeneroById(generoId);
  }

  private visualizar(): void {
    this.filmesService.visualizar(this.id).subscribe((filme: Filme) => this.filme = filme);
  }

}
