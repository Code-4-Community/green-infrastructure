import { Test, TestingModule } from '@nestjs/testing';

import { AppController } from './app.controller';
import { AppService } from './app.service';

describe('AppController', () => {
  let app: TestingModule;

  beforeAll(async () => {
    app = await Test.createTestingModule({
      controllers: [AppController],
      providers: [AppService],
    }).compile();
  });

  describe('getData', () => {
    it('should return "Hello API"', () => {
      const appController = app.get<AppController>(AppController);
      expect(appController.getData()).toEqual({ message: 'Hello API' });
    });
  });
});
  /* Tests for #24, all applications
  describe('getAllApplications', () => {
    it('should return ...', () => {
      const appController = app.get<AppController>(AppController);
      expect(appController.getAllApplications()).toEqual({});
    });
  });
});
Tests for #24, need to get details for application
  describe('getApplicationDetails', () => {
    it('should return ...', () => {
      const appController = app.get<AppController>(AppController);
      expect(appController.getApplicationDetails({ id: 1 })).toEqual({});
    });
  })
  */
