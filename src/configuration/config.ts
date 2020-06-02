export default {
    port: process.env.PORT || 3000,
    secretyKey: process.env.SECRETYKEY || '15d7f01a-aeb0-452d-b77d-a3edb888c46a',
    publicRoutes: process.env.PUBLICROUTES || [
        'users/create',
        'users/auth'
    ]
}