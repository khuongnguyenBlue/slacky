import { Injectable } from '@nestjs/common';

@Injectable()
export class UserContext {
  private userId: number;

  setUserId(userId: number) {
    this.userId = userId;
  }

  getUserId(): number {
    return this.userId;
  }
}
