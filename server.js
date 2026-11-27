let app = require('./config/app');
let port = process.env.PORT || 3001;

app.listen(port, function() {
    console.log('Server running on port ' + port);
});