import { Processor, Process, InjectQueue } from '@nestjs/bull'
import { Logger } from '@nestjs/common'
import { Job, Queue } from 'bull'

@Processor('scans.port.cidr')
export class ImageListWorker {
  private readonly logger = new Logger(ImageListWorker.name)
  private readonly ipQueue: Queue

  constructor(@InjectQueue('scans.port.ip') queue: Queue) {
    this.ipQueue = queue
  }

  @Process()
  async runCidrJob(job: Job<unknown>) {}
}
