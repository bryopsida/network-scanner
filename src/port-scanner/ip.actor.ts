import { Processor, Process } from '@nestjs/bull'
import { Logger } from '@nestjs/common'
import { Job } from 'bull'

@Processor('scans.port.ip')
export class IpScanWorker {
  private readonly logger = new Logger(IpScanWorker.name)

  @Process()
  async runIpJob(job: Job<unknown>) {}
}
