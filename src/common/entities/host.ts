import { Entity, CouchDbEntity } from '@bryopsida/nest-couchdb'

@Entity('hosts')
export class host extends CouchDbEntity {
  ip: string
  mac: string
}
