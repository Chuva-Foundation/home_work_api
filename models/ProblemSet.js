const connectDB = require('../config/database');

class ProbemSet {
    static async create(title, description, deadline, points, user_id) {
        try {
            const pset = await connectDB.query('INSERT INTO problems_sets (title, description, deadline, points, user_id) VALUES ($1, $2, $3. $4, $5) RETURNING *', [title, description, deadline, points, user_id])
            return pset.rows[0];
        } catch (error) {
            console.log(error.message);
        }
    } 

    static async update(id, title, description, deadline, points) {
        try {
            let pset;
            if (title) {
                pset = await connectDB.query('UPDATE problems_sets SET title = $1 WHERE id = $2 RETURNING *', [ title, id]);
            }
            if (description) {
                pset = await connectDB.query('UPDATE problems_sets SET description = $1 WHERE id = $2 RETURNING *', [ description, id]);
            }
            if (deadline) {
                pset = await connectDB.query('UPDATE problems_sets SET deadline = $1  WHERE id = $2 RETURNING *', [ deadline, id]);
            }
            if (points) {
                pset = await connectDB.query('UPDATE problems_sets SET points = $1 WHERE id = $2 RETURNING *', [ points, id]);
            }

        } catch (error) {
            console.log(error.message);
        }
    }

    static async getAllfromUser(user_id) {
        try {   
            const psets = await connectDB.query('SELECT * FROM problems_sets WHERE user_id = $1', [user_id]);
            return psets.rows;
        } catch (error) {
            console.log(error.message);
        }
    }

    static async getOne(id) {
        try {   
            const pset = await connectDB.query('SELECT * FROM problems_sets WHERE id = $1', [id]);
            return pset.rows[0];
        } catch (error) {
            console.log(error.message);
        }
    }

    static async getAll() {
        try {   
            const psets = await connectDB.query('SELECT * FROM problems_sets');
            return psets.rows;
        } catch (error) {
            console.log(error.message);
        }
    }
    
    static async delete(id) {
        try {
            await connectDB.query("DELETE FROM problems_sets WHERE id = $1", [id]);
            return true;
        } catch (error) {
            console.log(error.message);
            return false;
        }
    }
}

module.exports = ProbemSet;