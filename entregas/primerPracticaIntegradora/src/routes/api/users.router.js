const { Router } = require('express');
const { userModel } = require('../../models/users.model');
const router = Router();

router.get('/', async(request, response) => {
    const users = await userModel.find({})
    response.send({satus: 'success', payload: users})
})

router.post('/', async(request, response) => {
    const { body } = request
    const result = await userModel.create(body)
    response.send({status: 'success', payload: result})
})

router.get('/:uid', async(request, response) => {
    const { uid } = request.params
    const userFound = await userModel.findById({_id: uid})
    response.send({status: 'success', payload: userFound})
})

router.put('/:uid', (request, response) => {
    response.send('update User')
})

router.delete('/:uid', (request, response) => {
    response.send('delete User')
})

module.exports = router