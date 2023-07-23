import { Test, TestingModule } from '@nestjs/testing'
import { PortScannerController } from './port-scanner.controller'
import { describe, beforeEach, it, expect } from '@jest/globals'

describe('PortScannerController', () => {
  let controller: PortScannerController

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [PortScannerController],
    }).compile()

    controller = module.get<PortScannerController>(PortScannerController)
  })

  it('should be defined', () => {
    expect(controller).toBeDefined()
  })
})
