import { Alcohol } from '../alcohol/alcohol.model';
import { Soulacais } from '../soulacais/soulacais.models';

export class CreateDrinkForm {
  soulacais: Soulacais;
  alcohol: Alcohol;
  quantity: number;
  date: Date;
}
export class UpdateDrinkForm {
  id: number;
  soulacais: Soulacais;
  alcohol: Alcohol;
  quantity: number;
  date: Date;
}
