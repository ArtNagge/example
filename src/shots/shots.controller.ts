import { HttpService } from '@nestjs/axios';
import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  ParseUUIDPipe,
  Post,
  Query,
  Req,
  ValidationPipe,
} from '@nestjs/common';
import {
  ApiBody,
  ApiCreatedResponse,
  ApiInternalServerErrorResponse,
  ApiOkResponse,
  ApiOperation,
  ApiParam,
  ApiTags,
} from '@nestjs/swagger';
import Auth from 'src/auth/guards/auth.guard';
import { ShotsService } from './shots.service';
import { ShotsCreateDto } from './types/dto/shots-create.dto';
import { ShotsFilterDto } from './types/dto/shots.dto';
import { ShotsCreateRo } from './types/ro/shots-create.ro';
import { ShotsListAndCountRo } from './types/ro/shots.ro';
import viewsWorker from 'src/common/scripts/views';
import { ConfigService } from '@nestjs/config';

import { Request } from 'express';

@ApiTags('shots')
@Controller('shots')
@ApiInternalServerErrorResponse({ description: 'Internal Server Error' })
export class ShotsController {
  constructor(
    private readonly shotsService: ShotsService,
    private readonly httpService: HttpService,
    private readonly configService: ConfigService,
  ) {}

  @Post()
  @Auth()
  @ApiOperation({
    summary: 'Create shot',
  })
  @ApiBody({
    description: 'Shots object that needs to be added',
    type: ShotsCreateDto,
  })
  @ApiCreatedResponse({
    description: 'Successful operation',
    type: ShotsCreateRo,
  })
  @HttpCode(HttpStatus.CREATED)
  async create(
    @Body(new ValidationPipe()) shotDto: ShotsCreateDto,
    @Req() req: Request,
  ) {
    const { userId } = req.user;

    return await this.shotsService.create({ ...shotDto, user: { id: userId } });
  }

  @Get()
  @Auth()
  @ApiOperation({
    summary: 'Return list of shots with count',
  })
  @ApiOkResponse({
    description: 'Successful operation',
    type: ShotsListAndCountRo,
  })
  @HttpCode(HttpStatus.OK)
  async getAllAndCount(
    @Query() filter: ShotsFilterDto,
    @Req() req: Request,
  ): Promise<ShotsListAndCountRo> {
    const { userId } = req.user;
    const [data, count] = await this.shotsService.findAndCount(filter, userId);

    return { data, count };
  }

  @Delete(':id')
  @Auth()
  @ApiOperation({
    summary: 'Delete a shot',
  })
  @ApiParam({
    description: 'id of shot to delete',
    name: 'id',
  })
  @ApiOkResponse({
    description: 'Successful operation',
  })
  @HttpCode(HttpStatus.NO_CONTENT)
  async remove(
    @Param('id', ParseUUIDPipe) shotId: string,
    @Req() req: Request,
  ) {
    const { userId } = req.user;

    return await this.shotsService.remove(userId, shotId);
  }

  @Post('perform/:id')
  @Auth()
  @ApiParam({
    description: 'id of shot to perform',
    name: 'id',
  })
  @ApiOperation({
    summary: 'Perform shot',
  })
  @HttpCode(HttpStatus.CREATED)
  async perform(
    @Param('id', ParseUUIDPipe) shotId: string,
    @Req() req: Request,
  ) {
    const { userId } = req.user;

    return await this.shotsService.perform(userId, shotId);
  }

  // @Patch(':id')
  // @ApiOperation({
  //   summary: 'Change Shot by id',
  // })
  // @ApiParam({
  //   description: 'Id of shot to change',
  //   name: 'id',
  // })
  // @ApiOkResponse({
  //   description: 'Successful operation',
  //   type: ShotsRo,
  // })
  // @HttpCode(HttpStatus.OK)
  // @ApiInternalServerErrorResponse({ description: 'Internal Server Error' })
  // async change(
  //   @Param('id', ParseUUIDPipe) id: string,
  //   @Body(new ValidationPipe({ transform: true }))
  //   updateShotDto: ShotsUpdateDto,
  // ) {
  //   return await this.shotsService.change(id, updateShotDto);
  // }
}
