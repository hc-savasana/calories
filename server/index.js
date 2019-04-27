const app = require('./config.js')
const path = require('path')

const db = require('../database/mysql.js')

/*
the two arguments that these requests take are
(name of the table in the database and the function used in your server/index.js
which is the functions your server uses to get and post data to your database)
*/
// HTTP Requests go here
// react-router fallback so we can reload without visiting root
app.get('/*', function(req, res) {
  res.sendFile(path.join(__dirname, '/../client/dist/index.html'), function(err) {
    if (err) {
      res.status(500).send(err)
    }
  })
})

app.get('/userInfo', getThisData)
app.post('/userInfo', postThisData)
app.get('/calneed', getDataCaloriesNeeded)

function getThisData (request, response) {
  db.getMyData(data => {
    response
      .status(200)
      .send(data)
      .end()
  })
};

function postThisData (request, response) {
  const { name, weight, height, gender, BMI, calories_needed } = request.body
  db.postMyData(name, weight, height, gender, BMI, calories_needed, (res) => {
    response
      .status(200)
      .send(res)
      .end()
  })
};

function getDataCaloriesNeeded (request, response) {
  db.getMyCaloriesNeeded(dataCaloriesNeeded => {
    console.log(dataCaloriesNeeded)
    response
      .status(200)
      .send(dataCaloriesNeeded)
      .end()
  })
};

const port = (process.env.PORT || 3000)

app.listen(port, () => {
  console.log(`Listening on Port ${port}`)
})
