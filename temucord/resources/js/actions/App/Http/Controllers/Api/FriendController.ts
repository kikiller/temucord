import { queryParams, type RouteQueryOptions, type RouteDefinition, type RouteFormDefinition, applyUrlDefaults } from './../../../../../wayfinder'
/**
* @see \App\Http\Controllers\Api\FriendController::notifications
 * @see app/Http/Controllers/Api/FriendController.php:12
 * @route '/api/notifications'
 */
export const notifications = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: notifications.url(options),
    method: 'get',
})

notifications.definition = {
    methods: ["get","head"],
    url: '/api/notifications',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\Api\FriendController::notifications
 * @see app/Http/Controllers/Api/FriendController.php:12
 * @route '/api/notifications'
 */
notifications.url = (options?: RouteQueryOptions) => {
    return notifications.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\Api\FriendController::notifications
 * @see app/Http/Controllers/Api/FriendController.php:12
 * @route '/api/notifications'
 */
notifications.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: notifications.url(options),
    method: 'get',
})
/**
* @see \App\Http\Controllers\Api\FriendController::notifications
 * @see app/Http/Controllers/Api/FriendController.php:12
 * @route '/api/notifications'
 */
notifications.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: notifications.url(options),
    method: 'head',
})

    /**
* @see \App\Http\Controllers\Api\FriendController::notifications
 * @see app/Http/Controllers/Api/FriendController.php:12
 * @route '/api/notifications'
 */
    const notificationsForm = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
        action: notifications.url(options),
        method: 'get',
    })

            /**
* @see \App\Http\Controllers\Api\FriendController::notifications
 * @see app/Http/Controllers/Api/FriendController.php:12
 * @route '/api/notifications'
 */
        notificationsForm.get = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: notifications.url(options),
            method: 'get',
        })
            /**
* @see \App\Http\Controllers\Api\FriendController::notifications
 * @see app/Http/Controllers/Api/FriendController.php:12
 * @route '/api/notifications'
 */
        notificationsForm.head = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: notifications.url({
                        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                            _method: 'HEAD',
                            ...(options?.query ?? options?.mergeQuery ?? {}),
                        }
                    }),
            method: 'get',
        })
    
    notifications.form = notificationsForm
/**
* @see \App\Http\Controllers\Api\FriendController::requests
 * @see app/Http/Controllers/Api/FriendController.php:32
 * @route '/api/friend-requests'
 */
export const requests = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: requests.url(options),
    method: 'get',
})

requests.definition = {
    methods: ["get","head"],
    url: '/api/friend-requests',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\Api\FriendController::requests
 * @see app/Http/Controllers/Api/FriendController.php:32
 * @route '/api/friend-requests'
 */
requests.url = (options?: RouteQueryOptions) => {
    return requests.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\Api\FriendController::requests
 * @see app/Http/Controllers/Api/FriendController.php:32
 * @route '/api/friend-requests'
 */
requests.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: requests.url(options),
    method: 'get',
})
/**
* @see \App\Http\Controllers\Api\FriendController::requests
 * @see app/Http/Controllers/Api/FriendController.php:32
 * @route '/api/friend-requests'
 */
requests.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: requests.url(options),
    method: 'head',
})

    /**
* @see \App\Http\Controllers\Api\FriendController::requests
 * @see app/Http/Controllers/Api/FriendController.php:32
 * @route '/api/friend-requests'
 */
    const requestsForm = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
        action: requests.url(options),
        method: 'get',
    })

            /**
* @see \App\Http\Controllers\Api\FriendController::requests
 * @see app/Http/Controllers/Api/FriendController.php:32
 * @route '/api/friend-requests'
 */
        requestsForm.get = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: requests.url(options),
            method: 'get',
        })
            /**
* @see \App\Http\Controllers\Api\FriendController::requests
 * @see app/Http/Controllers/Api/FriendController.php:32
 * @route '/api/friend-requests'
 */
        requestsForm.head = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: requests.url({
                        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                            _method: 'HEAD',
                            ...(options?.query ?? options?.mergeQuery ?? {}),
                        }
                    }),
            method: 'get',
        })
    
    requests.form = requestsForm
/**
* @see \App\Http\Controllers\Api\FriendController::sendRequest
 * @see app/Http/Controllers/Api/FriendController.php:47
 * @route '/api/friend-requests'
 */
export const sendRequest = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: sendRequest.url(options),
    method: 'post',
})

sendRequest.definition = {
    methods: ["post"],
    url: '/api/friend-requests',
} satisfies RouteDefinition<["post"]>

