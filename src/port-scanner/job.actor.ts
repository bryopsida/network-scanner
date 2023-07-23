import { Processor, Process, InjectQueue } from '@nestjs/bull'
import { Logger } from '@nestjs/common'
import { Job, Queue } from 'bull'

@Processor('scans.port.job')
export class ImageListWorker {
  private readonly logger = new Logger(ImageListWorker.name)
  private readonly cidrQueue: Queue

  constructor(@InjectQueue('scans.port.cidr') queue: Queue) {
    this.cidrQueue = queue
  }

  @Process()
  async runScanJob(job: Job<unknown>) {}
}
