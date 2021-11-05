import { DateTime } from 'luxon'
import { BaseModel, belongsTo, BelongsTo, column, hasOne, HasOne } from '@ioc:Adonis/Lucid/Orm'
import ProductCategory from './ProductCategory'
import ProductSubCategory from './ProductSubCategory'
import User from './User'

export default class Product extends BaseModel {
  @column({ isPrimary: true })
  public id: number

  @column()
  public title: string

  @column()
  public description: string

  @column()
  public price: number

  @column()
  public user_id: number

  @column()
  public product_category_id: number

  @column()
  public product_sub_category_id: number

  @belongsTo(() => User, { localKey: 'user_id', foreignKey: 'id' })
  public creator: BelongsTo<typeof User>

  @hasOne(() => ProductCategory, { localKey: 'product_category_id', foreignKey: 'id' })
  public productCategory: HasOne<typeof ProductCategory>

  @hasOne(() => ProductSubCategory, { localKey: 'product_sub_category_id', foreignKey: 'id' })
  public productSubCategory: HasOne<typeof ProductSubCategory>

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime
}
