const express = require('express')
const router = express.Router()

const { getLists, setList, updateList, deleteList } = require('../controllers/listContoller')
const { protect } = require('../middleware/authMiddleware')
router.route('/').get(protect, getLists).post(protect, setList)
router.route('/:id').put(protect, updateList).delete(protect, deleteList)

// router.get('/', getGoals)
// router.post('/', setGoal)
// router.put('/:id', updateGoal)
// router.delete('/:id', deleteGoal)

module.exports = router;