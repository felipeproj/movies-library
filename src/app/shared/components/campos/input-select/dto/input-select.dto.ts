export class InputSelectDto {
  id: any;
  label: string;

  constructor(obj?: any) {
    if (obj) {
      Object.assign(this, obj);
    }
  }
}