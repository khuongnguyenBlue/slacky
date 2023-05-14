import { Injectable } from '@nestjs/common';
import { JwtPayload } from '../auth/auth.dtos';

@Injectable()
export class UserContext {
  private jwtPayload: JwtPayload;
  private workspaceId: number;

  setWorkspaceId(workspaceId: number) {
    this.workspaceId = workspaceId;
  }

  getWorkspaceId(): number {
    return this.workspaceId;
  }

  setJwtPayload(payload: JwtPayload) {
    this.jwtPayload = payload;
  }

  getJwtPayload(): JwtPayload {
    return this.jwtPayload;
  }
}
