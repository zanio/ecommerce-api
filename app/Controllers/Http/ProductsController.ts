import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Product from 'App/Models/Product'
import ProductCategory from 'App/Models/ProductCategory'
import ProductSubCategory from 'App/Models/ProductSubCategory'
import { schema, rules } from '@ioc:Adonis/Core/Validator'

export default class ProductsController {
  public async index({}: HttpContextContract) {
    const products = await Product.query().preload('productCategory').preload('productSubCategory')
    return products
  }
  public async store({ auth, request, response }: HttpContextContract) {
    const productSchema = schema.create({
      title: schema.string({ trim: true }, [rules.required(), rules.minLength(3)]),
      description: schema.string.optional({}, [rules.minLength(3)]),
      productSubCategoryId: schema.number([
        rules.required(),
        rules.exists({ table: 'product_sub_categories', column: 'id' }),
      ]),
      price: schema.number([rules.required()]),
      productCategoryId: schema.number([
        rules.required(),
        rules.exists({ table: 'product_categories', column: 'id' }),
      ]),
    })
    const payload = await request.validate({ schema: productSchema })
    const { title, description, productCategoryId, productSubCategoryId, price } = payload

    const user = await auth.authenticate()
    // const produtSubCategoryId =  request.input('produtSubCategoryId');
    // const produtCategoryId =  request.input('produtCategoryId');
    const productSubCategory = await ProductSubCategory.find(productSubCategoryId)
    const errorMessage = `entity not found for paramer ${productSubCategoryId}`
    if (!productSubCategory) {
      response.badRequest(errorMessage)
    }
    const errorMessageProductCatory = `entity not found for paramer ${productCategoryId}`
    const productCategory = await ProductCategory.find(productCategoryId)
    if (!productCategory) {
      response.header('content-type', 'application/json; charset=utf-8')
      response.badRequest({ errorMessageProductCatory })
    }
    // const description = request.input('description');
    // const title = request.input('title')
    const product = new Product()
    product.title = title
    product.description = description ? description : ''
    product.price = price
    product.product_category_id = productCategoryId
    product.product_sub_category_id = productSubCategoryId
    await user.related('products').save(product)
    return product
  }
  public async show({ request, params, response }: HttpContextContract) {
    try {
      const product = await Product.find(params.id)
      console.log(product)
      const errorMessage = `entity not found for id ${params.id}`
      if (!product) {
        response.header('content-type', 'application/json; charset=utf-8')
        response.badRequest(errorMessage)
      }
      if (product) {
        await product.preload('productCategory')
        await product.preload('productSubCategory')
        return product
      }
    } catch (error) {
      console.log(error)
    }
  }
  public async update({ auth, request, params, response }: HttpContextContract) {
    const product = await Product.find(params.id)
    const productSchema = schema.create({
      title: schema.string.optional({}, [rules.minLength(3)]),
      description: schema.string.optional({}, [rules.minLength(3)]),
      price: schema.number.optional(),
    })
    const payload = await request.validate({ schema: productSchema })
    const { title, description, price } = payload
    const errorMessage = `entity not found for id ${params.id}`
    if (!product) {
      response.header('content-type', 'application/json; charset=utf-8')
      response.badRequest({ errorMessage })
    }

    if (product) {
      product.title = title ? title : product.title
      product.description = description ? description : product.description
      product.price = price ? price : product.price
      if (await product.save()) {
        await product.preload('productCategory')
        await product.preload('productSubCategory')
        return product
      }
      return // 422
    }
    return // 401
  }
  public async destroy({ auth, request, params, response }: HttpContextContract) {
    const user = await auth.authenticate()
    const product = await Product.find(params.id)
    const errorMessage = `entity not found for id ${params.id}`
    if (!product) {
      response.header('content-type', 'application/json; charset=utf-8')
      response.badRequest({ errorMessage })
    }
    await Product.query().where('user_id', user.id).where('id', params.id).delete()
    return response.json({ productId: params.id })
  }
}
