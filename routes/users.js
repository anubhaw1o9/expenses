/*const router = require('express').Router();
const User= require('../models/user.model');

router.get('/', (req, res) => {                     //or router.route('/').get()
    User.find()
    .then(users => res.json(users))
    .catch(err => res.status(400).json('Error:' + err));
});
//CREATE
router.post('/add', (req, res)=> {
    const name =String(req.body.name);
    const password = String(req.body.password);
    const contactno = req.body.contactno;
    const email = String(req.body.email);
    const dob = Date(req.body.dob);

    const newUser =new User ({
     name,
     password, 
     contactno,
     email, 
     dob,
    });

newUser.save()
.then(()=> res.json('user added'))
.catch(err => res.status(400).json('Error: ' + err));
});



router.get('/:id', (req, res)=> {
    User.findById(req.params.id)
    .then(user => res.json(user))
    .catch(err => res.status(400).json('Error:' + err));
});


//DELETE
router.delete('/:id', (req, res)=> {
    User.findByIdAndDelete(req.params.id)
    .then(user => res.json('User Removed'))
    .catch(err => res.status(400).json('Error:' + err));
});

//UPDATE
router.post('/update/:id', (req, res)=> {
    User.findById(req.params.id)
    .then(user => {
        user.name=req.body.name;
        user.password= req.body.password;
        user.contactno= req.body.contactno;
        user.email= req.body.email;
        user.dob= req.body.dob;

        user.save()
            .then(()=> res.json('User details Updated'))
            .catch(err => res.status(400).json('Error: ' + err));
    })
    .catch(err => res.status(400).json('Error:' + err));
});





module.exports = router;*/