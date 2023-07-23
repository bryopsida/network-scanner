import { ApiProperty } from '@nestjs/swagger'
import { PortScanJob } from './port-scan-job'

export class FindAllResponse {
  @ApiProperty()
  offset: number

  @ApiProperty()
  count: number

  @ApiProperty()
  total: number

  @ApiProperty({
    isArray: true,
    type: PortScanJob,
  })
  portScanJobs: PortScanJob[]
}
