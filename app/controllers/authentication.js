var request = require('request');

exports.login = function(req, res, next){
  console.log("login");
    next();

}

exports.relogin = function(req, res, next){
  // request.get({ url: "https://www.linkedin.com/oauth/v2/authorization?response_type=code&client_id=86p3aqpfdryb6f&redirect_uri=http://localhost:8100&state=252890252890&scope=r_basicprofile" },
  //       function(error, response, body) {
  //         console.log("hebe");
  //             if (!error && response.statusCode == 200) {
  //                 res.send(body);
  //                }
  //            });

return res.redirect("https://www.linkedin.com/oauth/v2/authorization?response_type=code&client_id=86p3aqpfdryb6f&redirect_uri=http://localhost:8100&state=252890252890&scope=r_basicprofile");

}
