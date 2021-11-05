import { Exception } from '@adonisjs/core/build/standalone'
import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

/*
|--------------------------------------------------------------------------
| Exception
|--------------------------------------------------------------------------
|
| The Exception class imported from `@adonisjs/core` allows defining
| a status code and error code for every exception.
|
| @example
| new EntityNotFoundException('message', 500, 'E_RUNTIME_EXCEPTION')
|
*/
export default class EntityNotFoundException extends Exception {
    public async handle(error: this, ctx: HttpContextContract) {

      ctx.response.header("content-type","application/json; charset=utf-8")
      ctx.response.status(error.status).json({message: error.message,status:error.status})
    }
  }