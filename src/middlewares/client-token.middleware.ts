import {
  BadRequestException,
  Injectable,
  NestMiddleware,
} from '@nestjs/common';
import { NextFunction, Request, Response } from 'express';
import { UserContext } from 'src/global/contexts/user.context';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class ClientTokenMiddleware implements NestMiddleware {
  constructor(
    private readonly clientContext: UserContext,
    private readonly prisma: PrismaService,
  ) {}
  async use(req: Request, res: Response, next: NextFunction) {
    const clientToken = req.params.clientToken;
    const workspaceMember = await this.prisma.workspaceMember.findUnique({
      where: {
        userCode: clientToken,
      },
    });

    if (!workspaceMember) {
      throw new BadRequestException('Invalid client token');
    }

    this.clientContext.setUserId(workspaceMember.userId);
    next();
  }
}
