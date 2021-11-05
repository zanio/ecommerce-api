import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import EntityNotFoundException from 'App/Exceptions/EntityNotFoundException';
import ProductCategory from 'App/Models/ProductCategory';
const status = 400
const errorCode = 'E_NOT_FOUND'
import { schema,rules } from '@ioc:Adonis/Core/Validator'

export default class ProductCategoriesController {
    public async index({  }: HttpContextContract) {
        const productCategory = await ProductCategory.query();
        return productCategory
    }
    public async store ({ auth, request, response}: HttpContextContract) {
        const productSchema = schema.create({
            name: schema.string({ trim: true },[rules.required(),rules.minLength(3), ]),
        
          })
          const payload = await request.validate({ schema: productSchema })
        const productCategory = new ProductCategory();
        productCategory.name = payload.name;
       const result = await productCategory.save();
        return result;

    }
    public async show({ request, params,response }: HttpContextContract) {
        try {
            const productCategory = await ProductCategory.find(params.id);
            const errorMessage = `entity not found for id ${params.id}`
            if(!productCategory){     
                response.header("content-type","application/json; charset=utf-8")       
                response.badRequest({errorMessage})
            }
        
            return productCategory
        } catch (error) {
            console.log(error)
        }

    }
    public async update({ auth, request, params,response }: HttpContextContract) {
        const productCategory = await ProductCategory.find(params.id);
        const errorMessage = `entity not found for id ${params.id}`
        const productSchema = schema.create({
            name: schema.string({ trim: true },[rules.required(),rules.minLength(3), ]),
        
          })
          const {name} = await request.validate({ schema: productSchema })
            if(!productCategory){     
                response.header("content-type","application/json; charset=utf-8")       
                response.badRequest({errorMessage})
            }
            if (productCategory) {
                productCategory.name = name?name:productCategory.name;
                if (await productCategory.save()) {
                    
                    return productCategory
                }
                return; // 422
            }
            return; // 401

    }
    public async destroy({ auth, request, params,response }: HttpContextContract) {
        const productCategory = await ProductCategory.find(params.id);
        const errorMessage = `entity not found for id ${params.id}`
        if(!productCategory){     
            response.header("content-type","application/json; charset=utf-8")       
            response.badRequest({errorMessage})
        }
        await ProductCategory.query().where('id', params.id).delete();
        return response.json({'productId':params.id});
    }
}
