import { Module } from '@nestjs/common'
import { PortScannerController } from './port-scanner.controller'
import { PortScannerService } from './port-scanner.service'
import { BullModule } from '@nestjs/bull'

@Module({
  imports: [
    BullModule.registerQueue({
      name: 'scans.port.job',
    }),
    BullModule.registerQueue({
      name: 'scans.port.cidr',
    }),
    BullModule.registerQueue({
      name: 'scans.port.ip',
    }),
  ],
  controllers: [PortScannerController],
  providers: [PortScannerService],
})
export class PortScannerModule {}
