import { Injectable } from '@nestjs/common'
import { PortScanJob } from './models/port-scan-job'
import { Job } from '../common/entities/job'
import { InjectRepository, Repository } from '@bryopsida/nest-couchdb'
import { DocumentResponseRow } from 'nano'
import { JobQueueService } from './job-queue.service'

@Injectable()
export class PortScannerService {
  private readonly jobRepository: Repository<Job>
  private readonly queueService: JobQueueService

  constructor(
    @InjectRepository(Job) job: Repository<Job>,
    queueService: JobQueueService,
  ) {
    this.jobRepository = job
    this.queueService = queueService
  }

  public async find(
    offset: number,
    count: number,
  ): Promise<Array<PortScanJob>> {
    const result = await this.jobRepository.list({
      include_docs: true,
      limit: count,
      skip: offset,
      descending: false,
    })
    return result.rows.map((job: DocumentResponseRow<Job>) =>
      PortScanJob.from(job.doc),
    )
  }

  public async count(): Promise<number> {
    const result = await this.jobRepository.list({
      include_docs: false,
      limit: 1,
      skip: 0,
      descending: false,
    })
    return result.total_rows
  }

  public async create(job: PortScanJob): Promise<PortScanJob> {
    const existing = await this.jobRepository.get(job.id)
    const result = await this.jobRepository.insert({
      ...{
        _id: job.id,
        _rev: existing?._rev,
      },
      ...job,
    })
    if (!result.ok) {
      throw new Error('Failed to insert job doc')
    }
    const doc = await this.jobRepository.get(job.id)
    await this.queueService.upsertJobDefinition(job)
    return PortScanJob.from(doc)
  }

  public async delete(id: string): Promise<PortScanJob> {
    const doc = await this.jobRepository.get(id)
    await this.jobRepository.destroy(id, doc._rev)
    await this.queueService.removeJobDefinition(doc)
    return PortScanJob.from(doc)
  }

  public async get(id: string): Promise<PortScanJob> {
    const doc = await this.jobRepository.get(id)
    return PortScanJob.from(doc)
  }
}
