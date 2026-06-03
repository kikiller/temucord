import { queryParams, type RouteQueryOptions, type RouteDefinition, type RouteFormDefinition, applyUrlDefaults } from './../../../../wayfinder'
/**
* @see \App\Http\Controllers\PostController::index
 * @see app/Http/Controllers/PostController.php:11
 * @route '/api/channels/{channelId}/posts'
 */
const index79035ad11bce1da71f8b702b81581af6 = (args: { channelId: string | number } | [channelId: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: index79035ad11bce1da71f8b702b81581af6.url(args, options),
    method: 'get',
})

index79035ad11bce1da71f8b702b81581af6.definition = {
    methods: ["get","head"],
    url: '/api/channels/{channelId}/posts',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\PostController::index
 * @see app/Http/Controllers/PostController.php:11
 * @route '/api/channels/{channelId}/posts'
 */
index79035ad11bce1da71f8b702b81581af6.url = (args: { channelId: string | number } | [channelId: string | number ] | string | number, options?: RouteQueryOptions) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { channelId: args }
    }

    
    if (Array.isArray(args)) {
        args = {
                    channelId: args[0],
                }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
                        channelId: args.channelId,
                }

    return index79035ad11bce1da71f8b702b81581af6.definition.url
            .replace('{channelId}', parsedArgs.channelId.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\PostController::index
 * @see app/Http/Controllers/PostController.php:11
 * @route '/api/channels/{channelId}/posts'
 */
index79035ad11bce1da71f8b702b81581af6.get = (args: { channelId: string | number } | [channelId: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: index79035ad11bce1da71f8b702b81581af6.url(args, options),
    method: 'get',
})
/**
* @see \App\Http\Controllers\PostController::index
 * @see app/Http/Controllers/PostController.php:11
 * @route '/api/channels/{channelId}/posts'
 */
index79035ad11bce1da71f8b702b81581af6.head = (args: { channelId: string | number } | [channelId: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: index79035ad11bce1da71f8b702b81581af6.url(args, options),
    method: 'head',
})

    /**
* @see \App\Http\Controllers\PostController::index
 * @see app/Http/Controllers/PostController.php:11
 * @route '/api/channels/{channelId}/posts'
 */
    const index79035ad11bce1da71f8b702b81581af6Form = (args: { channelId: string | number } | [channelId: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
        action: index79035ad11bce1da71f8b702b81581af6.url(args, options),
        method: 'get',
    })

            /**
* @see \App\Http\Controllers\PostController::index
 * @see app/Http/Controllers/PostController.php:11
 * @route '/api/channels/{channelId}/posts'
 */
        index79035ad11bce1da71f8b702b81581af6Form.get = (args: { channelId: string | number } | [channelId: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: index79035ad11bce1da71f8b702b81581af6.url(args, options),
            method: 'get',
        })
            /**
* @see \App\Http\Controllers\PostController::index
 * @see app/Http/Controllers/PostController.php:11
 * @route '/api/channels/{channelId}/posts'
 */
        index79035ad11bce1da71f8b702b81581af6Form.head = (args: { channelId: string | number } | [channelId: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: index79035ad11bce1da71f8b702b81581af6.url(args, {
                        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                            _method: 'HEAD',
                            ...(options?.query ?? options?.mergeQuery ?? {}),
                        }
                    }),
            method: 'get',
        })
    
    index79035ad11bce1da71f8b702b81581af6.form = index79035ad11bce1da71f8b702b81581af6Form
    /**
* @see \App\Http\Controllers\PostController::index
 * @see app/Http/Controllers/PostController.php:11
 * @route '/channels/{channel}/posts'
 */
const index4bd2b5059c080a9accc782d5ba87aa2d = (args: { channel: string | number } | [channel: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: index4bd2b5059c080a9accc782d5ba87aa2d.url(args, options),
    method: 'get',
})

