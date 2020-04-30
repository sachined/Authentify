const router = require('express').Router();
const verify = require('./verifiedToken');

router.get('/', verify, (req, res) =>  {
    res.send(req.user);
    // res.json({
    //     posts: {
    //         title: 'my first post',
    //         description: 'random data you should\'t access'
    //     }
    // });
});


module.exports = router;
