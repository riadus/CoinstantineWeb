import { TestBed } from '@angular/core/testing';

import { AccountCreationService } from './account-creation.service';

describe('AccountCreationService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: AccountCreationService = TestBed.get(AccountCreationService);
    expect(service).toBeTruthy();
  });
});
