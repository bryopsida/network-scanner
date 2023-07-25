import { Processor, Process, InjectQueue } from '@nestjs/bull'
import { Logger } from '@nestjs/common'
import { Job, Queue } from 'bull'
import { Prefix } from 'ip.js'

interface CidrJobOptions {
  prefix: string
}
@Processor('scans.port.cidr')
export class CidrWorker {
  private readonly logger = new Logger(CidrWorker.name)
  private readonly ipQueue: Queue

  constructor(@InjectQueue('scans.port.ip') queue: Queue) {
    this.ipQueue = queue
  }

  @Process()
  async runCidrJob(job: Job<CidrJobOptions>) {
    this.logger.log('Running CIDR scan')
    const cidr = new Prefix(job.data.prefix)
    this.logger.log('Running CIDR scan on: ' + job.data.prefix)
    // slice to one and send IP to IP job runner
    const IPs = cidr.slice(32)
    for (const ip of IPs) {
      await this.ipQueue.add({
        ip: ip.firstIp().toString(),
      })
    }
  }
}
