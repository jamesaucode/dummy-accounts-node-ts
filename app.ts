import express from 'express';
import bodyParser from 'body-parser';
const db = require('./queries/queries')
const app : express.Application = express();
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({
	extended: true,
}))
app.get('/', db.getAccounts);
app.post('/', db.createAccount);
app.put('/', db.updateAccount);
app.delete('/:id', db.deleteAccount);

app.listen(3000, () => {
	console.log('Listening at Port 3000'); })
