import { queryParams, type RouteQueryOptions, type RouteDefinition, type RouteFormDefinition } from './../../../../../wayfinder'
/**
* @see \App\Http\Controllers\Api\DirectMessageController::index
 * @see app/Http/Controllers/Api/DirectMessageController.php:11
 * @route '/api/direct-messages'
 */
export const index = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: index.url(options),
    method: 'get',
})

index.definition = {
    methods: ["get","head"],
    url: '/api/direct-messages',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\Api\DirectMessageController::index
 * @see app/Http/Controllers/Api/DirectMessageController.php:11
 * @route '/api/direct-messages'
 */
index.url = (options?: RouteQueryOptions) => {
    return index.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\Api\DirectMessageController::index
 * @see app/Http/Controllers/Api/DirectMessageController.php:11
 * @route '/api/direct-messages'
 */
index.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: index.url(options),
    method: 'get',
})
/**
* @see \App\Http\Controllers\Api\DirectMessageController::index
 * @see app/Http/Controllers/Api/DirectMessageController.php:11
 * @route '/api/direct-messages'
 */
index.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: index.url(options),
    method: 'head',
})

    /**
* @see \App\Http\Controllers\Api\DirectMessageController::index
 * @see app/Http/Controllers/Api/DirectMessageController.php:11
 * @route '/api/direct-messages'
 */
    const indexForm = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
        action: index.url(options),
        method: 'get',
    })

            /**
* @see \App\Http\Controllers\Api\DirectMessageController::index
 * @see app/Http/Controllers/Api/DirectMessageController.php:11
 * @route '/api/direct-messages'
 */
        indexForm.get = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: index.url(options),
            method: 'get',
        })
            /**
* @see \App\Http\Controllers\Api\DirectMessageController::index
 * @see app/Http/Controllers/Api/DirectMessageController.php:11
 * @route '/api/direct-messages'
 */
        indexForm.head = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: index.url({
                        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                            _method: 'HEAD',
                            ...(options?.query ?? options?.mergeQuery ?? {}),
                        }
                    }),
            method: 'get',
        })
    
    index.form = indexForm
/**
* @see \App\Http\Controllers\Api\DirectMessageController::store
 * @see app/Http/Controllers/Api/DirectMessageController.php:33
 * @route '/api/direct-messages'
 */
export const store = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: store.url(options),
    method: 'post',
})

store.definition = {
    methods: ["post"],
    url: '/api/direct-messages',
} satisfies RouteDefinition<["post"]>

/**
* @see \App\Http\Controllers\Api\DirectMessageController::store
 * @see app/Http/Controllers/Api/DirectMessageController.php:33
 * @route '/api/direct-messages'
 */
store.url = (options?: RouteQueryOptions) => {
    return store.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\Api\DirectMessageController::store
 * @see app/Http/Controllers/Api/DirectMessageController.php:33
 * @route '/api/direct-messages'
 */
store.post = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: store.url(options),
    method: 'post',
})

    /**
* @see \App\Http\Controllers\Api\DirectMessageController::store
 * @see app/Http/Controllers/Api/DirectMessageController.php:33
 * @route '/api/direct-messages'
 */
    const storeForm = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
        action: store.url(options),
        method: 'post',
    })

            /**
* @see \App\Http\Controllers\Api\DirectMessageController::store
 * @see app/Http/Controllers/Api/DirectMessageController.php:33
 * @route '/api/direct-messages'
 */
        storeForm.post = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
            action: store.url(options),
            method: 'post',
        })
    
    store.form = storeForm
const DirectMessageController = { index, store }

export default DirectMessageController