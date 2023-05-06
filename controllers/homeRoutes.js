const router = require('express').Router();
const {Room, User, Message, Project} = require('../models');
const withAuth = require('../utils/auth');

router.get('/', withAuth, async (req, res) => {
    try {
        /*const userData = await User.findByPk(req.session.user_id, {
            attributes: { exclude: ['password'] },
            include: [{ model: Project }, { model: Room }]
        });
        console.log(userData);

        const user = userData.get({ plain: true });*/

        res.render('home', {
            logged_in: req.session.logged_in 
        });
    }catch(err){
        res.status(500).send('Internal Server Error');
    }
});

router.get('/login', (req, res) => {
    // If the user is already logged in, redirect the request to another route
    if (req.session.logged_in) {
      res.redirect('/');
      return;
    }
  
    res.render('login');
});
  

module.exports = router;