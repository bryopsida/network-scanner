import { Module } from '@nestjs/common'
import { PortScannerController } from './port-scanner.controller'
import { PortScannerService } from './port-scanner.service'
import { BullModule } from '@nestjs/bull'
import { Job } from '../common/entities/job'
import { CouchDbModule } from '@bryopsida/nest-couchdb'
import { JobQueueService } from './job-queue.service'
import { CidrWorker } from './cidr.actor'
import { IpScanWorker } from './ip.actor'
import { ScanManager } from './job.actor'

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
    CouchDbModule.forFeature([Job]),
  ],
  controllers: [PortScannerController],
  providers: [
    PortScannerService,
    JobQueueService,
    CidrWorker,
    IpScanWorker,
    ScanManager,
  ],
})
export class PortScannerModule {}
