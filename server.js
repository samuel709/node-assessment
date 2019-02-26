const express = require('express');
const userCtrl = require('./usersCtrl')
const PORT = 3000;

const app = express();
app.use(express.json());

app.get('/api/user', userCtrl.getUsers);
app.get('/api/user/:id', userCtrl.getUser);
app.get('/api/admin', userCtrl.getAdmins);
app.get('/api/nonadmin', userCtrl.getNonAdmins);
app.get('/api/type/:userType', userCtrl.getTypeUser);
app.put('/api/user/:id', userCtrl.updateUser);
app.post('/api/user', userCtrl.addUser);
app.delete('/api/user/:id', userCtrl.deleteUser);

app.listen(3000, () => console.log(`Listening on port ${PORT}`));