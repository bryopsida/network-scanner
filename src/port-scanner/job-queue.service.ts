import { Injectable } from '@nestjs/common'
import { Job } from '../common/entities/job'
import { Queue } from 'bull'
import { InjectQueue } from '@nestjs/bull'

@Injectable()
export class JobQueueService {
  private readonly jobQueue: Queue

  constructor(@InjectQueue('scans.port.job') private queue: Queue) {
    this.jobQueue = queue
  }

  public async upsertJobDefinition(job: Job): Promise<void> {
    await this.removeJobDefinition(job)
    await this.jobQueue.add(job, {
      repeat: {
        cron: job.cron,
      },
      jobId: job.id,
    })
  }

  public async removeJobDefinition(job: Job): Promise<void> {
    await this.jobQueue.removeRepeatableByKey(job.id)
  }
}
