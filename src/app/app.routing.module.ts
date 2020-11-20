import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CadastroFilmesComponent } from './filmes/cadastro-filmes/cadastro-filmes.component';
import { FilmesModule } from './filmes/filmes.module';
import { ListagemFilmesComponent } from './filmes/listagem-filmes/listagem-filmes.component';
import { VisualizarFilmesComponent } from './filmes/visualizar-filmes/visualizar-filmes.component';
import { ListagemGenerosComponent } from './generos/listagem-generos/listagem-generos.component';

const routes: Routes = [

  {
    path: '',
    redirectTo: 'filmes',
    pathMatch: 'full'
  },
  {
    path: 'filmes',
    component: ListagemFilmesComponent,
    pathMatch: 'full'
  },
  {
    path: 'filmes/cadastro',
    children: [
      {
        path: '',
        component: CadastroFilmesComponent,
      },
      {
        path: ':id',
        component: CadastroFilmesComponent,
      }
    ]
  },
  {
    path: 'generos',
    component: ListagemGenerosComponent
  },
  {
    path: 'filmes/:id',
    component: VisualizarFilmesComponent,
    pathMatch: 'full'
  },
  { path: '**', redirectTo: 'filmes' },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes),
    FilmesModule
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
