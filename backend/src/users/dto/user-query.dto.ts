import { IsString, IsEmail, IsOptional } from 'class-validator';
import { ApiProperty, PartialType } from '@nestjs/swagger';

// Filtering Email and Name from MongoDB Schema
export class UserQueryDto{
    @IsString()
    @IsOptional()
    _id?:string;

    @IsString()
    @IsOptional()
    name?: string;

    @IsEmail()
    @IsOptional()
    email?:string;

    constructor(init?:Partial<UserQueryDto>){
        Object.assign(this,init);
    }
}

export class CreateUserDto{
    @IsString()
    @ApiProperty()
    name:string;

    @IsEmail()
    @ApiProperty()
    email:string;

    @IsString()
    @ApiProperty()
    password:string;

    @IsString()
    @IsOptional()
    @ApiProperty()
    pic?:string;

    constructor(init?:Partial<CreateUserDto>){
        Object.assign(this,init);
    }
}

// Login User DTO

export class LoginUserDto{
    @IsEmail()
    @ApiProperty()
    email:string;

    @IsString()
    @ApiProperty()
    password:string;

    constructor(init?:Partial<LoginUserDto>){
        Object.assign(this,init);
    }
}

// Update User DTO
export class UpdateUserDto extends PartialType(CreateUserDto){
    @IsString()
    @IsOptional()
    _id?:string;

    @IsString()
    @IsOptional()
    @ApiProperty()
    name: string;
    
    @IsString()
    @IsOptional()
    @ApiProperty()
    password: string;
    
    @IsEmail()
    @IsOptional()
    @ApiProperty()
    email: string;
}

// Delete User DTO
export class DeleteUserDTO extends PartialType(CreateUserDto){
    @IsString()
    @IsOptional()
    _id?:string;
}