index4bd2b5059c080a9accc782d5ba87aa2d.definition = {
    methods: ["get","head"],
    url: '/channels/{channel}/posts',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\PostController::index
 * @see app/Http/Controllers/PostController.php:11
 * @route '/channels/{channel}/posts'
 */
index4bd2b5059c080a9accc782d5ba87aa2d.url = (args: { channel: string | number } | [channel: string | number ] | string | number, options?: RouteQueryOptions) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { channel: args }
    }

    
    if (Array.isArray(args)) {
        args = {
                    channel: args[0],
                }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
                        channel: args.channel,
                }

    return index4bd2b5059c080a9accc782d5ba87aa2d.definition.url
            .replace('{channel}', parsedArgs.channel.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\PostController::index
 * @see app/Http/Controllers/PostController.php:11
 * @route '/channels/{channel}/posts'
 */
index4bd2b5059c080a9accc782d5ba87aa2d.get = (args: { channel: string | number } | [channel: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: index4bd2b5059c080a9accc782d5ba87aa2d.url(args, options),
    method: 'get',
})
/**
* @see \App\Http\Controllers\PostController::index
 * @see app/Http/Controllers/PostController.php:11
 * @route '/channels/{channel}/posts'
 */
index4bd2b5059c080a9accc782d5ba87aa2d.head = (args: { channel: string | number } | [channel: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: index4bd2b5059c080a9accc782d5ba87aa2d.url(args, options),
    method: 'head',
})

    /**
* @see \App\Http\Controllers\PostController::index
 * @see app/Http/Controllers/PostController.php:11
 * @route '/channels/{channel}/posts'
 */
    const index4bd2b5059c080a9accc782d5ba87aa2dForm = (args: { channel: string | number } | [channel: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
        action: index4bd2b5059c080a9accc782d5ba87aa2d.url(args, options),
        method: 'get',
    })

            /**
* @see \App\Http\Controllers\PostController::index
 * @see app/Http/Controllers/PostController.php:11
 * @route '/channels/{channel}/posts'
 */
        index4bd2b5059c080a9accc782d5ba87aa2dForm.get = (args: { channel: string | number } | [channel: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: index4bd2b5059c080a9accc782d5ba87aa2d.url(args, options),
            method: 'get',
        })
            /**
* @see \App\Http\Controllers\PostController::index
 * @see app/Http/Controllers/PostController.php:11
 * @route '/channels/{channel}/posts'
 */
        index4bd2b5059c080a9accc782d5ba87aa2dForm.head = (args: { channel: string | number } | [channel: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: index4bd2b5059c080a9accc782d5ba87aa2d.url(args, {
                        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                            _method: 'HEAD',
                            ...(options?.query ?? options?.mergeQuery ?? {}),
                        }
                    }),
            method: 'get',
        })
    
    index4bd2b5059c080a9accc782d5ba87aa2d.form = index4bd2b5059c080a9accc782d5ba87aa2dForm

export const index = {
    '/api/channels/{channelId}/posts': index79035ad11bce1da71f8b702b81581af6,
    '/channels/{channel}/posts': index4bd2b5059c080a9accc782d5ba87aa2d,
}

/**
* @see \App\Http\Controllers\PostController::store
 * @see app/Http/Controllers/PostController.php:24
 * @route '/api/channels/{channelId}/posts'
 */
const store79035ad11bce1da71f8b702b81581af6 = (args: { channelId: string | number } | [channelId: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: store79035ad11bce1da71f8b702b81581af6.url(args, options),
    method: 'post',
})

store79035ad11bce1da71f8b702b81581af6.definition = {
    methods: ["post"],
    url: '/api/channels/{channelId}/posts',
} satisfies RouteDefinition<["post"]>

/**
* @see \App\Http\Controllers\PostController::store
 * @see app/Http/Controllers/PostController.php:24
 * @route '/api/channels/{channelId}/posts'
 */
