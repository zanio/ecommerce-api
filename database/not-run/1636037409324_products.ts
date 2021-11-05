import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class Products extends BaseSchema {
  protected tableName = 'products'

  public async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id')
      table.integer('product_category_id').unsigned().references('id').inTable('product_categories')
      table
        .integer('product_sub_category_id')
        .unsigned()
        .references('id')
        .inTable('product_sub_categories')
      table.string('title', 255).notNullable()
      table.string('description', 2000).nullable()
      table.bigInteger('price').notNullable()
      table.timestamps(true)
    })
  }

  public async down() {
    this.schema.dropTable(this.tableName)
  }
}
