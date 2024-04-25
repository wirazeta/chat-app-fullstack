import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Res,
  HttpStatus,
  UseGuards,
  Req,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { UpdateUserDto, CreateUserDto } from './dto/user-query.dto';
import { Response } from 'express';
import { JwtService } from '@nestjs/jwt';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { TokenGuard } from 'src/token/token.guard';
import { CaslAbilityFactory } from 'src/casl/casl-ability.factory/casl-ability.factory';
import { User } from './schemas/users.schema';

enum Action {
  Manage = 'manage',
  Create = 'create',
  Read = 'read',
  Update = 'update',
  Delete = 'delete',
}

@ApiTags('users')
@Controller('users')
export class UsersController {
  constructor(
    private readonly usersService: UsersService,
    private jwtService: JwtService,
    private caslAbilityFactory: CaslAbilityFactory,
  ) { }

  @UseGuards(TokenGuard)
  @Get()
  @ApiBearerAuth()
  async findAll(@Res() res: Response, @Req() req) {
    const data = await this.usersService.findAll(req.user.sub);
    if(!data){
      return res.status(HttpStatus.UNAUTHORIZED).json({
        message: 'failed',
      })
    }
    return res.status(HttpStatus.OK).json({
      message: 'success',
      data,
    });
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.usersService.findOne(+id);
  }

  @UseGuards(TokenGuard)
  @ApiBearerAuth()
  @Patch(':id')
  update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
    return this.usersService.update(+id, updateUserDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.usersService.remove(+id);
  }
}
