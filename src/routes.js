const express = require('express');
const routes = express.Router();
const ProfileController = require('./controllers/ProfileController');
const JobController = require('./controllers/JobController');
const ClockController = require('./controllers/ClockController');
const CronometerController = require('./controllers/CronometerController');
const AboutController = require('./controllers/AboutController');
const DashboardController = require('./controllers/DashboardController');

// request, response
routes.get('/', DashboardController.index)
routes.get('/job', JobController.create)
routes.post('/job', JobController.save)
routes.get('/job/:id', JobController.show)
routes.post('/job/:id', JobController.update)
routes.post('/job/delete/:id', JobController.delete)
routes.get('/profile', ProfileController.index)
routes.post('/profile', ProfileController.update)
routes.get('/clock', ClockController.show)
routes.get('/cronometer', CronometerController.show)
routes.get('/about', AboutController.show)

module.exports = routes;