-- CreateIndex
CREATE INDEX `messages_channelId_createdAt_idx` ON `messages`(`channelId`, `createdAt`);

-- CreateIndex
CREATE INDEX `threadMessages_threadId_createdAt_idx` ON `threadMessages`(`threadId`, `createdAt`);
