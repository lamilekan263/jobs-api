const Job = require('../../models/jobModel');
const { param } = require('./jobRoutes');

async function getAllJobs (req, res) {
    try {


        const jobs = await Job.find();

        return res.status(200).json({
            status: 'success',
            length: jobs.length,
            jobs
        });

    } catch (error) {
        return res.status(500).json({
            status: 'failed',
            err: error.message
        });
    }
}


async function getJob (req, res) {
    try {

        const { user, params } = req;

        const job = await Job.findOne({ _id: params.id, createdBy: user._id });

        if (!job) {
            return res.status(404).json({
                status: 'failed',
                message: `The job with this id: ${ params.id } does not exist`
            });
        }
        return res.status(200).json({
            status: 'success',
            job
        });

    } catch (error) {
        return res.status(500).json({
            status: 'failed',
            err: error.message
        });
    }
}


async function createJob (req, res) {
    try {

        const { company, position } = req.body;

        req.body.createdBy = req.user._id;

        console.log(req.body.createdBy);

        if (!company || !position) {
            return res.status(400).json({
                status: 'failed',
                message: 'missing parameters'
            });
        }

        const job = await Job.create(req.body);

        return res.status(201).json({
            status: 'success',
            job
        });
    } catch (error) {
        return res.status(500).json({
            status: 'failed',
            err: error.message
        });
    }
}


async function editJob (req, res) {
    try {

        const { user, params, body } = req;

        const { company, position } = body;

        if (!company || !position) {
            return res.status(400).json({
                status: 'failed',
                message: 'missing parameters'
            });
        }

        const job = await Job.findOneAndUpdate({ _id: params.id, createdBy: user._id }, body, {
            new: true,
            runValidators: true
        });

        if (!job) {
            return res.status(400).json({
                status: 'failed',
                message: 'not found'
            });
        }

        return res.status(200).json({
            status: 'success',
            job
        });
    } catch (error) {
        return res.status(500).json({
            status: 'failed',
            err: error.message
        });
    }
}


async function deleteJob (req, res) {
    try {


        const { params, user } = req;

        const job = await Job.findOneAndDelete({ _id: params.id, createdBy: user._id });

        if (!job) {
            return res.status(400).json({
                status: 'failed',
                message: 'not found'
            });
        }

        return res.status(200).json({
            status: 'success'
        });

    } catch (error) {
        return res.status(500).json({
            status: 'failed',
            err: error.message
        });
    }

}


module.exports = {
    getAllJobs,
    getJob,
    createJob,
    editJob,
    deleteJob
};
