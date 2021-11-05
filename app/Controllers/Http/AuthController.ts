import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import User from 'App/Models/User'
import { GenderEnum, UserTypeEnum } from 'Contracts/Enum'
import { schema, rules } from '@ioc:Adonis/Core/Validator'

export default class AuthController {
  public async login({ request, auth }: HttpContextContract) {
    const email = request.input('email')
    const password = request.input('password')
    const token = await auth.use('api').attempt(email, password, {
      expiresIn: '10 days',
    })
    return token.toJSON()
  }
  public async register({ request, auth }: HttpContextContract) {
    const productSchema = schema.create({
      email: schema.string({ trim: true }, [
        rules.required(),
        rules.minLength(3),
        rules.email(),
        rules.unique({ table: 'users', column: 'email' }),
      ]),
      firstName: schema.string({ trim: true }, [rules.required(), rules.minLength(3)]),
      password: schema.string({ trim: false }, [rules.required(), rules.minLength(3)]),
      lastName: schema.string({ trim: true }, [rules.required(), rules.minLength(3)]),
      type: schema.string.optional({}, [rules.minLength(3)]),
      username: schema.string.optional({}, [rules.minLength(3)]),
      contactNumber: schema.string.optional({ trim: true }, [
        rules.mobile(),
        rules.unique({ table: 'users', column: 'contact_number' }),
      ]),
      gender: schema.string({ trim: true }, [rules.required(), rules.minLength(3)]),
    })
    const payload = await request.validate({ schema: productSchema })
    const { email, firstName, lastName, type, password, gender, contactNumber, username } = payload

    const userType = type as UserTypeEnum
    const genderEnum = gender as GenderEnum
    const contactNumberType = contactNumber as string
    const usernameType = username as string

    const newUser = new User()
    newUser.email = email
    newUser.password = password
    newUser.firstName = firstName
    newUser.lastName = lastName
    newUser.type = userType
    newUser.gender = genderEnum
    newUser.contactNumber = contactNumberType
    newUser.username = usernameType
    await newUser.save()
    const token = await auth.use('api').login(newUser, {
      expiresIn: '10 days',
    })
    return token.toJSON()
  }
}
