import { Test } from '@nestjs/testing';

import { AppService } from './app.service';

describe('AppService', () => {
  let service: AppService;

  beforeAll(async () => {
    const app = await Test.createTestingModule({
      providers: [AppService],
    }).compile();

    service = app.get<AppService>(AppService);
  });

  describe('getData', () => {
    it('should return "Hello API"', () => {
      expect(service.getData()).toEqual({ message: 'Hello API' });
    });
  });
});

  /* Ticket #24 
  describe('getAllApplications', () => {
    it('should return ...', () => {
      expect(service.getAllApplications()).toEqual({});
    });
  });
  Ticket #24
  describe('getApplicationDetails', () => {
    it('should return ...', () => {
      expect(
        service.getApplicationDetails('GIApplications', { key: 1 }),
      ).toEqual({});
    });
  });
});
*/
