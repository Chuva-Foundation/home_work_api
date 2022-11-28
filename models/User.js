const connectDB = require('../config/database');
const bcrypt = require('bcrypt');

class User {
    static async create(user_name, email, password , full_name, gender, user_type) {
        try {
            const hash_password = await bcrypt.hash(password, 8);
            const user = await connectDB.query('INSERT INTO users (user_name, email, password, full_name, gender, user_tp) VALUES($1, $2, $3, $4, $5, $6) RETURNING *', [user_name, email, hash_password, full_name, gender, user_type]);
            return user.rows[0];
        } catch (error) {
            console.log(error.message);
        }
    } 

    static async update(id, user_name, email, password , full_name) {
        try {
            let user;
            if (user_name) {
                user = await connectDB.query('UPDATE users SET user_name = $1 WHERE id = $2', [user_name ,id]);
            }
            if (email) {
                user = await connectDB.query('UPDATE users SET email = $1 WHERE id = $2', [email ,id]);
            }
            if (password) {
                const hash_password = await bcrypt.hash(password, 8);
                user = await connectDB.query('UPDATE users SET password = $1 WHERE id = $2', [hash_password, id])
            }
            if (full_name) {
                user = await connectDB.query('UPDATE users SET full_name = $1 WHERE id = $2', [full_name, id])
            }
        
            return user.rows[0];
        } catch (error) {
            console.log(error.message);
        }
    }

    static async getByEmail(email) {
        try {
            const user = await connectDB.query('SELECT * FROM users WHERE email = $1', [email]);
            return user.rows[0];
        } catch(error) {
            console.log(error.message);
        }
    }

    static async getById(id) {
        try {
            const user = await connectDB.query('SELECT * FROM users WHERE id = $1', [id]);
            return user.rows[0];
        } catch(error) {
            console.log(error.message);
        }
    }

    static async getAll(user_type) {
        try {
            const user = await connectDB.query('SELECT full_name, user_tp FROM users WHERE user_tp = $1', [user_type]);
            return user.rows;
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

module.exports = User; 