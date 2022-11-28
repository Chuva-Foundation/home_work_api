const connectDB = require('../config/database');

class Submission {
    static async create(user_id, pset_id, dir_path) {
        try {
            const submission = await connectDB.query('INSERT INTO submissions (user_id, pset_id, dir_path) VALUES($1, $2, $3) RETURNING *', [user_id, pset_id, dir_path]);
            return submission.rows[0];
        } catch (error) {
            console.log(error.message);
        }
    } 

    static async evaluation(id, points) {
        try {
            const submission = await connectDB.query('UPDATE submissions SET user_points = $1 WHERE id = $2 RETURNING *', [points, id]);
            return submission.rows[0];
        } catch (error) {
            console.log(error.message);
        }
    } 

    static async getOne(id) {
        try {
            const user = await connectDB.query('SELECT * FROM submissions WHERE id = $1', [id]);
            return user.rows[0];
        } catch(error) {
            console.log(error.message);
        }
    }

    static async getAll(user_id) {
        try {
            const user = await connectDB.query('SELECT * FROM submissions WHERE user_id = $1', [user_id]);
            return user.rows;
        } catch(error) {
            console.log(error.message);
        }
    }
    
    static async delete(id) {
        try {
            await connectDB.query('DELETE FROM submissions WHERE id = $1', [id]);
            return true;
        } catch (error) {
            console.log(error.message);
            return false;
        }
    }
    static async update(id, dir_path) {
        try {
            await connectDB.query('UPDATE submissions SET dir_path = $1 FROM users WHERE id = $2', [ dir_path, id]);
            return true;
        } catch (error) {
            console.log(error.message);
            return false;
        }
    }

}



module.exports = Submission;