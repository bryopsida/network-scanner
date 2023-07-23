import { Entity, CouchDbEntity } from '@bryopsida/nest-couchdb'

@Entity('jobs')
export class Job extends CouchDbEntity {
  id: string
}
