'use strict';
module.exports = function(app) {
    var gameOfApi = require('../controllers/gameController');

    app.route('/houses')
        .get(gameOfApi.listHouses);

    app.route('/house')
        .post(gameOfApi.includeHouse);

    app.route('/houseById/:id')
        .get(gameOfApi.consultHouseById)

    app.route('/houseByName/:name')
        .get(gameOfApi.consultHouseByName)

    app.route('/house/:houseId')    
        .put(gameOfApi.updateHouse)
        .delete(gameOfApi.deleteHouse);

};