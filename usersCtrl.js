let userData = require('./userData.json');
let id = 101;


module.exports = {
    getUsers: (req, res) => {
        if (req.query.age) {
            const { age } = req.query;
            let userArr = [];
            // I would like to see some of the higher order methods on these, just to make your intentions more clear
            for (let i = 0; i < userData.length; i++) {
                if (userData[i].age < age) {
                    userArr.push(userData[i])
                }
            }
            res.status(200).send(userArr);

        } else if (req.query.email) {
            const { email } = req.query;
            let userArr = [];
            for (let i = 0; i < userData.length; i++) {
                if (userData[i].email === email) {
                    userArr.push(userData[i])
                }
            }
            res.status(200).send(userArr);
        } else if (req.query.favorites) {
            const { favorites } = req.query;
            let userArr = [];
            //using a filter and an includes can clean this up nice 
            for (let i = 0; i < userData.length; i++) {
                for (let x = 0; x < userData[i].favorites.length; x++) {
                    if (userData[i].favorites[x] === favorites) {
                        userArr.push(userData[i]);
                    }
                }
            }
            res.status(200).send(userArr);
        } else {
            res.status(200).send(userData);
        }
    },
    getUser: (req, res) => {
        const { id } = req.params;
        //same on higher order
        for (let i = 0; i < userData.length; i++) {
            if (userData[i].id == id) {
                res.status(200).send(userData[i]);
            }
        }
        res.sendStatus(404);
    },
    getAdmins: (req, res) => {
        let userArr = [];
        for (let i = 0; i < userData.length; i++) {
            if (userData[i].type === 'admin') {
                userArr.push(userData[i]);
            }
        }
        res.status(200).send(userArr);
    },
    getNonAdmins: (req, res) => {
        let userArr = [];
        for (let i = 0; i < userData.length; i++) {
            if (userData[i].type !== 'admin') {
                userArr.push(userData[i])
            }
        }
        res.status(200).send(userArr);
    },
    getTypeUser: (req, res) => {
        const { userType } = req.params;
        let userArr = [];
        for (let i = 0; i < userData.length; i++) {
            if (userData[i].type === userType) {
                userArr.push(userData[i]);
            }
        }
        res.status(200).send(userArr);
    },
    updateUser: (req, res) => {
        const { id } = req.params;
        // try using the spread operator a bit more to really shorten this up
        const { first_name, last_name, email, gender, language, age, city, state, type, favorites } = req.body;
        console.log(req.body);
        for (let i = 0; i < userData.length; i++) {
            if (userData[i].id == id) {
                userData[i] = {
                    ...userData[i],
                    first_name,
                    last_name,
                    email,
                    gender,
                    language,
                    age,
                    city,
                    state,
                    type,
                    favorites
                }
            }
        }

        res.status(200).send(userData);
    },
    addUser: (req, res) => {
        const { first_name, last_name, email, gender, language, age, city, state, type, favorites } = req.body;
        // spread operator can shorten these two lines into about 20 characters
        const user = {
            id,
            first_name,
            last_name,
            email,
            gender,
            language,
            age,
            city,
            state,
            type,
            favorites
        };
        id++;
        userData.push(user);
        res.status(200).send(userData);
    },
    deleteUser: (req, res) => {
        const {id} = req.params;
        // filter could be good here too
        for (let i = 0; i < userData.length; i++) {
            if (userData[i].id == id) {
                userData.splice(i, 1);
            }
        }

        res.status(200).send(userData);
    }
}
