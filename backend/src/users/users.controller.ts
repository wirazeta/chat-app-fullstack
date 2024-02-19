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
} from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { JwtService } from '@nestjs/jwt';

@Controller('users')
export class UsersController {
  constructor(
    private readonly usersService: UsersService,
    private jwtService: JwtService,
  ) {}

  @Post()
  async create(@Body() createUserDto: CreateUserDto, @Res() res) {
    const { name, email, password } = createUserDto;
    if (!name || !email || !password) {
      return res
        .status(HttpStatus.BAD_REQUEST)
        .json({ msg: 'Please enter all fields' });
    }
    const user = await this.usersService.create(createUserDto);

    console.log(user._id.toString());

    const token = await this.jwtService.signAsync({ id: user._id.toString() });

    console.log(token);

    return res.status(HttpStatus.OK).json({
      msg: 'User created successfully',
      user,
      token: token,
    });
  }

  @Get()
  async findAll() {
    console.log(await this.usersService.findAll());
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.usersService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
    return this.usersService.update(+id, updateUserDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.usersService.remove(+id);
  }
}
