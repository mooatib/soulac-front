import { Alcohol } from '../alcohol/alcohol.model';
import { Soulacais } from '../soulacais/soulacais.models';

export class Drink {
  id: number;
  soulacais: Soulacais;
  alcohol: Alcohol;
  quantity: number;
  date: Date;
}
