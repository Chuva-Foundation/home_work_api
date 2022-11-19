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

    static async getById(id) {
        try {
            const user = await connectDB.query('SELECT * FROM users WHERE id = $', [id]);
            return user.rows[0];
        } catch(error) {
            console.log(error.message);
        }
    }
    
    static async delete(id) {
        try {
            await connectDB.query('DELETE FROM users WHERE id = $1', [id]);
            return true;
        } catch (error) {
            console.log(error.message);
            return false;
        }
    }

}

