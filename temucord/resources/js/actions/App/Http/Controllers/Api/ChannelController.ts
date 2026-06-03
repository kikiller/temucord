import { queryParams, type RouteQueryOptions, type RouteDefinition, type RouteFormDefinition, applyUrlDefaults } from './../../../../../wayfinder'
/**
* @see \App\Http\Controllers\Api\ChannelController::index
 * @see app/Http/Controllers/Api/ChannelController.php:11
 * @route '/api/servers/{serverId}/channels'
 */
export const index = (args: { serverId: string | number } | [serverId: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: index.url(args, options),
    method: 'get',
})

index.definition = {
    methods: ["get","head"],
    url: '/api/servers/{serverId}/channels',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\Api\ChannelController::index
 * @see app/Http/Controllers/Api/ChannelController.php:11
 * @route '/api/servers/{serverId}/channels'
 */
index.url = (args: { serverId: string | number } | [serverId: string | number ] | string | number, options?: RouteQueryOptions) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { serverId: args }
    }

    
    if (Array.isArray(args)) {
        args = {
                    serverId: args[0],
                }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
                        serverId: args.serverId,
                }

    return index.definition.url
            .replace('{serverId}', parsedArgs.serverId.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\Api\ChannelController::index
 * @see app/Http/Controllers/Api/ChannelController.php:11
 * @route '/api/servers/{serverId}/channels'
 */
index.get = (args: { serverId: string | number } | [serverId: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: index.url(args, options),
    method: 'get',
})
/**
* @see \App\Http\Controllers\Api\ChannelController::index
 * @see app/Http/Controllers/Api/ChannelController.php:11
 * @route '/api/servers/{serverId}/channels'
 */
index.head = (args: { serverId: string | number } | [serverId: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: index.url(args, options),
    method: 'head',
})

    /**
* @see \App\Http\Controllers\Api\ChannelController::index
 * @see app/Http/Controllers/Api/ChannelController.php:11
 * @route '/api/servers/{serverId}/channels'
 */
    const indexForm = (args: { serverId: string | number } | [serverId: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
        action: index.url(args, options),
        method: 'get',
    })

            /**
* @see \App\Http\Controllers\Api\ChannelController::index
 * @see app/Http/Controllers/Api/ChannelController.php:11
 * @route '/api/servers/{serverId}/channels'
 */
        indexForm.get = (args: { serverId: string | number } | [serverId: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: index.url(args, options),
            method: 'get',
        })
            /**
* @see \App\Http\Controllers\Api\ChannelController::index
 * @see app/Http/Controllers/Api/ChannelController.php:11
 * @route '/api/servers/{serverId}/channels'
 */
        indexForm.head = (args: { serverId: string | number } | [serverId: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: index.url(args, {
                        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                            _method: 'HEAD',
                            ...(options?.query ?? options?.mergeQuery ?? {}),
                        }
                    }),
            method: 'get',
        })
    
    index.form = indexForm
/**
* @see \App\Http\Controllers\Api\ChannelController::store
 * @see app/Http/Controllers/Api/ChannelController.php:23
 * @route '/api/channels'
 */
export const store = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: store.url(options),
    method: 'post',
})

store.definition = {
    methods: ["post"],
    url: '/api/channels',
} satisfies RouteDefinition<["post"]>

/**
* @see \App\Http\Controllers\Api\ChannelController::store
 * @see app/Http/Controllers/Api/ChannelController.php:23
 * @route '/api/channels'
 */
store.url = (options?: RouteQueryOptions) => {
    return store.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\Api\ChannelController::store
 * @see app/Http/Controllers/Api/ChannelController.php:23
 * @route '/api/channels'
 */
store.post = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: store.url(options),
    method: 'post',
})

    /**
* @see \App\Http\Controllers\Api\ChannelController::store
 * @see app/Http/Controllers/Api/ChannelController.php:23
 * @route '/api/channels'
 */
    const storeForm = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
        action: store.url(options),
        method: 'post',
    })

            /**
* @see \App\Http\Controllers\Api\ChannelController::store
 * @see app/Http/Controllers/Api/ChannelController.php:23
 * @route '/api/channels'
 */
        storeForm.post = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
            action: store.url(options),
            method: 'post',
        })
    
    store.form = storeForm
const ChannelController = { index, store }

export default ChannelController