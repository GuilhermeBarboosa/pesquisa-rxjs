/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { AcoesService } from './acoes.service';

describe('Service: Acoes', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [AcoesService]
    });
  });

  it('should ...', inject([AcoesService], (service: AcoesService) => {
    expect(service).toBeTruthy();
  }));
});