/**
* @see \App\Http\Controllers\Api\FriendController::sendRequest
 * @see app/Http/Controllers/Api/FriendController.php:47
 * @route '/api/friend-requests'
 */
sendRequest.url = (options?: RouteQueryOptions) => {
    return sendRequest.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\Api\FriendController::sendRequest
 * @see app/Http/Controllers/Api/FriendController.php:47
 * @route '/api/friend-requests'
 */
sendRequest.post = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: sendRequest.url(options),
    method: 'post',
})

    /**
* @see \App\Http\Controllers\Api\FriendController::sendRequest
 * @see app/Http/Controllers/Api/FriendController.php:47
 * @route '/api/friend-requests'
 */
    const sendRequestForm = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
        action: sendRequest.url(options),
        method: 'post',
    })

            /**
* @see \App\Http\Controllers\Api\FriendController::sendRequest
 * @see app/Http/Controllers/Api/FriendController.php:47
 * @route '/api/friend-requests'
 */
        sendRequestForm.post = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
            action: sendRequest.url(options),
            method: 'post',
        })
    
    sendRequest.form = sendRequestForm
/**
* @see \App\Http\Controllers\Api\FriendController::accept
 * @see app/Http/Controllers/Api/FriendController.php:89
 * @route '/api/friend-requests/{id}/accept'
 */
export const accept = (args: { id: string | number } | [id: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: accept.url(args, options),
    method: 'post',
})

accept.definition = {
    methods: ["post"],
    url: '/api/friend-requests/{id}/accept',
} satisfies RouteDefinition<["post"]>

/**
* @see \App\Http\Controllers\Api\FriendController::accept
 * @see app/Http/Controllers/Api/FriendController.php:89
 * @route '/api/friend-requests/{id}/accept'
 */
accept.url = (args: { id: string | number } | [id: string | number ] | string | number, options?: RouteQueryOptions) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { id: args }
    }

    
    if (Array.isArray(args)) {
        args = {
                    id: args[0],
                }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
                        id: args.id,
                }

    return accept.definition.url
            .replace('{id}', parsedArgs.id.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\Api\FriendController::accept
 * @see app/Http/Controllers/Api/FriendController.php:89
 * @route '/api/friend-requests/{id}/accept'
 */
accept.post = (args: { id: string | number } | [id: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: accept.url(args, options),
    method: 'post',
})

    /**
* @see \App\Http\Controllers\Api\FriendController::accept
 * @see app/Http/Controllers/Api/FriendController.php:89
 * @route '/api/friend-requests/{id}/accept'
 */
    const acceptForm = (args: { id: string | number } | [id: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
        action: accept.url(args, options),
        method: 'post',
    })

            /**
* @see \App\Http\Controllers\Api\FriendController::accept
 * @see app/Http/Controllers/Api/FriendController.php:89
 * @route '/api/friend-requests/{id}/accept'
 */
        acceptForm.post = (args: { id: string | number } | [id: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
            action: accept.url(args, options),
            method: 'post',
        })
    
    accept.form = acceptForm
/**
* @see \App\Http\Controllers\Api\FriendController::reject
 * @see app/Http/Controllers/Api/FriendController.php:103
 * @route '/api/friend-requests/{id}/reject'
 */
export const reject = (args: { id: string | number } | [id: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: reject.url(args, options),
    method: 'post',
})

reject.definition = {
    methods: ["post"],
    url: '/api/friend-requests/{id}/reject',
} satisfies RouteDefinition<["post"]>

/**
* @see \App\Http\Controllers\Api\FriendController::reject
 * @see app/Http/Controllers/Api/FriendController.php:103
 * @route '/api/friend-requests/{id}/reject'
 */
reject.url = (args: { id: string | number } | [id: string | number ] | string | number, options?: RouteQueryOptions) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { id: args }
    }

    
    if (Array.isArray(args)) {
        args = {
                    id: args[0],
                }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
                        id: args.id,
                }

    return reject.definition.url
            .replace('{id}', parsedArgs.id.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\Api\FriendController::reject
 * @see app/Http/Controllers/Api/FriendController.php:103
 * @route '/api/friend-requests/{id}/reject'
 */
reject.post = (args: { id: string | number } | [id: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: reject.url(args, options),
    method: 'post',
})

    /**
* @see \App\Http\Controllers\Api\FriendController::reject
 * @see app/Http/Controllers/Api/FriendController.php:103
 * @route '/api/friend-requests/{id}/reject'
 */
    const rejectForm = (args: { id: string | number } | [id: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
        action: reject.url(args, options),
        method: 'post',
    })

            /**
* @see \App\Http\Controllers\Api\FriendController::reject
 * @see app/Http/Controllers/Api/FriendController.php:103
 * @route '/api/friend-requests/{id}/reject'
 */
        rejectForm.post = (args: { id: string | number } | [id: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
            action: reject.url(args, options),
            method: 'post',
        })
    
    reject.form = rejectForm
/**
* @see \App\Http\Controllers\Api\FriendController::friends
 * @see app/Http/Controllers/Api/FriendController.php:117
 * @route '/api/friends'
 */
export const friends = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: friends.url(options),
    method: 'get',
})

