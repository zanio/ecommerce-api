/*
|--------------------------------------------------------------------------
| Routes
|--------------------------------------------------------------------------
|
| This file is dedicated for defining HTTP routes. A single file is enough
| for majority of projects, however you can define routes in different
| files and just make sure to import them inside this file. For example
|
| Define routes in following two files
| ├── start/routes/cart.ts
| ├── start/routes/customer.ts
|
| and then import them inside `start/routes.ts` as follows
|
| import './routes/cart'
| import './routes/customer'
|
*/

import Route from '@ioc:Adonis/Core/Route'

Route.group(() => {
  Route.post('register', 'AuthController.register')
  Route.post('login', 'AuthController.login')
  Route.group(() => {
    Route.resource('product', 'ProductsController').apiOnly()
    Route.resource('product-category', 'ProductCategoriesController').apiOnly()
    Route.resource('product-sub-category', 'ProductSubCategoriesController').apiOnly()
    // products
    //     Route.get("products", "ProductController.getAll");
    //     Route.post("product", "ProductController.create");
    //     Route.get("product/:id", "ProductController.getOne");
    //     Route.patch("product/:id", "ProductController.update");
    //     Route.delete("product/:id", "ProductController.delete");
    // // product-category
    //     Route.get("product-categories", "ProductCategoryController.getAll");
    //     Route.post("product-category", "ProductCategoryController.create");
    //     Route.get("product-category/:id", "ProductCategoryController.getOne");
    //     Route.patch("product-category/:id", "ProductCategoryController.update");
    //     Route.delete("product-category/:id", "ProductCategoryController.delete");
    //     // product-sub-category
    //     Route.get("product-sub-categories", "ProductSubCategoryController.getAll");
    //     Route.post("product-sub-category", "ProductSubCategoryController.create");
    //     Route.get("product-sub-category/:id", "ProductSubCategoryController.getOne");
    //     Route.patch("product-sub-category/:id", "ProductSubCategoryController.update");
    //     Route.delete("product-sub-category/:id", "ProductSubCategoryController.delete");
  }).middleware('auth:api')
}).prefix('api/v1')
