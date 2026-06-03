import { queryParams, type RouteQueryOptions, type RouteDefinition, type RouteFormDefinition, applyUrlDefaults } from './../../../../wayfinder'
/**
* @see \App\Http\Controllers\ChannelController::store
 * @see app/Http/Controllers/ChannelController.php:11
 * @route '/servers/{serverId}/channels'
 */
export const store = (args: { serverId: string | number } | [serverId: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: store.url(args, options),
    method: 'post',
})

store.definition = {
    methods: ["post"],
    url: '/servers/{serverId}/channels',
} satisfies RouteDefinition<["post"]>

/**
* @see \App\Http\Controllers\ChannelController::store
 * @see app/Http/Controllers/ChannelController.php:11
 * @route '/servers/{serverId}/channels'
 */
store.url = (args: { serverId: string | number } | [serverId: string | number ] | string | number, options?: RouteQueryOptions) => {
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

    return store.definition.url
            .replace('{serverId}', parsedArgs.serverId.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\ChannelController::store
 * @see app/Http/Controllers/ChannelController.php:11
 * @route '/servers/{serverId}/channels'
 */
store.post = (args: { serverId: string | number } | [serverId: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: store.url(args, options),
    method: 'post',
})

    /**
* @see \App\Http\Controllers\ChannelController::store
 * @see app/Http/Controllers/ChannelController.php:11
 * @route '/servers/{serverId}/channels'
 */
    const storeForm = (args: { serverId: string | number } | [serverId: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
        action: store.url(args, options),
        method: 'post',
    })

            /**
* @see \App\Http\Controllers\ChannelController::store
 * @see app/Http/Controllers/ChannelController.php:11
 * @route '/servers/{serverId}/channels'
 */
        storeForm.post = (args: { serverId: string | number } | [serverId: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
            action: store.url(args, options),
            method: 'post',
        })
    
    store.form = storeForm
const ChannelController = { store }

export default ChannelController