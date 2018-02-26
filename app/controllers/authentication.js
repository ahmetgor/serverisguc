var request = require('request');

exports.login = function(req, res, next){
  console.log("login");
    next();
    // return res.send({data: "true"});

}

exports.linkedPerson = function(req, res, next){
  console.log("gübe"+req.query.token);
  request.get("https://api.linkedin.com/v1/people/~:(id,formatted-name,location,industry,summary,specialties"+
    ",positions,picture-urls::(original),site-standard-profile-request,email-address)?format=json", {
  'auth': {
    'bearer': req.query.token
  }},
        function(error, response, body) {
          console.log("hebe");
          console.log(body);
          // console.log(response);
              if (!error && response.statusCode == 200) {
                // res.body = body;
                  res.send(body);
                 }
             });
}

exports.relogin = function(req, res, next){
  console.log("gübe");
  request.get("https://www.linkedin.com/oauth/v2/accessToken?grant_type=authorization_code&code=" + req.query.code +"&redirect_uri=http%3A%2F%2Flocalhost%3A8080%2Fapi%2Fauth%2Fcallback&client_id=86p3aqpfdryb6f&client_secret=J3zZuknCc6B5M17o",
        function(error, response, body) {
          console.log("hebe");
          console.log(body);
          // console.log(response);
              if (!error && response.statusCode == 200) {
                res.body = body;
                  // res.send(body);
                  next();
                 }
             });
  // console.log(req.query.code);
  // console.log(req.query.state);
  // res.redirect("https://www.linkedin.com/oauth/v2/accessToken?grant_type=authorization_code&code=" + req.query.code +"&redirect_uri=http%3A%2F%2Flocalhost%3A8080%2Fapi%2Fauth%2Fcallback&client_id=86p3aqpfdryb6f&client_secret=J3zZuknCc6B5M17o")
  // console.log(res.body);
  // return res.send({data: "true"});
// return res.redirect("https://www.linkedin.com/oauth/v2/authorization?response_type=code&client_id=86p3aqpfdryb6f&redirect_uri=http://localhost:8080/api/auth/callback&state=252890252890&scope=r_basicprofile");
}

exports.reallogin = function(req, res, next){
  console.log("real");
  console.log(req.body);
  console.log(res.body);
  res.send(res.body);
}