friends.definition = {
    methods: ["get","head"],
    url: '/api/friends',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\Api\FriendController::friends
 * @see app/Http/Controllers/Api/FriendController.php:117
 * @route '/api/friends'
 */
friends.url = (options?: RouteQueryOptions) => {
    return friends.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\Api\FriendController::friends
 * @see app/Http/Controllers/Api/FriendController.php:117
 * @route '/api/friends'
 */
friends.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: friends.url(options),
    method: 'get',
})
/**
* @see \App\Http\Controllers\Api\FriendController::friends
 * @see app/Http/Controllers/Api/FriendController.php:117
 * @route '/api/friends'
 */
friends.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: friends.url(options),
    method: 'head',
})

    /**
* @see \App\Http\Controllers\Api\FriendController::friends
 * @see app/Http/Controllers/Api/FriendController.php:117
 * @route '/api/friends'
 */
    const friendsForm = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
        action: friends.url(options),
        method: 'get',
    })

            /**
* @see \App\Http\Controllers\Api\FriendController::friends
 * @see app/Http/Controllers/Api/FriendController.php:117
 * @route '/api/friends'
 */
        friendsForm.get = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: friends.url(options),
            method: 'get',
        })
            /**
* @see \App\Http\Controllers\Api\FriendController::friends
 * @see app/Http/Controllers/Api/FriendController.php:117
 * @route '/api/friends'
 */
        friendsForm.head = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: friends.url({
                        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                            _method: 'HEAD',
                            ...(options?.query ?? options?.mergeQuery ?? {}),
                        }
                    }),
            method: 'get',
        })
    
    friends.form = friendsForm
/**
* @see \App\Http\Controllers\Api\FriendController::searchUsers
 * @see app/Http/Controllers/Api/FriendController.php:144
 * @route '/api/users/search'
 */
export const searchUsers = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: searchUsers.url(options),
    method: 'get',
})

searchUsers.definition = {
    methods: ["get","head"],
    url: '/api/users/search',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\Api\FriendController::searchUsers
 * @see app/Http/Controllers/Api/FriendController.php:144
 * @route '/api/users/search'
 */
searchUsers.url = (options?: RouteQueryOptions) => {
    return searchUsers.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\Api\FriendController::searchUsers
 * @see app/Http/Controllers/Api/FriendController.php:144
 * @route '/api/users/search'
 */
searchUsers.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: searchUsers.url(options),
    method: 'get',
})
/**
* @see \App\Http\Controllers\Api\FriendController::searchUsers
 * @see app/Http/Controllers/Api/FriendController.php:144
 * @route '/api/users/search'
 */
searchUsers.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: searchUsers.url(options),
    method: 'head',
})

    /**
* @see \App\Http\Controllers\Api\FriendController::searchUsers
 * @see app/Http/Controllers/Api/FriendController.php:144
 * @route '/api/users/search'
 */
    const searchUsersForm = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
        action: searchUsers.url(options),
        method: 'get',
    })

            /**
* @see \App\Http\Controllers\Api\FriendController::searchUsers
 * @see app/Http/Controllers/Api/FriendController.php:144
 * @route '/api/users/search'
 */
        searchUsersForm.get = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: searchUsers.url(options),
            method: 'get',
        })
            /**
* @see \App\Http\Controllers\Api\FriendController::searchUsers
 * @see app/Http/Controllers/Api/FriendController.php:144
 * @route '/api/users/search'
 */
        searchUsersForm.head = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: searchUsers.url({
                        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                            _method: 'HEAD',
                            ...(options?.query ?? options?.mergeQuery ?? {}),
                        }
                    }),
            method: 'get',
        })
    
    searchUsers.form = searchUsersForm
const FriendController = { notifications, requests, sendRequest, accept, reject, friends, searchUsers }

export default FriendController