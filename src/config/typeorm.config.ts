import { TypeOrmModuleOptions } from '@nestjs/typeorm';

export const typeOrmConfig: TypeOrmModuleOptions = {
    type: 'postgres',
    host: '127.0.0.1',
    port: 5430,
    username: 'postgres',
    password: 'pass123',
    database: 'task',
    autoLoadEntities: true,
    synchronize: true,
};
