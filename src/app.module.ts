import { Module } from '@nestjs/common'
import { ConfigModule } from '@nestjs/config'
import { HealthModule } from './health/health.module'
import { LoggerModule } from 'nestjs-pino'
import { PortScannerModule } from './port-scanner/port-scanner.module'
import { CommonModule } from './common/common.module'
import { CouchDbModule } from '@bryopsida/nest-couchdb'

@Module({
  imports: [
    ConfigModule.forRoot(),
    LoggerModule.forRoot(),
    CouchDbModule.forRoot({
      url: process.env.COUCHDB_URL ?? 'http://localhost:5984',
      username: process.env.COUCHDB_USER ?? 'couchdb',
      userpass: process.env.COUCHDB_PASSWORD ?? 'password',
      requestDefaults: { jar: true },
    }),
    HealthModule,
    PortScannerModule,
    CommonModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
