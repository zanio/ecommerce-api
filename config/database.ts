import Env from '@ioc:Adonis/Core/Env'
import { OrmConfig } from '@ioc:Adonis/Lucid/Orm'
import { DatabaseConfig } from '@ioc:Adonis/Lucid/Database'
import  Application  from '@ioc:Adonis/Core/Application';

const databaseConfig: DatabaseConfig & { orm: Partial<OrmConfig> } = {
  connection: Env.get('DB_CONNECTION'),

  connections: {
    pg: {
      client: 'pg',
      connection: Application.inProduction ?
      Env.get('DATABASE_URL') + "?ssl=no-verify":
      {
        host: Env.get('PG_HOST'),
        port: Env.get('PG_PORT'),
        user: Env.get('PG_USER'),
        password: Env.get('PG_PASSWORD', ''),
        database: Env.get('PG_DB_NAME'),
      },
    
      healthCheck: Application.inDev,
			debug: Application.inDev,
    },

/*
I usually use this custom connection to run database migrations on remote database from my local machine. For instance,
node ace migration:run --connection=custom, this will run the migration against you remote database. In order to use this connection, you must set DATABASE_URL in .env file, you can get the value from your heroku dashboard, or by running this command on your terminal: heroku config:get DATABASE_URL --app=your_app_name
*/
    custom: {
      client: "pg",
      connection: Env.get("DATABASE_URL") + "?ssl=no-verify",
    },

  },

  orm: {
  },
}

export default databaseConfig