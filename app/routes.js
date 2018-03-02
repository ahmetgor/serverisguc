var PersonController = require('./controllers/persons'),
    AuthController = require('./controllers/authentication'),
    LinkedInStrategy = require('passport-linkedin').Strategy,

    express = require('express'),
    passportService = require('../config/passport'),
    passport = require('passport');

var requireAuth = passport.authenticate('linkedin-login', {session: false});
//     requireLogin = passport.authenticate('user-login', {session: false}),

module.exports = function(app){

    var apiRoutes = express.Router(),
        personRoutes = express.Router(),
        authRoutes = express.Router();

    apiRoutes.use('/persons', personRoutes);

    personRoutes.put('/', PersonController.updatePerson);
    personRoutes.put('/tercih', PersonController.updateTercih);
    personRoutes.get('/tags', PersonController.getTag);
    personRoutes.post('/', PersonController.getPersons);
    personRoutes.get('/eslesme', PersonController.getEslesme);
    personRoutes.put('/message', PersonController.updateMessages);

    apiRoutes.use('/auth', authRoutes);

    authRoutes.get('/', requireAuth);
    authRoutes.get('/callback', AuthController.relogin);
    authRoutes.get('/linkedPerson', AuthController.linkedPerson);


//     passport.use(new LinkedInStrategy({
//     consumerKey: '86p3aqpfdryb6f',
//     consumerSecret: 'J3zZuknCc6B5M17o',
//     callbackURL: "http://127.0.0.1:8080/api/auth/callback"
//   },
//   function(token, tokenSecret, profile, done) {
//       console.log('passs');
//       return done(null, profile);
//   }
// ));

// authRoutes.get('/',
//   passport.authenticate('linkedin'),
//   function(req, res){
//     // console.log("getget");
//     // res.redirect('https://www.linkedin.com/oauth/v2/authorization?response_type=code&client_id=86p3aqpfdryb6f&redirect_uri=http://localhost:8080/api/auth/callback&state=252890252890&scope=r_basicprofile')
//
//   });

// GET /auth/linkedin/callback
//   Use passport.authenticate() as route middleware to authenticate the
//   request.  If authentication fails, the user will be redirected back to the
//   login page.  Otherwise, the primary route function function will be called,
//   which, in this example, will redirect the user to the home page.
// authRoutes.get('/callback',
//   passport.authenticate('linkedin', { failureRedirect: '/login' }),
//   function(req, res) {
//     res.redirect('/');
//   });

    // personRoutes.get('/', PersonController.getUsers);
    // personRoutes.get('/:id', requireAuth, PersonController.getUser);
    // personRoutes.delete('/:user_id', PersonController.deleteUser);

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
