import { DateTime } from 'luxon'
import Hash from '@ioc:Adonis/Core/Hash'
import { column, beforeSave, BaseModel, hasMany, HasMany } from '@ioc:Adonis/Lucid/Orm'
import { GenderEnum, UserTypeEnum } from 'Contracts/Enum'
import Product from './Product'

export default class User extends BaseModel {
  @column({ isPrimary: true })
  public id: number

  @column()
  public email: string

  @column()
  public firstName: string

  @column()
  public lastName: string

  @column()
  public username: string

  @column()
  public contactNumber: string

  @column()
  public address: string

  @column()
  public gender: GenderEnum | null

  @column()
  public type: UserTypeEnum

  @column({ serializeAs: null })
  public password: string

  @hasMany(() => Product, { localKey: 'id', foreignKey: 'user_id' })
  public products: HasMany<typeof Product>

  @column()
  public rememberMeToken?: string

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime

  @beforeSave()
  public static async hashPassword(user: User) {
    if (user.$dirty.password) {
      user.password = await Hash.make(user.password)
    }
  }
}
