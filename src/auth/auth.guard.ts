import {
  BadRequestException,
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { Reflector } from '@nestjs/core';
import { JwtService } from '@nestjs/jwt';
import { Request } from 'express';
import { IS_PUBLIC_KEY } from 'src/decorators/is-public.decorator';
import { JwtPayload } from './auth.dtos';
import { UserContext } from '../global/user-context';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(
    private readonly jwtService: JwtService,
    private readonly configService: ConfigService,
    private readonly reflector: Reflector,
    private readonly userContext: UserContext,
    private readonly prisma: PrismaService,
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const isPublic = this.reflector.getAllAndOverride<boolean>(IS_PUBLIC_KEY, [
      context.getHandler(),
      context.getClass(),
    ]);

    if (isPublic) {
      return true;
    }

    const request = context.switchToHttp().getRequest();
    const memberCode = request.params.memberCode;

    const token = this.extractTokenFromRequest(request);
    if (!token) {
      throw new UnauthorizedException('Invalid token');
    }

    if (!memberCode) {
      throw new BadRequestException('Missing member code');
    }

    try {
      const workspaceMember = await this.prisma.workspaceMember.findUnique({
        where: {
          userCode: memberCode,
        },
      });

      if (!workspaceMember) {
        throw new BadRequestException('Invalid member code');
      }

      const payload: JwtPayload = await this.jwtService.verifyAsync(token, {
        secret: this.configService.get('jwt.secret'),
      });

      if (payload.sub !== workspaceMember.userId) {
        throw new UnauthorizedException('Invalid token');
      }

      this.userContext.setWorkspaceId(workspaceMember.workspaceId);
      this.userContext.setJwtPayload(payload);
    } catch (error) {
      throw new UnauthorizedException();
    }

    return true;
  }

  private extractTokenFromRequest(request: Request): string | undefined {
    const [type, token] = request.headers.authorization?.split(' ') ?? [];
    return type === 'Bearer' ? token : undefined;
  }
}