store79035ad11bce1da71f8b702b81581af6.url = (args: { channelId: string | number } | [channelId: string | number ] | string | number, options?: RouteQueryOptions) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { channelId: args }
    }

    
    if (Array.isArray(args)) {
        args = {
                    channelId: args[0],
                }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
                        channelId: args.channelId,
                }

    return store79035ad11bce1da71f8b702b81581af6.definition.url
            .replace('{channelId}', parsedArgs.channelId.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\PostController::store
 * @see app/Http/Controllers/PostController.php:24
 * @route '/api/channels/{channelId}/posts'
 */
store79035ad11bce1da71f8b702b81581af6.post = (args: { channelId: string | number } | [channelId: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: store79035ad11bce1da71f8b702b81581af6.url(args, options),
    method: 'post',
})

    /**
* @see \App\Http\Controllers\PostController::store
 * @see app/Http/Controllers/PostController.php:24
 * @route '/api/channels/{channelId}/posts'
 */
    const store79035ad11bce1da71f8b702b81581af6Form = (args: { channelId: string | number } | [channelId: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
        action: store79035ad11bce1da71f8b702b81581af6.url(args, options),
        method: 'post',
    })

            /**
* @see \App\Http\Controllers\PostController::store
 * @see app/Http/Controllers/PostController.php:24
 * @route '/api/channels/{channelId}/posts'
 */
        store79035ad11bce1da71f8b702b81581af6Form.post = (args: { channelId: string | number } | [channelId: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
            action: store79035ad11bce1da71f8b702b81581af6.url(args, options),
            method: 'post',
        })
    
    store79035ad11bce1da71f8b702b81581af6.form = store79035ad11bce1da71f8b702b81581af6Form
    /**
* @see \App\Http\Controllers\PostController::store
 * @see app/Http/Controllers/PostController.php:24
 * @route '/channels/{channel}/posts'
 */
const store4bd2b5059c080a9accc782d5ba87aa2d = (args: { channel: string | number } | [channel: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: store4bd2b5059c080a9accc782d5ba87aa2d.url(args, options),
    method: 'post',
})

store4bd2b5059c080a9accc782d5ba87aa2d.definition = {
    methods: ["post"],
    url: '/channels/{channel}/posts',
} satisfies RouteDefinition<["post"]>

/**
* @see \App\Http\Controllers\PostController::store
 * @see app/Http/Controllers/PostController.php:24
 * @route '/channels/{channel}/posts'
 */
store4bd2b5059c080a9accc782d5ba87aa2d.url = (args: { channel: string | number } | [channel: string | number ] | string | number, options?: RouteQueryOptions) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { channel: args }
    }

    
    if (Array.isArray(args)) {
        args = {
                    channel: args[0],
                }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
                        channel: args.channel,
                }

    return store4bd2b5059c080a9accc782d5ba87aa2d.definition.url
            .replace('{channel}', parsedArgs.channel.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\PostController::store
 * @see app/Http/Controllers/PostController.php:24
 * @route '/channels/{channel}/posts'
 */
store4bd2b5059c080a9accc782d5ba87aa2d.post = (args: { channel: string | number } | [channel: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: store4bd2b5059c080a9accc782d5ba87aa2d.url(args, options),
    method: 'post',
})

    /**
* @see \App\Http\Controllers\PostController::store
 * @see app/Http/Controllers/PostController.php:24
 * @route '/channels/{channel}/posts'
 */
    const store4bd2b5059c080a9accc782d5ba87aa2dForm = (args: { channel: string | number } | [channel: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
        action: store4bd2b5059c080a9accc782d5ba87aa2d.url(args, options),
        method: 'post',
    })

            /**
* @see \App\Http\Controllers\PostController::store
 * @see app/Http/Controllers/PostController.php:24
 * @route '/channels/{channel}/posts'
 */
        store4bd2b5059c080a9accc782d5ba87aa2dForm.post = (args: { channel: string | number } | [channel: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
            action: store4bd2b5059c080a9accc782d5ba87aa2d.url(args, options),
            method: 'post',
        })
    
    store4bd2b5059c080a9accc782d5ba87aa2d.form = store4bd2b5059c080a9accc782d5ba87aa2dForm

export const store = {
    '/api/channels/{channelId}/posts': store79035ad11bce1da71f8b702b81581af6,
    '/channels/{channel}/posts': store4bd2b5059c080a9accc782d5ba87aa2d,
}

const PostController = { index, store }

export default PostController