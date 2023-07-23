import { Test, TestingModule } from '@nestjs/testing'
import { PortScanerService } from './port-scaner.service'
import { describe, beforeEach, it, expect } from '@jest/globals'

describe('PortScanerService', () => {
  let service: PortScanerService

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [PortScanerService],
    }).compile()

    service = module.get<PortScanerService>(PortScanerService)
  })

  it('should be defined', () => {
    expect(service).toBeDefined()
  })
})
