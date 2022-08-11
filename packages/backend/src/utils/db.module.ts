import { Module } from '@nestjs/common';
import { MongoClient, Db } from 'mongodb';
import { ConfigModule, ConfigService } from '@nestjs/config';
import constants from './constants';

@Module({
  imports: [ConfigModule],
  providers: [
    {
      provide: 'DATABASE_CONNECTION',
      inject: [ConfigService],
      useFactory: async (configService: ConfigService): Promise<Db> => {
        try {
          const client = await MongoClient.connect(
            configService.get(constants.database_url_env),
          );

          const db = client.db(configService.get(constants.database_name_env));
          await db
            .collection('users')
            .createIndex({ email: 1 }, { unique: true, sparse: true });

          return db;
        } catch (e) {
          throw e;
        }
      },
    },
  ],
  exports: ['DATABASE_CONNECTION'],
})
export class DatabaseModule {}
