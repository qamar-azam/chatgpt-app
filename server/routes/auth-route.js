const { Signup, Login } = require('../controllers/auth-controller');
const { userVerification } = require('../middlewares/auth-middlewares');
const router = require('express').Router();

router.post('/signup', Signup);
router.post('/signin', Login);
router.post('/', userVerification);

module.exports = router;
