import { Options } from '@angular-slider/ngx-slider/options';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MTX_DATETIME_FORMATS } from '@ng-matero/extensions/core';
import {
  MtxCalendarView,
  MtxDatetimepickerMode,
  MtxDatetimepickerType,
} from '@ng-matero/extensions/datetimepicker';
import { firstValueFrom, map, Observable, startWith } from 'rxjs';
import { Alcohol } from 'src/app/models/alcohol/alcohol.model';
import { CreateDrinkForm } from 'src/app/models/drink/drink-form.model';
import { Drink } from 'src/app/models/drink/drink.model';
import { Page } from 'src/app/models/page.model';
import { Soulacais } from 'src/app/models/soulacais/soulacais.models';
import { AlcoholService } from 'src/app/services/alcohol/alcohol.service';
import { DrinkService } from 'src/app/services/drink/drink.service';
import { SoulacaisService } from 'src/app/services/soulacais/soulacais.service';
interface SimpleSliderModel {
  value: number;
  options: Options;
}
@Component({
  selector: 'app-drink-form',
  templateUrl: './drink-form.component.html',
  styleUrls: ['./drink-form.component.scss'],
  providers: [
    {
      provide: MTX_DATETIME_FORMATS,
      useValue: {
        parse: {
          dateInput: 'YYYY-MM-DD',
          monthInput: 'MMMM',
          timeInput: 'HH:mm',
          datetimeInput: 'YYYY-MM-DD HH:mm',
        },
        display: {
          dateInput: 'YYYY-MM-DD',
          monthInput: 'MMMM',
          timeInput: 'HH:mm',
          datetimeInput: 'YYYY-MM-DD HH:mm',
          monthYearLabel: 'YYYY MMMM',
          dateA11yLabel: 'LL',
          monthYearA11yLabel: 'MMMM YYYY',
          popupHeaderDateLabel: 'MMM DD, ddd',
        },
      },
    },
  ],
})
export class DrinkFormComponent implements OnInit {
  loggedSoulacais: Soulacais = new Soulacais();
  page = new Page();
  drink = new CreateDrinkForm();
  lastDrink: Drink;
  createDrinkForm = new FormGroup({});
  alcoholControl: FormControl = new FormControl('', [Validators.required]);
  quantityControl: FormControl = new FormControl(0, [
    Validators.required,
    Validators.min(1),
  ]);
  dateTimeControl: FormControl = new FormControl('', [Validators.required]);
  type: MtxDatetimepickerType = 'datetime';
  mode: MtxDatetimepickerMode = 'auto';
  startView: MtxCalendarView = 'clock';
  touchUi = true;
  twelvehour = false;
  timeInterval = 1;
  alcohols: Alcohol[];
  filteredAlcohols: Observable<Alcohol[]>;
  isLoading = false;

  drinkSlider: SimpleSliderModel = {
    value: 0,
    options: {
      vertical: true,
      showTicksValues: true,
      stepsArray: [
        { value: 0 },
        { value: 15 },
        { value: 25 },
        { value: 33 },
        { value: 50 },
      ],
    },
  };
  constructor(
    private soulacaisService: SoulacaisService,
    private drinkService: DrinkService,
    private alcoholService: AlcoholService
  ) {}

  ngOnInit(): void {
    this.isLoading = true;
    this.loggedSoulacais = this.soulacaisService.getLoggedInSoulacais();
    // this.drinkService.getDrinks();
    firstValueFrom(this.alcoholService.getAlcohols(this.page))
      .then((result) => {
        this.alcohols = result;
        this.drinkService.getLastUserDrink(this.loggedSoulacais.id).subscribe({
          next: (result) => {
            this.lastDrink = result;
            console.log(this.lastDrink.date);
            this.alcoholControl.setValue(this.lastDrink.alcohol);
            this.quantityControl.setValue(this.lastDrink.quantity);
            this.dateTimeControl.setValue(new Date(this.lastDrink.date));
          },
        });
      })
      .finally(() => {
        this.isLoading = false;
        this.createDrinkForm = new FormGroup({
          alcoholControl: this.alcoholControl,
          quantityControl: this.quantityControl,
          dateTimeControl: this.dateTimeControl,
        });
        this.filteredAlcohols = this.alcoholControl.valueChanges.pipe(
          startWith(''),
          map((alcohol) =>
            alcohol ? this.filter(alcohol.name) : this.alcohols.slice()
          )
        );
      });
  }

  getAlcoholName(alcohol: Alcohol) {
    return alcohol ? alcohol.name + ', ' + alcohol.percentage + '%' : '';
  }

  private filter(value: String): any[] {
    const filterValue = value.toLowerCase();

    return this.alcohols.filter((alcohol) =>
      alcohol.name.toLowerCase().includes(filterValue)
    );
  }

  submit() {
    const drink = this.rawToModel(this.createDrinkForm.getRawValue());
    this.drinkService.createDrink(drink);
  }

  rawToModel(drinkRaw: any): CreateDrinkForm {
    this.drink.soulacais = this.loggedSoulacais;
    this.drink.alcohol = drinkRaw.alcoholControl;
    this.drink.quantity = drinkRaw.quantityControl;
    this.drink.date = drinkRaw.dateTimeControl;
    return this.drink;
  }
}
