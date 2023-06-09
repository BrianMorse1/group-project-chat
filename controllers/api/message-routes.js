// necessary dependencies and models
const router = require('express').Router();
const sequelize = require('../../config/connection');
const {Message, User, Room} = require('../../models');
const withAuth = require('../../utils/auth');
const {QueryTypes} = require('sequelize');

// the api/message endpoint

//route to display messages from a given room
router.get('/', async (req, res) => {
    try{
        const messages = await sequelize.query('SELECT message.id, message.content, message.sent_at, user.userName, room.name FROM message JOIN room ON room.id = message.room_id JOIN user ON user.id = message.author_id ORDER BY message.sent_at ASC', {type: QueryTypes.SELECT});
        res.status(200).json(messages)
    }
    catch (err) {
        res.status(500).json(err);
    }
});

//route to post message in a given room
//passport.authenticate with json web token may not be necessary. cant remove. Also may need to specify which room is being posted in in the path.
router.post('/', withAuth, async (req, res) => {
    try{
        const newMessage = await Message.create(req.body)
        res.status(201).json(newMessage);
    }
    catch (err) {
        res.status(500).json(err);
    }
});

//route to delete message by id, will likely need to add event listener to front end js to provide selected message's id to the route when delete button is pushed
router.delete('/:id', async (req, res) => {
    try{
        const messageId = req.body.id;
        const message = await Message.findByPk(messageId);
        await message.destroy();
        res.status(204).json();
        }
        catch (err) {
            res.status(500).json(err);
        }
        });

        module.exports = router;