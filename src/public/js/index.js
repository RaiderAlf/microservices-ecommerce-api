var moment = require('moment');

function formatFecha(fecha) {
    let date = moment(fecha)
    return date.format('MMMM Do YYYY, h:mm:ss a')
}