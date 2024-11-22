import mongoose from "mongoose";

export const UserSchema = new mongoose.Schema({
    username: {
        type: String,
        required: [true, "Please provide a unique username"],
        unique: [true, "Username exists"]
    },
    password: {
        type: String,
        required: [true, "Please provide a password"],
        unique: false,
    },
    email: {
        type: String,
        required: [true, "Please provide an email"],
        unique: true,
    },
    profile: { type: String }
});

// Prevent model overwrite during development
export default mongoose.models.User || mongoose.model('User', UserSchema);
