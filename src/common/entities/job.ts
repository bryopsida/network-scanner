import { Entity, CouchDbEntity } from '@bryopsida/nest-couchdb'

export interface PortRange {
  startPort: number
  stopPort: number
}

@Entity('network-scanner_jobs')
export class Job extends CouchDbEntity {
  id: string
  networkPartition: string
  portRanges: PortRange[]
  cron: string
}
