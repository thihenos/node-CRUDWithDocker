'use strict';

module.exports = function (app) {

		//getting the file which has all the routes to save any users
		let user = require('./routes/user');
		
		app.get('/user/new',user.new);
		app.get('/user',user.findAll);
		app.get('/user/:id',user.find);
		app.post('/user',user.create);
		app.post('/user/:id',user.update);
		app.delete('/user/:id',user.destroy);

		//app.get('/user/join',user.join);

		/* If the user tries to access any address of the app which not exists in routes.js file, 
		 * it will be send to the show page, which will return all data saved
		 */
		app.route('/*').get(function (req, res) {
	    	res.render('user/show');
	  	});

};