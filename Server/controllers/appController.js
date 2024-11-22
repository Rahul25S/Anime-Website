import UserModel from "../model/User.model.js"
import bcrypt from 'bcrypt'
/**POST: http://localhost:8080/api/register
 * @param : {
 * "username":"demo",
 * "password":"123456@",
 * "email":"demo@gmail.com",
 * "profile":""
 * }
 *  */
export async function register(req, res) {
    try {
        const { username, password, profile, email } = req.body;

        // Check for existing username
        const existUsername = new Promise((resolve, reject) => {
            UserModel.findOne({ username }, function (err, user) {
                if (err) reject(new Error(err));
                if (user) reject({ error: "Please use a unique username" });
                resolve();
            });
        });

        // Check for existing email
        const existEmail = new Promise((resolve, reject) => {
            UserModel.findOne({ email }, function (err, user) { // Change 'username' to 'email'
                if (err) reject(new Error(err));
                if (user) reject({ error: "Please use a unique Email" });
                resolve();
            });
        });
        

        Promise.all([existUsername, existEmail])
            .then(() => {
                if (password) {
                    bcrypt.hash(password, 10)
                        .then(hashedPassword => {
                            const user = new UserModel({
                                username,
                                password: hashedPassword,
                                profile: profile || '',
                                email
                            });

                            // Return save result as a response
                            user.save()
                                .then(result => res.status(201).send({ msg: "User registered successfully" }))
                                .catch(error => res.status(500).send({ error }));
                        })
                        .catch(error => {
                            return res.status(500).send({
                                error: "Unable to hash password"
                            });
                        });
                }
            })
            .catch(error => {
                return res.status(500).send({ error });
            });

    } catch (error) {
        return res.status(500).send(error);
    }
}

// Other functions
export async function login(req, res) {
    res.json('login route');
}
export async function getUser(req, res) {
    res.json('getUser route');
}
export async function updateUser(req, res) {
    res.json('updateUser route');
}
export async function generateOTP(req, res) {
    res.json('generateOTP route');
}
export async function verifyOTP(req, res) {
    res.json('verifyOTP route');
}
export async function createResetSession(req, res) {
    res.json('createResetSession route');
}
export async function resetPassword(req, res) {
    res.json('resetPassword route');
}