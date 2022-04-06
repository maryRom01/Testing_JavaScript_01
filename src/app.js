const data = require('./data/mock.json')
const express = require("express");

const app = express();

app.use(express.json());

//---- GET ----------------
app.get("/test/get", (req, res) =>  {
  res.status(200).json(data);
})

//---- POST ---------------
const courses = [
    {id : 1, name: 'course1'},
    {id : 2, name: 'course2'},
    {id : 3, name: 'course3'}
];

app.get('/test/courses', (req, res) => {
    res.send(courses);
})

app.post('/test/courses', (req, res) => {
    if (!req.body.name || req.body.name.length < 4) {
        res.status(400).send(' Name is required and should be min 3 characters');
        return;
    }
    const course = {
        id : courses.length + 1,
        name: req.body.name
    };
    courses.push(course);
    res.status(200).send(course);
})

module.exports = app;


