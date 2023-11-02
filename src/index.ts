import { ShardingManager } from 'discord.js';
import dotenv from 'dotenv';
import path from 'path';
import customLogger from './helpers/custom-logger';
dotenv.config();

customLogger();

const manager = new ShardingManager(path.join(__dirname, './bot.ts'), {
  token: process.env.TOKEN!,
  execArgv: ['-r', 'ts-node/register'],
});

manager.on('shardCreate', (shard) =>
  console.log(`Launched shard ${shard.id || 0 + 1}`),
);

manager.spawn();
