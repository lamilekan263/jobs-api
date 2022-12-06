const Router = require('express').Router();

const { getAllJobs, createJob, getJob, deleteJob, editJob } = require('./jobControllers');


Router.route('/').post(createJob).get(getAllJobs);
Router.route('/:id').patch(editJob).get(getJob).delete(deleteJob);


module.exports = Router;