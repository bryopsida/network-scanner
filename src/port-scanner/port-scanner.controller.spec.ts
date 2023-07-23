import { Test, TestingModule } from '@nestjs/testing'
import { PortScannerController } from './port-scanner.controller'
import { describe, beforeEach, it, expect, jest } from '@jest/globals'
import { PortScannerService } from './port-scanner.service'
jest.mock('./port-scanner.service')

describe('PortScannerController', () => {
  let controller: PortScannerController
  let mockService: jest.MockedObject<PortScannerService>

  beforeEach(async () => {
    mockService = jest.mocked<PortScannerService>(new PortScannerService(), {
      shallow: true,
    })
    const module: TestingModule = await Test.createTestingModule({
      controllers: [PortScannerController],
      providers: [PortScannerService],
    })
      .overrideProvider(PortScannerService)
      .useValue(mockService)
      .compile()

    controller = module.get<PortScannerController>(PortScannerController)
  })

  it('should be defined', () => {
    expect(controller).toBeDefined()
  })
})
