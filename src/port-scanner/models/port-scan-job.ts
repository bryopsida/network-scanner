import { ApiProperty } from '@nestjs/swagger'

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
  cidr: string

  @ApiProperty({
    isArray: true,
    type: PortRange,
  })
  portRanges: PortRange[]
}
