import { Processor, Process } from '@nestjs/bull'
import { Logger } from '@nestjs/common'
import { Job } from 'bull'
import * as EvilScan from 'evilscan'

interface IpScanOptions {
  ip: string
}
@Processor('scans.port.ip')
export class IpScanWorker {
  private readonly logger = new Logger(IpScanWorker.name)

  @Process()
  async runIpJob(job: Job<IpScanOptions>) {
    this.logger.log('Scanning ' + job.data.ip)
    const options = {
      target: job.data.ip,
      port: '21,22,23,80,389,443,445,3306,5432,8080,5800,3389,',
      status: 'O', // Timeout, Refused, Open, Unreachable
      banner: true,
    }
    // eslint-disable-next-line no-new
    new EvilScan(options, (err, scan) => {
      if (err) {
        console.log(err)
        return
      }

      scan.on('result', (data) => {
        this.logger.log('Result found on ip: ' + job.data.ip)
        this.logger.log(data)
      })

      scan.on('error', (err) => {
        this.logger.error('Error while scanning', err)
      })

      scan.on('done', () => {
        this.logger.log('Finished scanning ' + job.data.ip)
      })

      scan.run()
    })
  }
}
