export class InputSelectDto {
  value: any;
  label: string;

  constructor(obj?: any) {
    if (obj) {
      Object.assign(this, obj);
    }
  }
}