// api routes for rooms
const router = require('express').Router();
const {Member, User, Room, Message} = require('../../models');

//route to display all rooms
router.get('/', async (req, res) => {
    
    try{
        const rooms = await Room.findall();
        res.status(200).json(rooms);
    } catch (err) {
        res.status(500).json(err);
    }
});

//get route for room called by id. possibly used for something? unsure.
router.get('/:id', async (req, res) => {
    try{
        const room = await Room.findByPk(req.params.id);
        if(!room){
            res.status(404).json({message: 'Room not found'});
            return;
        };
    } catch {
        res.status(500).json(err);
    }   
});