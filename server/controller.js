const bcrypt = require('bcrypt')

module.exports = {
    register: async (req, res) => {
        const { username, password } = req.body
        const profilePic = "https://robohash.org/profile"
        const db = req.app.get('db')

        let user = await db.check_user([username])
        user = user[0]
        if (user) {
            return res.status(400).send('Username Taken')
        }

        const salt = bcrypt.genSaltSync(10)
        const hash = bcrypt.hashSync(password, salt)

        let newUser = await db.register_user([username, hash, profilePic])
        newUser = newUser[0]
        res.status(201).send(newUser)
    },

    login: async (req, res) => {
        const { username, password } = req.body
        const db = req.app.get('db')

        let user = await db.check_user([username])
        user = user[0]
        if (!user) {
            return res.status(400).send('Incorrect Username')
        }

        const authenticated = bcrypt.compareSync(password, user.password)
        if (authenticated) {
            delete user.password
            res.status(202).send(user)
        } else {
            res.status(401).send('Incorrect Password')
        }
    },

    getPosts: async (req, res) => {
        const { user_id } = req.params
        const { search, userposts } = req.query
        const db = req.app.get('db')

        const posts = await db.get_posts([user_id])
        if (userposts === "true" && search) {
            const filteredPosts = posts.filter(e => {
                e.title.includes(search)
            })
            res.status(200).send(filteredPosts)
        } else if (userposts !== "true" && !search) {
            const filteredPosts = posts.filter(e => {
                let userId = user_id
                return e.author_id !== +userId
            })
            res.status(200).send(filteredPosts)
        } else if (userposts !== "true" && search) {
            const filteredPosts = posts.filter(e => {
                let userId = user_id
                return e.author_id !== +userId && e.title.includes(search)
            })
            res.status(200).send(filteredPosts)
        } else {
            res.status(200).send(posts)
        }
    },
    findPost: async (req, res) => {
        const { id } = req.params

        console.log(req.params)

        const db = req.app.get('db')

        const post = await db.find_post([+id])
        console.log(post)
        delete post[0].password
        res.status(200).send(post)
    }
}