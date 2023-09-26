const router = require('express').Router();
const {
  fetchChat,
  searchChat,
  deleteChat
} = require('../controllers/chat-controller');

router.get('/:user', fetchChat);
router.post('/search', searchChat);
router.delete('/delete/:id', deleteChat);

module.exports = router;
