import { Component, OnInit } from "@angular/core";
import { AbstractControl, FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { GenerosDataService } from 'src/app/core/generos-data.service';
import { InputSelectDto } from 'src/app/shared/components/campos/input-select/dto/input-select.dto';

@Component({
  templateUrl: './listagem-generos.component.html',
  styleUrls: ['./listagem-generos.componente.scss']
})
export class ListagemGenerosComponent implements OnInit {
  generosForm: FormGroup;
  novoGenero: FormGroup;
  generosList: InputSelectDto[];
  displayedColumns: string[] = ['label', 'actions'];

  constructor(
    private generosDataService: GenerosDataService,
    private fb: FormBuilder
  ) {
    this.generosForm = this.fb.group({
      generos: this.fb.array([])
    });
    this.novoGenero = this.fb.group({
      label: ['', Validators.required]
    });
  }

  get generos(): FormArray {
    return this.generosForm.get('generos') as FormArray;
  }

  ngOnInit(): void {
    this.generosDataService.generos$.subscribe(generosList => {
      if (generosList && generosList.length === 0) {
        this.generosDataService.getGeneros();
      } else {
        this.generosList = generosList;
        this.clearFormArray();
        this.generosList.forEach(generos => this.generos.push(this.fb.group(generos)));
        // this.generosForm.controls['generos'] = this.fb.array(this.generosList);
      }
      console.log('array controls', this.generos.controls);
    });
  }

  editar(control: AbstractControl) {
    this.generosDataService.editarGenero(control.value);
  }

  submit(): void {
    this.novoGenero.markAllAsTouched();
    if (this.novoGenero.invalid) {
      return;
    }

    this.generosDataService.salvarGenero(this.novoGenero.get('label').value);
  }

  reiniciarForm(): void {
    this.novoGenero.reset();
  }

  private clearFormArray(): void {
    while (this.generos.length > 0) {
      this.generos.removeAt(0);
    }
  }
}