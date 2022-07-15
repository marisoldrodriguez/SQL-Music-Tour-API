// DEPENDENCIES
const stages = require('express').Router()
const db = require('../models')
const { Stage, Event } = db
const { Op } = require('sequelize')
// const { Events } = require('pg')

// INDEX ROUTE - FIND ALL EVENTS
stages.get('/', async (req, res) => {
    try{
        const foundStages = await Stage.findAll({
            // BONUS - LIMIT AND PAGINATION QUERY
            // limit: 1,
            // offset: 1,
             // BONUS - FILTER BY NAME WITH A QUERY STRING
            where: {
                name: { [Op.like]: `%${req.query.name ? req.query.name : ''}%` }
            }
        })
        res.status(200).json(foundStages)
    }
    catch (error) {
        res.status(500).json(error)
    }
})

// CREATE A Event Route
stages.post('/', async (req, res) => {
    try{
        const newStage = await Stage.create(req.body)
        res.status(200).json({
            message: 'Successfully inserted a new stage',
            data: newStage
        })
    }
    catch (error) {
        res.status(500).json(error)
    }
})

// SHOW ROUTE - FIND A SPECIFIC BAND
stages.get('/:name', async (req, res) => {
    try{
        const foundStage = await Stage.findOne({
            where: { name: req.params.name },
            include: {  
                 model: Event,
                 as: "events"               
                },     
            })
        res.status(200).json(foundStage)
    }
    catch (error){
        console.log(error);
        res.status(500).json(error)
    }
})

// UPDATE AN EVENT
stages.put('/:id', async (req, res) => {
    try{
        const updatedStages = await Stage.update(req.body, {
            where: {
                stage_id: req.params.id
            }
        })
        res.status(200).json({
            message: `Successfully updated ${updatedStages} stage(s)`
        })
    }
    catch (error){
        res.status(500).json(error)
    }
})

// DELETE AN EVENT
stages.delete('/:id', async (req, res) => {
    try{
        const deletedStages = await Stage.destroy({
            where: {
                stage_id: req.params.id
            }
        })
        res.status(200).json({
            message: `Successfully deleted ${deletedStages} stage(s)`
        })
    }
    catch (error){
        res.status(500).json(error)
    }
})

// EXPORT
module.exports = stages