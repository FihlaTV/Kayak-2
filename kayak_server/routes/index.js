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


router.get('/getHotelNames', function (req,res,next) {
    try{
        var query = url.parse(req.url,true).query;
        console.log(query);
        var queryCity = query.queryCity;
        var queryGuests = query.queryGuests;
        var queryRooms = query.queryRooms;
        queryGuests = queryRooms*queryGuests;
        console.log(queryCity);
        console.log(queryGuests);
        console.log(queryRooms);
        console.log(queryGuests);

        req.getConnection(function(err,conn){
            if(err){
                console.error('sql connection error:', err);
            }
            else
            {
                conn.query('SELECT HotelName,HotelAddress,PricePerNight from Hotels where HotelCity= ? and RoomsAvailable>= ? and TotalCapacity>= ? ',[queryCity,queryRooms,queryGuests], function (err,rows,fields) {
                    if(err){
                        console.error('sql error:' + err);
                        return next(err);
                    }
                    var resHotel = [];
                    for (var hotelIndex in rows) {
                        var hotelObj = rows[hotelIndex];
                        resHotel.push(hotelObj);
                    }
                    res.json(resHotel);
                } );
            }
        });

    } catch (ex) {
        console.error("Internal error:" + ex);
        return next(ex);
    }
});
