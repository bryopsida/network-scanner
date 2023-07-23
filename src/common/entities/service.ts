import { Entity, CouchDbEntity } from '@bryopsida/nest-couchdb'

@Entity('services')
export class Service extends CouchDbEntity {
  id: string
}
