var Person = require('../models/person');
var Tag = require('../models/tag');

exports.getPersons = function(req, res, next){
  var notInId = [];
  notInId = notInId.concat(req.body.like);
  notInId = notInId.concat(req.body.dislike);
  notInId.push(req.body.id);
  // console.log(req.body.like+"req.body.like");
  // console.log(notInId+"notInId");
  var puan = 0;
  var tagOran = 0;
  var tagTable = [4,3,2,1.3,1,0.7];
  var yilTable = [4,3,2,2,1,1];
  var altmaas = parseInt(req.body.maas, 10)-1000;
  var ustmaas = parseInt(req.body.maas, 10)+1000;
  var uzm = [];
  var tgs = [];
  // console.log(altmaas +''+ ustmaas);
  req.body.uzmanlik.forEach(function(item){
  uzm.push(item.id);
  // console.log('ID: ' + item.id);
});
  req.body.tags.forEach(function(item, i){
  tgs.push(item.id);
  tagOran = tagOran + tagTable[i];
// console.log('ID: ' + item.id);
});
// console.log(tagOran);
// console.log(tgs);

    Person.find({ id: { $nin:notInId}, tip: { $in:req.body.tip },sehir: { $in:req.body.sehir }
      ,uzmanlik: { $elemMatch: { id: { $in:uzm }}} ,tags: { $elemMatch: { id: { $in:tgs }}}
      ,maas: { $gte:altmaas }, maas: { $lte:ustmaas }
    }
      , function(err, kayit) {

        if (err){
            return res.send(err);
        }
        // console.log(kayit);
        // Object.keys(kayit).forEach(key => {
        //     console.log(kayit[key].location);
        //   });
        kayit.forEach(function(kayitItem, i) {
          puan = 0;
          // console.log(JSON.stringify(item.formattedName));
          // console.log(kayitItem.uzmanlik);
          // console.log(i);
          req.body.uzmanlik.forEach(function(myUzmanlik) {
            kayitItem.uzmanlik.forEach(function(uzmanlikItem) {
              if(myUzmanlik.id == uzmanlikItem.id) {
              puan = puan + 23 + (myUzmanlik.yil-uzmanlikItem.yil)*3;
              return;
            }
            });
            if (puan > 0) return;
          });

          req.body.tags.forEach(function(myTags, j) {
            kayitItem.tags.forEach(function(tagsItem, k) {
              if(myTags.id == tagsItem.id && myTags.yil-tagsItem.yil > -4) {
              puan = puan + (myTags.yil-tagsItem.yil)*yilTable[j] + 70/tagOran*tagTable[j];
              return;
            }
            });
          });
          kayitItem.puan = Math.round(puan);
        });

        kayit = kayit.filter(function (item) {
          return item.puan >= 30;
        });
        kayit.sort(function(a, b) {
          return b.puan - a.puan;
          });
          kayit = kayit.slice(req.body.slice, req.body.slice+2);
        // console.log(kayit);
        res.json(kayit);
    });
  }

exports.updatePerson = function(req, res, next){
    console.log("updatePerson");
    req.body.guncellemeTarih = Date.now();
    Person.findOneAndUpdate({
        id : req.body.id
    }, {$set: {emailAddress:req.body.emailAddress, formattedName:req.body.formattedName, location:req.body.location,
          pictureUrls:req.body.pictureUrls, pictureUrl:req.body.pictureUrl, positions:req.body.positions,
          siteStandardProfileRequest:req.body.siteStandardProfileRequest, summary:req.body.summary}
    }, { upsert: true, new: true }, function(err, kayit) {

      if (err){
          return res.send(err);
      }
      var per = JSON.parse(JSON.stringify(kayit));
      console.log(per.like);
      Person.find({id: { $in: per.like}, like: per.id }, {id:1,_id:0},
        function(err, likedBy) {

          if (err){
            console.log(err);
              return res.send(err);
          }
          // console.log(likedBy);
          // console.log(kayit);
          per.likedBy = JSON.parse(JSON.stringify(likedBy));
          if(!per.eslesme) per.eslesme = [];
          console.log(JSON.stringify(per.likedBy)+"likedBy");
          console.log(JSON.stringify(per.eslesme)+"peres");
          per.likedBy.map(function (likedByItem) {
            per.eslesme.map(function (eslesmeItem) {
            // if(per.eslesme.findIndex(function(eslesmeItem) { eslesmeItem.id === likedByItem.id }) === -1) {
            // var yeniEslesme = {};
            console.log("a");
            console.log(likedByItem.id+" b "+eslesmeItem.id+"  a  "+likedByItem.id === eslesmeItem.id);
            // yeniEslesme.id = likedByItem.id;
            // yeniEslesme.tarih = Date.now();
            // per.eslesme.push(yeniEslesme);
          // }
        });
          });

          res.json(per);
      });
      // .sort({guncellemeTarih: -1});
      // console.log(kayit);
        // res.json(kayit);
    });
}

exports.updateTercih = function(req, res, next){
    // console.log(req.body);
    req.body.guncellemeTarih = Date.now();
    Person.findOneAndUpdate({
        id : req.body.id
    }, req.body, { new: true }, function(err, kayit) {

      if (err){
          return res.send(err);
      }
      // console.log(kayit);
        res.json(kayit);
    });
}

exports.getTag = function(req, res, next){
  var tagex = new RegExp(req.query.tag, "i");
  var cat = new RegExp(req.query.cat, "i");
    Tag.find({ tag: tagex, cat: cat }, function(err, kayit) {

        if (err){
          return  res.send(err);
        }

        res.json(kayit);
      })
      .limit(15)
      .sort({count: -1});
    }

    exports.getEslesme = function(req, res, next){
      // console.log(req.query.like +'req.query.like' );
      // console.log(req.query.id +'req.query.id' );
      // console.log(req.query.like+"req.query.like");
      var likeArray = req.query.like.split(",");
      // console.log(likeArray +'likeArray' );
        Person.find({id: { $in: likeArray}, like: req.query.id },
          function(err, kayit) {

            if (err){
                return res.send(err);
            }

            res.json(kayit);
        })
        .sort({guncellemeTarih: -1});
      }

  // exports.updateMessages = function(req, res, next){
  //   // console.log(req.query.operation);
  //   if (req.query.operation == "gönderildi") {
  //   Person.updateMany({
  //       id : {$in: [req.body.to, req.body.from]}
  //   }, {$push: {messages: req.body}}, function(err, kayit) {
  //
  //     if (err){
  //         return res.send(err);
  //     }
  //     // console.log(kayit);
  //       res.json(kayit);
  //   });
  //   }
  //
  //   else {
  //     Person.updateMany({
  //         id : {$in: [req.body.to, req.body.from]}
  //     }, {$pull: {messages: req.body}}, function(err, kayit) {
  //
  //       if (err){
  //           return res.send(err);
  //       }
  //       // console.log(kayit);
  //         res.json(kayit);
  //     });
  //     }
  //   }


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
