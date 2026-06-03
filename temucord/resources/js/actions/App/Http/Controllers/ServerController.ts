import { queryParams, type RouteQueryOptions, type RouteDefinition, type RouteFormDefinition } from './../../../../wayfinder'
/**
* @see \App\Http\Controllers\ServerController::store
 * @see app/Http/Controllers/ServerController.php:10
 * @route '/servers'
 */
export const store = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: store.url(options),
    method: 'post',
})

store.definition = {
    methods: ["post"],
    url: '/servers',
} satisfies RouteDefinition<["post"]>

/**
* @see \App\Http\Controllers\ServerController::store
 * @see app/Http/Controllers/ServerController.php:10
 * @route '/servers'
 */
store.url = (options?: RouteQueryOptions) => {
    return store.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\ServerController::store
 * @see app/Http/Controllers/ServerController.php:10
 * @route '/servers'
 */
store.post = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: store.url(options),
    method: 'post',
})

    /**
* @see \App\Http\Controllers\ServerController::store
 * @see app/Http/Controllers/ServerController.php:10
 * @route '/servers'
 */
    const storeForm = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
        action: store.url(options),
        method: 'post',
    })

            /**
* @see \App\Http\Controllers\ServerController::store
 * @see app/Http/Controllers/ServerController.php:10
 * @route '/servers'
 */
        storeForm.post = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
            action: store.url(options),
            method: 'post',
        })
    
    store.form = storeForm
const ServerController = { store }

export default ServerController