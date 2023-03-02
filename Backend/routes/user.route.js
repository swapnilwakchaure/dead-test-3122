const express = require("express");
const bcrypt = require("bcrypt");
const cloudinary = require("cloudinary").v2;

const { UserModel } = require("../models/user.model");

const userRouter = express.Router();


cloudinary.config({
    cloud_name: 'dizg7bb5y',
    api_key: '313556399659348',
    api_secret: 'ycOC7jF89PERj-T2r23bz5N0b7U',
    secure: true
});


// -------------- USER DATA GET REQUEST -------------- //
userRouter.get("/", async (request, response) => {
    const query = request.query;

    try {
        const user = await UserModel.find(query);
        response.send(user);
    } catch (error) {
        response.send({ "Message": "Cannot able to get user data", "Error": error.message });
    }
});


// -------------- USER REGISTRATION POST REQUEST -------------- //
userRouter.post("/register", async (request, response) => {
    const { first_name, last_name, email, password } = request.body;
    const file = request.files.avatar;

    try {
        cloudinary.uploader.upload(file.tempFilePath, (error, result) => {
            if (error) {
                response.send({ "Massage": "Cannot able to upload image", "Error": error });
            } else {
                bcrypt.hash(password, 5, async (error, hash) => {
                    if (error) {
                        response.send({ "Massage": "Cannot able to get the password", "Error": error });
                    } else {
                        if (result.url && first_name && last_name && email && hash) {
                            const user = new UserModel({ avatar: result.url, first_name, last_name, email, password: hash });
                            await user.save();
                            response.send({ "Message": `${first_name} is successfully registered! Please Logged In!` });
                        } else {
                            response.send({ "Message": "All fields are required!" });

                        }
                    }
                });
            }
        })
    } catch (error) {
        response.send({ "Message": "Something went wrong", "Error": error.message });
    }
});


// -------------- USER LOGIN POST REQUEST -------------- //
userRouter.post("/login", async (request, response) => {
    const payload = request.body;

    try {
        const user = new UserModel(payload);
        await user.save();
        response.send({ "Message": `${payload.email} is successfully login!` });
    } catch (error) {
        response.send({ "Message": "Login failed, please try again!", "Error": error.message });
    }
});


// -------------- USER UPDATE DELETE REQUEST -------------- //
userRouter.delete("/delete/:id", async (request, response) => {
    const ID = request.params.id;

    try {
        await UserModel.findByIdAndDelete({ _id: ID });
        response.send({ "Message": `User of id: ${ID} is successfully deleted` });
    } catch (error) {
        response.send({ "Message": "Cannot able to delete the user", "Error": error.message });
    }
});



module.exports = { userRouter };