import { DateTime } from 'luxon'
import { BaseModel, column, hasOne, HasOne } from '@ioc:Adonis/Lucid/Orm'
import ProductCategory from './ProductCategory'

export default class ProductSubCategory extends BaseModel {
  @column({ isPrimary: true })
  public id: number

  @column()
  public name: string

  @column()
  public status: boolean

  @column()
  public product_category_id: number

  @hasOne(() => ProductCategory, { localKey: 'product_category_id', foreignKey: 'id' })
  public productCategory: HasOne<typeof ProductCategory>

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime
}
