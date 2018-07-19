var express = require('express');
var router = express.Router();

var picturelist_controller = require('../controllers/picturelistController'); 

// PICTURELIST ROUTES //

// GET entire picturelist 
router.get('/', picturelist_controller.picturelist_getall_get);

// GET one picture
router.get('/:id', picturelist_controller.picturelist_getone_get);

// POST one picture
router.post('/create', picturelist_controller.picturelist_createone_post);

// PUT one picture
router.put('/update/:id', picturelist_controller.picturelist_updateone_put);

// DELETE one picture
router.delete('/delete/:id', picturelist_controller.picturelist_deleteone_delete);

module.exports = router;
