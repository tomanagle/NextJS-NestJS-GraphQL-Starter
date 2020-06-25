import { Test, TestingModule } from '@nestjs/testing';
import { HealthzController } from './healthz.controller';

describe('Healthz Controller', () => {
  let controller: HealthzController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [HealthzController],
    }).compile();

    controller = module.get<HealthzController>(HealthzController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
