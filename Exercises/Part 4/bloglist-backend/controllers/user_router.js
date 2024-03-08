const userRouter = require('express').Router()
const User = require('../models/user_model')
const bcrypt = require('bcrypt')

userRouter.get('/', async (request, response) => {
	const users = await User.find({}).populate('blogs', { url: 1, title: 1, author: 1 })

	response.status(200).json(users)
})

userRouter.post('/', async (request, response) => {
	const { username, name, password } = request.body

	if (password.length < 3) {
		response.status(400).json({ error: 'User validation failed: password is shorter than the minimum allowed length (3).' })
	}

	const saltRounds = 10
	const passwordHash = await bcrypt.hash(password, saltRounds)

	const user = new User({
		username,
		name,
		passwordHash
	})

	const savedUser = await user.save()
	response.status(201).json(savedUser)
})

module.exports = userRouter