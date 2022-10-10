import { debounceTime, distinctUntilChanged, filter, switchMap, tap } from 'rxjs/operators';
import { AcoesService } from './service/acoes.service';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormControl } from '@angular/forms';
import { merge, Subscription } from 'rxjs';

const ESPERA_DIGITACAO = 250;

@Component({
  selector: 'app-acoes',
  templateUrl: './acoes.component.html',
  styleUrls: ['./acoes.component.css'],
})
export class AcoesComponent {
  acoesInput = new FormControl();

  todaAcoes$ = this.acoesService
    .getAcoes()
    .pipe(tap(() => console.log('Fluxo Inicial')));

  filtroPeloInput$ = this.acoesInput.valueChanges.pipe(
    debounceTime(ESPERA_DIGITACAO),
    tap(() => console.log('Fluxo do filtro')),
    tap(console.log),
    filter(
      (valorDigitado) => valorDigitado.length >= 3 || !valorDigitado.length
    ),
    distinctUntilChanged(),
    switchMap((valorDigitado) => this.acoesService.getAcoes(valorDigitado))
  );

  acoes$ = merge(this.todaAcoes$, this.filtroPeloInput$);

  constructor(private acoesService: AcoesService) {}

  // acoes: Acoes;
  // private subcription: Subscription;
  // ngOnInit(){
  //   this.subcription = this.acoesService.getAcoes().subscribe((acoes) => {
  //     this.acoes = acoes;
  //   });
  // }
  // ngOnDestroy() {
  //   this.subcription.unsubscribe();
  // }
}
