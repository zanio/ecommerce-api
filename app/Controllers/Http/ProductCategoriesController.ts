import { HttpContextContract } from "@ioc:Adonis/Core/HttpContext";
import ProductCategory from "App/Models/ProductCategory";

import { rules, schema } from "@ioc:Adonis/Core/Validator";

export default class ProductCategoriesController {
  public async index({}: HttpContextContract) {
    const productCategory = await ProductCategory.query()
    return productCategory
  }
  public async store({ request }: HttpContextContract) {
    const productSchema = schema.create({
      name: schema.string({ trim: true }, [rules.required(), rules.minLength(3)]),
    })
    const payload = await request.validate({ schema: productSchema })
    const productCategory = new ProductCategory()
    productCategory.name = payload.name
    return await productCategory.save()
  }
  public async show({ params, response }: HttpContextContract) {
    try {
      const productCategory = await ProductCategory.find(params.id)
      const errorMessage = `entity not found for id ${params.id}`
      if (!productCategory) {
        response.header('content-type', 'application/json; charset=utf-8')
        response.badRequest({ errorMessage })
      }

      return productCategory
    } catch (error) {
      console.log(error)
    }
  }
  public async update({ request, params, response }: HttpContextContract) {
    const productCategory = await ProductCategory.find(params.id)
    const errorMessage = `entity not found for id ${params.id}`
    const productSchema = schema.create({
      name: schema.string({ trim: true }, [rules.required(), rules.minLength(3)]),
    })
    const { name } = await request.validate({ schema: productSchema })
    if (!productCategory) {
      response.header('content-type', 'application/json; charset=utf-8')
      response.badRequest({ errorMessage })
    }
    if (productCategory) {
      productCategory.name = name ? name : productCategory.name
      if (await productCategory.save()) {
        return productCategory
      }
      return // 422
    }
    return // 401
  }
  public async destroy({  params, response }: HttpContextContract) {
    const productCategory = await ProductCategory.find(params.id)
    const errorMessage = `entity not found for id ${params.id}`
    if (!productCategory) {
      response.header('content-type', 'application/json; charset=utf-8')
      response.badRequest({ errorMessage })
    }
    await ProductCategory.query().where('id', params.id).delete()
    return response.json({ productId: params.id })
  }
}
