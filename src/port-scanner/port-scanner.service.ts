import { Injectable } from '@nestjs/common'
import { PortScanJob } from './models/port-scan-job'

@Injectable()
export class PortScannerService {
  public find(offset: number, count: number): Promise<Array<PortScanJob>> {
    return Promise.resolve([])
  }

  public count(): Promise<number> {
    return Promise.resolve(0)
  }

  public create(job: PortScanJob): Promise<PortScanJob> {
    return Promise.resolve(new PortScanJob())
  }

  public delete(id: string): Promise<PortScanJob> {
    return Promise.resolve(new PortScanJob())
  }

  public get(id: string): Promise<PortScanJob> {
    return Promise.resolve(new PortScanJob())
  }
}
