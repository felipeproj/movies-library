import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { ListagemGenerosComponent } from './listagem-generos/listagem-generos.component';
import { MaterialModule } from '../shared/material/material.module';
import { CamposModule } from '../shared/components/campos/campos.module';

@NgModule({
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FormsModule,
    CamposModule,
    MaterialModule
  ],
  declarations: [ListagemGenerosComponent]
})
export class GenerosModule { }
