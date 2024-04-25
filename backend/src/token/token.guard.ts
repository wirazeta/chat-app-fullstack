import { CanActivate, ExecutionContext, Injectable, UnauthorizedException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Request } from 'express';
import { User } from 'src/users/schemas/users.schema';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class TokenGuard implements CanActivate {
  
  constructor(@InjectModel(User.name) private readonly userModel: Model<User>, private jwtService: JwtService){}
  
  async canActivate(
    context: ExecutionContext,
  ): Promise<boolean> {
    const request = context.switchToHttp().getRequest();
    const token = this.extractTokenFromHeader(request);
    if(!token) throw new UnauthorizedException('Please provide token');
    request['user'] = await this.jwtService.decode(token);
    return true;
  }

  private extractTokenFromHeader(req: Request){
    const [type, token] = req.headers.authorization?.split(' ') ?? [];
    return type === 'Bearer' ? token : undefined;
  }
}
