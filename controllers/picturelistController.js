var Picturelist = require('../models/picturelist')
var async = require('async')

const { body, validationResult } = require('express-validator/check');
const { sanitizeBody } = require('express-validator/filter');

exports.picturelist_getall_get = function (req, res, next)
{
	Picturelist.find({}, function(err2, res2)
	{
		//console.log("picturelist_getall_get");
		// jump away if error found
		if (err2)
		{
			return next(err2);
		}
		else
		{
			// no error - return this
			//res.json({text: 'get all'})
			res.json(res2);
		}
	});
};

exports.picturelist_getone_get = function (req, res, next)
{
	Picturelist.find({ _id: req.params.id }, function(err2, res2)
	{
		//console.log("picturelist_getone_get");
		// jump away if error found
		if (err2)
		{
			return next(err2);
		}
		else
		{
			// no error - return this
			//res.json({text: 'get one'})
			res.json(res2);
		}
	});
};

exports.picturelist_createone_post =
[
	// Validate input
	body('name').isLength({ min: 4, max: 100 }).trim().withMessage('Name too long or short'),
	body('description').isLength({ max: 100 }).trim().withMessage('Description too long or short'),
	body('directory').isLength({ min: 1, max: 100 }).trim().withMessage('Directory name too long or short'),

	// Sanitize fields
    sanitizeBody('name').trim().escape(),
    sanitizeBody('description').trim().escape(),
    body('directory').trim(),

(req, res, next) =>
{
	const validationerror = validationResult(req);

	if (!validationerror.isEmpty())
	{
		return res.status(422).json({ errors: validationerror.mapped() });
	}

	let NewPicturelist = new Picturelist
	({
		name: req.body.name,
		description: req.body.description,
		directory: req.body.directory
	});
	NewPicturelist.save( function(err2, res2)
	{
		//console.log("picturelist_createone_post");
		// jump away if error found
		if (err2)
		{
			return next(err2);
		}
		else
		{
			// no error - return this
			//res.json({text: 'post one'})
			res.json(res2);
		}
	});
}
];


exports.picturelist_updateone_put =
[
	// Validate input
	body('name').isLength({ min: 5, max: 100 }).trim().withMessage('Name too long or short'),
	body('description').isLength({ max: 100 }).trim().withMessage('Description too long or short'),
	body('directory').isLength({ min: 1, max: 100 }).trim().withMessage('Directory name too long or short'),

	// Sanitize fields
    sanitizeBody('name').trim().escape(),
    sanitizeBody('description').trim().escape(),
    body('directory').trim().escape(),

	(req, res, next) =>
	{
		console.log('IN PUT', req.body)
	const validationerror = validationResult(req);

	if (!validationerror.isEmpty())
	{
		return res.status(422).json({ errors: validationerror.mapped() });
	}

	Picturelist.findOneAndUpdate(
		{ _id : req.params.id },
		req.body,
		{ new : true }, // returns updated picture info
		function(err2, res2)
		{
			console.log(err2)
			//console.log("picturelist_updateone_put");
			// jump away if error found
			if (err2)
			{
				return next(err2);
			}
			else
			{
				// no error - return this
				//res.json({text: 'put one'})
				res.json(res2);
			}
		}
	);
}
];

exports.picturelist_deleteone_delete = function (req, res, next)
{
	Picturelist.findOneAndRemove(
		{ _id : req.params.id },
		function(err2, res2)
		{
			//console.log("picturelist_deleteone_delete");
			// jump away if error found
			if (err2)
			{
				return next(err2);
			}
			else
			{
				// no error - return this
				//res.json({text: 'delete one'})
				res.json(res2);
			}
		});
};
