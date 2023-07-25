import { Processor, Process, InjectQueue } from '@nestjs/bull'
import { Logger } from '@nestjs/common'
import { Job, Queue } from 'bull'
import { Prefix } from 'ip.js'

interface ScanJobOptions {
  cron: string
  id: string
  networkPartition: string
}

@Processor('scans.port.job')
export class ScanManager {
  private readonly logger = new Logger(ScanManager.name)
  private readonly cidrQueue: Queue

  constructor(@InjectQueue('scans.port.cidr') queue: Queue) {
    this.cidrQueue = queue
  }

  @Process()
  async runScanJob(job: Job<ScanJobOptions>) {
    this.logger.log('Running top level job for network scan', job)
    // need to split the cidr defined here into smaller pieces
    // queue those slices into the cidr queue
    // await all of those results completion here to tie back overall
    const prefix = new Prefix(job.data.networkPartition)
    const slices = prefix.slice(24)
    for (const slice of slices) {
      await this.cidrQueue.add({
        prefix: slice.toString(),
      })
    }
  }
}
