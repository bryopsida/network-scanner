import { ApiProperty } from '@nestjs/swagger'
import { Job } from '../../common/entities/job'

export class PortRange {
  @ApiProperty()
  startPort: number

  @ApiProperty()
  stopPort: number
}

export class PortScanJob {
  @ApiProperty()
  id: string

  @ApiProperty()
  cron: string

  @ApiProperty()
  networkPartition: string

  @ApiProperty({
    isArray: true,
    type: PortRange,
  })
  portRanges: PortRange[]

  static from(job: Job): PortScanJob {
    return {
      id: job.id,
      networkPartition: job.networkPartition,
      portRanges: job.portRanges,
      cron: job.cron,
    }
  }
}
