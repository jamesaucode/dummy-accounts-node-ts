import {Pool} from 'pg';
import express from 'express';

const pool = new Pool({
    database: 'mydb',
    port: 5432,
    host: 'localhost',
    user: 'budi',
    password: 'jjbubudi',
});

pool.connect();

const createAccount = (
    request: express.Request,
    response: express.Response,
) => {
    // POST
    const {name, email} = request.body;
    pool.query(
        'INSERT INTO account (name, email) VALUES ($1, $2)',
        [name, email],
        (error, results) => {
            if (error) {
                throw error;
            }
			console.log(results);
            response
                .status(201)
                .send(
                    `User ${name} with has been added`,
                );
        },
    );
};

const getAccounts = (request: express.Request, response: express.Response) => {
    // get all users detail
    // GET
    pool.query('SELECT * FROM account', (error, results) => {
        if (error) {
            throw error;
        }
        response.status(200).json(results.rows);
    });
};

const updateAccount = (
    request: express.Request,
    response: express.Response,
) => {
    // PUT
    const id = parseInt(request.params.id);
    const {name, email} = request.body;
    pool.query(
        'UPDATE account SET name= $1, email =$2, WHERE id = $3',
        [name, email, id],
        (error, results) => {
            if (error) {
                throw error;
            }
            response.status(200).send(`User ${name} updated !`);
        },
    );
};

const deleteAccount = (request : express.Request, response: express.Response) => {
	const id = parseInt(request.params.id);
	pool.query('DELETE FROM account WHERE id = $1', [id], (error, results) => {
		if (error) {
			throw error;
		}
		response.status(200).send(`User with id ${id} deleted.`);
	})
}

module.exports = {
    getAccounts,
    createAccount,
	updateAccount,
	deleteAccount
};
