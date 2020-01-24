const express = require('express')
const router = express.Router()

const userController = require('../app/controllers/userController')
const authenticateUser = require('../app/middlewares/authentication')
const incomeController = require('../app/controllers/incomeController')
const expenseController = require('../app/controllers/expenseController')
const categoryController = require('../app/controllers/categoryController')
const borrowController = require('../app/controllers/borrowController')
const lendController = require('../app/controllers/lendController')

router.post('/register', userController.register)
router.post('/login', userController.login)
router.get('/user', authenticateUser, userController.account)

router.get('/incomes', authenticateUser, incomeController.list)
router.post('/incomes', authenticateUser, incomeController.create)
router.put('/incomes', authenticateUser, incomeController.trashAndStar)
router.put('/incomes_delete', authenticateUser, incomeController.removeTrash)
router.put('/incomes/:id', authenticateUser, incomeController.edit)

router.get('/expenses', authenticateUser, expenseController.list)
router.post('/expenses', authenticateUser, expenseController.create)
router.put('/expenses', authenticateUser, expenseController.trashAndStar)
router.put('/expenses_delete', authenticateUser, expenseController.removeTrash)
router.put('/expenses/:id', authenticateUser, expenseController.edit)

router.get('/categories', authenticateUser, categoryController.list)
router.post('/categories', authenticateUser, categoryController.create)

router.get('/borrows', authenticateUser, borrowController.list)
router.post('/borrows', authenticateUser, borrowController.create)
router.put('/borrows', authenticateUser, borrowController.trashAndStar)
router.put('/borrows_delete', authenticateUser, borrowController.removeTrash)
router.put('/borrows/:id', authenticateUser, borrowController.edit)

router.get('/lends', authenticateUser, lendController.list)
router.post('/lends', authenticateUser, lendController.create)
router.put('/lends', authenticateUser, lendController.trashAndStar)
router.put('/lends_delete', authenticateUser, lendController.removeTrash)
router.put('/lends/:id', authenticateUser, lendController.edit)

module.exports = router