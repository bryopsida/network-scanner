import { Test, TestingModule } from '@nestjs/testing'
import { PortScannerService } from './port-scanner.service'
import { describe, beforeEach, it, expect } from '@jest/globals'

describe('PortScannerService', () => {
  let service: PortScannerService

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [PortScannerService],
    }).compile()

    service = module.get<PortScannerService>(PortScannerService)
  })

  it('should be defined', () => {
    expect(service).toBeDefined()
  })
})
