var Person = require('../models/person');

exports.getPersons = function(req, res, next){
  // console.log(req.query.firma +'firma' );
    Person.find({ firma: req.user.firma }, function(err, kayit) {

        if (err){
            return res.send(err);
        }

        res.json(kayit);
    });
  }

exports.updatePerson = function(req, res, next){
    // console.log(req.body);
    req.body.guncellemeTarih = Date.now();
    Person.findOneAndUpdate({
        id : req.body.id
    }, {$set: {emailAddress:req.body.emailAddress, formattedName:req.body.formattedName, location:req.body.location,
          pictureUrls:req.body.pictureUrls, positions:req.body.positions,
          siteStandardProfileRequest:req.body.siteStandardProfileRequest, summary:req.body.summary}
    }, { upsert: true, new: true }, function(err, kayit) {

      if (err){
          return res.send(err);
      }
      console.log(kayit);
        res.json(kayit);
    });
}

  //   exports.getPerson = function(req, res, next){
  //
  //       Person.findOne({ email: req.params.email }, { password: 0 }, function(err, kayit) {
  //
  //           if (err){
  //             return  res.send(err);
  //           }
  //
  //           res.json(kayit);
  //         });
  //     }

  exports.deletePerson = function(req, res, next){

      Person.remove({
          _id : req.params.user_id
      }, function(err, kayit) {

        if (err){
            return res.send(err);
        }
          res.json(kayit);
      });
    }
