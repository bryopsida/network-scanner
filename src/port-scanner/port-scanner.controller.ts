import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Put,
  Query,
} from '@nestjs/common'
import { FindAllResponse } from './models/find-all-response'
import { PortScannerService } from './port-scanner.service'
import {
  ApiBadRequestResponse,
  ApiCreatedResponse,
  ApiOkResponse,
  ApiParam,
  ApiQuery,
  ApiTags,
} from '@nestjs/swagger'
import { PortScanJob } from './models/port-scan-job'
import { CreateJobResponse } from './models/create-job-response'
import { DeleteJobResponse } from './models/delete-job-response'
import { GetJobResponse } from './models/get-job-response'

@ApiTags('port-scanner')
@Controller('port-scanner')
export class PortScannerController {
  private readonly jobService: PortScannerService
  constructor(jobService: PortScannerService) {
    this.jobService = jobService
  }

  @ApiOkResponse({
    type: FindAllResponse,
  })
  @ApiQuery({
    name: 'offset',
    type: 'string',
  })
  @ApiQuery({
    name: 'offset',
    type: 'string',
  })
  @ApiBadRequestResponse()
  @Get()
  async findAll(
    @Query('offset') offset: number,
    @Query('count') count: number,
  ): Promise<FindAllResponse> {
    const jobs = await this.jobService.find(offset, count)
    const total = await this.jobService.count()
    return {
      offset,
      count,
      portScanJobs: jobs,
      total,
    }
  }

  @ApiCreatedResponse({
    type: CreateJobResponse,
  })
  @ApiBadRequestResponse()
  @Put()
  async createOrUpdate(
    @Body() portScanJob: PortScanJob,
  ): Promise<CreateJobResponse> {
    const result = await this.jobService.create(portScanJob)
    return result
  }

  @ApiOkResponse({
    type: DeleteJobResponse,
  })
  @ApiBadRequestResponse()
  @ApiParam({
    name: 'id',
    type: 'string',
  })
  @Delete(':id')
  async delete(@Param() id: string): Promise<DeleteJobResponse> {
    return Promise.resolve(this.jobService.delete(id))
  }

  @ApiOkResponse({
    type: GetJobResponse,
  })
  @ApiBadRequestResponse()
  @ApiParam({
    name: 'id',
    type: 'string',
  })
  @Get(':id')
  async getJob(@Param() id: string): Promise<GetJobResponse> {
    return Promise.resolve(this.jobService.get(id))
  }
}
