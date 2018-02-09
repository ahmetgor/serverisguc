var PersonController = require('./controllers/persons'),

    express = require('express');
    // passport = require('passport');

// var requireAuth = passport.authenticate('jwt-user', {session: false}),
//     requireLogin = passport.authenticate('user-login', {session: false}),

module.exports = function(app){

    var apiRoutes = express.Router(),
        personRoutes = express.Router();

    apiRoutes.use('/persons', personRoutes);

    // personRoutes.get('/', PersonController.getUsers);
    // personRoutes.get('/:id', requireAuth, PersonController.getUser);
    // personRoutes.delete('/:user_id', PersonController.deleteUser);
    personRoutes.put('/', PersonController.updatePerson);
    personRoutes.put('/tercih', PersonController.updateTercih);
    personRoutes.get('/tags', PersonController.getTag);
    personRoutes.post('/', PersonController.getPersons);
    personRoutes.get('/eslesme', PersonController.getEslesme);
    personRoutes.put('/message', PersonController.updateMessages);

    // apiRoutes.use('/ozgecmis', ozgecmisRoutes);
    // // aktiviteRoutes.get('/ozgecmis', AktiviteController.getBasvurular);
    // ozgecmisRoutes.put('/:ozgecmis_id/:param_name', OzgecmisController.updateOzgecmis);
    // ozgecmisRoutes.get('/:ozgecmis_id', requireAuth, OzgecmisController.getOzgecmis);
    // ozgecmisRoutes.get('/firma/:ozgecmis_id', OzgecmisController.getOzgecmis);
    //
    // ozgecmisRoutes.post('/begen/:ozgecmis_id/', OzgecmisController.begenOzgecmis);
    // ozgecmisRoutes.post('/begenme/:ozgecmis_id/', OzgecmisController.begenmeOzgecmis);

    // Set up routes
    app.use('/api', apiRoutes);
}
