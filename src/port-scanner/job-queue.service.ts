import { Injectable } from '@nestjs/common'
import { Job } from '../common/entities/job'

@Injectable()
export class JobQueueService {
  public upsertJobDefinition(job: Job): Promise<void> {
    return Promise.resolve()
  }
  public removeJobDefinition(job: Job): Promise<void> {
    return Promise.resolve()
  }
}
