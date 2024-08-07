export const atuhorization = (roles) => {
    return async (request, response, next) => {
        // roles[0] === PUBLIC -> next()
        logger.info(request.user)
        // repetido 
        if (!request.user) return res.status(401).send({error: 'Unauthoized'})
        if(request.user.user.role !== role)
            return response.status(401).send({error: 'Not permissions'})
        next()
    }
}