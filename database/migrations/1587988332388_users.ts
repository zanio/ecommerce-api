import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class UsersSchema extends BaseSchema {
  protected tableName = 'users'

  public async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id').primary()
      table.string('email', 255).notNullable().unique()
      table.string('first_name', 255).notNullable()
      table.string('last_name', 255).notNullable()
      table.string('username', 255).nullable().unique()
      table.string('type', 255).defaultTo('admin').notNullable()
      table.string('gender', 255).notNullable()
      table.string('contact_number', 255).nullable().unique()
      table.string('password', 180).notNullable()
      table.string('address', 180).nullable()
      table.string('remember_me_token').nullable()
      table.timestamps(true)
    })
  }

  public async down() {
    this.schema.dropTable(this.tableName)
  }
}
