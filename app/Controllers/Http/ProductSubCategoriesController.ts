import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import ProductSubCategory from 'App/Models/ProductSubCategory'
import { schema, rules } from '@ioc:Adonis/Core/Validator'


export default class ProductSubCategoriesController {
  public async index({}: HttpContextContract) {
    const productSubCategory = await ProductSubCategory.query()
    return productSubCategory
  }
  public async store({  request, }: HttpContextContract) {
    const productSchema = schema.create({
      name: schema.string({ trim: true }, [rules.required(), rules.minLength(3)]),
      productCategoryId: schema.number([
        rules.required(),
        rules.exists({ table: 'product_categories', column: 'id' }),
      ]),
    })
    const { name, productCategoryId } = await request.validate({ schema: productSchema })
    const productSubCategory = new ProductSubCategory()
    productSubCategory.name = name
    productSubCategory.product_category_id = productCategoryId
    const result = await productSubCategory.save()
    return result
  }
  public async show({  params, response }: HttpContextContract) {
    try {
      const productSubCategory = await ProductSubCategory.find(params.id)
      const errorMessage = `entity not found for id ${params.id}`
      if (!productSubCategory) {
        response.header('content-type', 'application/json; charset=utf-8')
        response.badRequest({ errorMessage })
      }
      return productSubCategory
    } catch (error) {
      console.log(error)
    }
  }
  public async update({  request, params, response }: HttpContextContract) {
    const productSubCategory = await ProductSubCategory.find(params.id)
    const errorMessage = `entity not found for id ${params.id}`
    const productSchema = schema.create({
      name: schema.string({ trim: true }, [rules.required(), rules.minLength(3)]),
    })
    const { name } = await request.validate({ schema: productSchema })
    if (!productSubCategory) {
      response.header('content-type', 'application/json; charset=utf-8')
      response.badRequest({ errorMessage })
    }
    if (productSubCategory) {
      productSubCategory.name = name ? name : productSubCategory.name
      if (await productSubCategory.save()) {
        return productSubCategory
      }
      return // 422
    }
    return // 401
  }
  public async destroy({  params, response }: HttpContextContract) {
    const productSubCategory = await ProductSubCategory.find(params.id)
    const errorMessage = `entity not found for id ${params.id}`
    if (!productSubCategory) {
      response.header('content-type', 'application/json; charset=utf-8')
      response.badRequest({ errorMessage })
    }
    await ProductSubCategory.query().where('id', params.id).delete()
    return response.json({ productId: params.id, message: 'item deleted' })
  }
}
