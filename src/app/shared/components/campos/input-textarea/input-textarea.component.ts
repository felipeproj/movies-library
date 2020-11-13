import { Component, Input, OnInit } from '@angular/core';
import { AbstractControl, FormGroup } from '@angular/forms';
import { ValidarCamposService } from '../validar-campos.service';

@Component({
  selector: 'dio-input-textarea',
  templateUrl: './input-textarea.component.html',
  styleUrls: ['./input-textarea.component.scss']
})
export class InputTextareaComponent implements OnInit {

  @Input() titulo: string;
  @Input() formGroup: FormGroup;
  @Input() controlName: string;

  get formControl(): AbstractControl {
    return this.formGroup.controls[this.controlName];
  }
  constructor(public validacao: ValidarCamposService) { }

  ngOnInit() {
  }

}
