import customLogger from './helpers/custom-logger';
import { ShardingManager } from 'discord.js';
import dotenv from 'dotenv';
import { map, split, toNumber } from 'lodash';
import path from 'path';
dotenv.config();

customLogger();

const manager = new ShardingManager(path.join(__dirname, './bot.js'), {
  token: process.env.TOKEN!,
  shardList: map(split(process.env.SHARD_LIST!, ','), toNumber),
  totalShards: toNumber(process.env.TOTAL_SHARDS!),
  mode: 'worker',
});

manager.on('shardCreate', (shard) =>
  console.log(`Launched shard ${shard.id || 0 + 1}`),
);

manager.spawn();
