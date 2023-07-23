import { Module } from '@nestjs/common'
import { PortScanerController } from './port-scaner.controller'
import { PortScanerService } from './port-scaner.service'

@Module({
  controllers: [PortScanerController],
  providers: [PortScanerService],
})
export class PortScannerModule {}
