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

  describe('getAllApplications', () => {
    it('should return ...', () => {
      const appController = app.get<AppController>(AppController);
      expect(appController.getAllApplications()).toEqual({});
    });
  });

  describe('getApplicationDetails', () => {
    it('should return ...', () => {
      const appController = app.get<AppController>(AppController);
      expect(appController.getApplicationDetails({ id: 1 })).toEqual({});
    });
  });
});
