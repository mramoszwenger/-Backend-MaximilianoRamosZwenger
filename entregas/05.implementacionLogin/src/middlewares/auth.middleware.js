export function auth(request, response, next) {
    if(request.session?.user?.email === 'max@gmail.com' && request.session?.user?.admin) {
        return next()
    }

    return response.status(401).send('error de autorización')
}