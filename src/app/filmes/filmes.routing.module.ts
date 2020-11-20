import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CadastroFilmesComponent } from './cadastro-filmes/cadastro-filmes.component';
import { ListagemFilmesComponent } from './listagem-filmes/listagem-filmes.component';
import { VisualizarFilmesComponent } from './visualizar-filmes/visualizar-filmes.component';

const routes: Routes = [
  {
    path: '',
    component: ListagemFilmesComponent
  },
  {
    path: 'cadastro',
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
    path: ':id',
    component: VisualizarFilmesComponent,
    pathMatch: 'full'
  },
  { path: '**', redirectTo: 'filmes' },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes),
  ],
  exports: [RouterModule]
})
export class FilmesRoutingModule { }