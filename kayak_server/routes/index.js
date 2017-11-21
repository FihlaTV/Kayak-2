var express = require('express');
var router = express.Router();
var url = require('url');

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

module.exports = router;
router.post('/insertHotel', function (req,res,next) {
    try{
          var reqObj = req.body;
          console.log(reqObj);
          
          req.getConnection(function (err,conn) {
              if(err){
                console.error('SQL connection error:', err)
              }
              else {
                  var insertSql = "INSERT INTO Hotels SET ?";
                  var insertValues = {
                      "HotelName" : reqObj.hName,
                      "HotelCity" : reqObj.city,
                      "HotelAddress" : reqObj.address,
                      "PricePerNight" : reqObj.price,
                      "NumberSleepsPerRoom" : reqObj. sleeps,
                      "RoomsAvailable" : reqObj.rooms,
                      "TotalCapacity" : reqObj.capacity
                  };
                  var query = conn.query(insertSql,insertValues,function (err,result) {
                      if(err){
                        console.error('SQL error: ', err);
                      }
                      console.log(result);
                      var hotel_id = result.insertId;
                      res.json({"HotelId" : hotel_id});
                  });
              }
          });
    }
    catch (ex){
      console.error("internal error:"+ex);
      return next(ex);
    }
});
