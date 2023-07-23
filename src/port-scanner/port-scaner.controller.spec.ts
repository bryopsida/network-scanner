import { Test, TestingModule } from '@nestjs/testing'
import { PortScanerController } from './port-scaner.controller'
import { describe, beforeEach, it, expect } from '@jest/globals'

describe('PortScanerController', () => {
  let controller: PortScanerController

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [PortScanerController],
    }).compile()

    controller = module.get<PortScanerController>(PortScanerController)
  })

  it('should be defined', () => {
    expect(controller).toBeDefined()
  })
})
