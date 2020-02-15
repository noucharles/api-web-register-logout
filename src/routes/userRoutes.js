var express = require('express');

var userController = require('../controllers/userController.js');


module.exports= (router) => {
/*
 * GET
 */
router.get('/', userController.list);

/*
 * GET
 */
router.get('/:id', userController.show);

/*
 * POST
 */
router.post('/create', userController.create);


/*
 * POST
 */
router.post('/login', userController.login);

/*
 * PUT
 */
router.put('/:id', userController.update);

/*
 * DELETE
 */
router.delete('/:id', userController.remove);

}

