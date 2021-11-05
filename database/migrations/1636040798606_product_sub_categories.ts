import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class ProductSubCategories extends BaseSchema {
  protected tableName = 'product_sub_categories'

  public async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id')
      table
        .integer('product_category_id')
        .unsigned()
        .references('id')
        .inTable('product_categories')
        .onDelete('CASCADE')
      table.string('name', 255).notNullable().unique()
      table.boolean('status').defaultTo(true)
      table.timestamps(true)
    })
  }

  public async down() {
    this.schema.dropTable(this.tableName)
  }
}
