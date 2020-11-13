import { Component, Input, OnInit } from '@angular/core';
import { AbstractControl, FormGroup } from '@angular/forms';
import { ValidarCamposService } from '../validar-campos.service';
import { InputSelectDto } from './dto/input-select.dto';

@Component({
  selector: 'dio-input-select',
  templateUrl: './input-select.component.html',
  styleUrls: ['./input-select.component.scss']
})
export class InputSelectComponent implements OnInit {

  @Input() titulo: string;
  @Input() formGroup: FormGroup;
  @Input() controlName: string;
  @Input() opcoes: InputSelectDto[];

  get formControl(): AbstractControl {
    return this.formGroup.controls[this.controlName];
  }

  constructor(public validacao: ValidarCamposService) { }

  ngOnInit() {
  }

}
