require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");
const cookie = require("cookie-parser");
const multer = require("multer");
const isThereLoggedUser = require("./middlewares");
const nodemailer = require("nodemailer");

const { promisify } = require("util");
const { type } = require("os");
const app = express();

app.use(express.json());
app.use(cookie());

app.use(express.static("public"));
app.use("/cars", express.static("cars"));
app.use("/defaultImages", express.static("defaultImages"));
app.use("/fonts", express.static("fonts"));

mongoose
  .connect(process.env.DATABASE_URL)
  .then(() => console.log("MongoDB connected"))
  .catch((error) => console.log(error));

const multerStorage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "public/images");
  },
  filename: (req, file, cb) => {
    const ext = file.mimetype.split("/")[1];
    cb(null, `${Date.now()}.${ext}`);
  },
});

const multerFilter = (req, file, cb) => {
  if (file.mimetype.startsWith("image")) {
    cb(null, true);
  } else {
    cb(new Error("Not an image! Only images allowed."), false);
  }
};

const upload = multer({
  storage: multerStorage,
  fileFilter: multerFilter,
});

const carSchema = new mongoose.Schema({
  model: {
    type: String,
    minlength: [2, "Must be 2-40 characters."],
    maxlength: [40, "Must be 2-40 characters."],
    required: true,
  },

  make: {
    type: String,
    required: true,
    minlength: [2, "Must be 2-15 characters."],
    maxlength: [15, "Must be 2-15 characters."],
  },

  year: {
    type: Number,
    required: true,
    minlength: [4, "Must be 4 numbers, like 2024!"],
    maxlength: [4, "Must be 4 numbers, like 2024!"],
  },

  color: {
    type: String,
    required: true,
    minlength: [2, "Must be 2-15 characters."],
    maxlength: [15, "Must be 2-15 characters."],
  },

  miles: { type: Number },

  fueltype: { type: String },

  gearbox: { type: String },

  city: { type: String },

  price: { type: Number, required: true },

  images: {
    type: [String], // Array of image URLs
    // required: true,
  }, // Store file paths (URLs) in an array

  armored: {
    type: Boolean,
    default: false,
    required: true,
  },

  carOwnerEmail: { type: String },
});

const Car = mongoose.model("Car", carSchema);

//user schema
const userSchema = new mongoose.Schema({
  name: {
    type: String,
    unique: true,
    required: true,
    minlength: 2,
    maxlength: 20,
  },

  email: {
    type: String,
    required: true,
    unique: true,
    lowercase: true,
  },

  password: {
    type: String,
    required: true,
  },

  passwordConfirm: {
    type: String,
    validate: {
      validator: function (value) {
        // `this` refers to the current document
        return value === this.password;
      },
      message: "Passwords do not match",
    },
  },

  favorites: [{ type: mongoose.Schema.Types.ObjectId, ref: "Car" }],
});

const User = mongoose.model("User", userSchema);

//CAR ROUTES
//get all cars
app.get("/cars", async (req, res) => {
  const cars = await Car.find();
  res.json({ cars: cars });
});

//Get the car by the make
app.get("/carsByMake", async (req, res) => {
  try {
    const { make } = req.query; // Get search term from query string
    let filter = {};

    if (!make) return res.json({ message: "Please type a make." });

    if (make) {
      filter.make = new RegExp(make, "i"); // Case-insensitive search
    }

    const cars = await Car.find(filter);

    if (!cars.length) return res.json({ message: "No cars with this make!" });

    // Ensure an exact match
    const exactMatch = cars.some(
      (car) => car.make.toLowerCase() === make.toLowerCase()
    );

    if (!exactMatch) return res.json({ message: "No cars with this make!" });

    res.json({ message: "Make found", cars });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error fetching cars" });
  }
});

//get individual car
app.get("/cars/:carId", async (req, res) => {
  // Check if the ID is a valid MongoDB ObjectId
  if (!mongoose.Types.ObjectId.isValid(req.params.carId)) {
    return res.json({ message: "Invalid car ID" });
  }

  try {
    const car = await Car.findById(req.params.carId);
    if (!car) {
      return res.json({ message: "Car not found" });
    }

    res.json({ car });
  } catch (error) {
    console.error("Error fetching car:", error);
    res.json({ message: "Server error" });
  }
});

//post/sell a car
app.post(
  "/sellACar",
  isThereLoggedUser,
  upload.array("images", 3),
  async (req, res) => {
    try {
      console.log(req.file);
      console.log(req.body);

      const {
        model,
        make,
        year,
        color,
        miles,
        fueltype,
        gearbox,
        city,
        price,
        armored,
        carOwnerEmail,
      } = req.body;

      const images = req.files.map((file) => file.filename); // ✅ Correct

      const newCar = await Car.create({
        model,
        make,
        year,
        color,
        miles,
        fueltype,
        gearbox,
        city,
        price,
        armored,
        images,
        carOwnerEmail,
      });

      res.json({ message: "Ad created", car: newCar });
    } catch (error) {
      if (error.name === "ValidationError") {
        return res.json({ message: error.message });
      }
    }
  }
);

//Favorite a car
app.patch("/favoriteCar/:carId", isThereLoggedUser, async (req, res) => {
  const { carId } = req.params;
  const userId = req.body.userId;

  try {
    const user = await User.findById(userId);

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    const isFavorite = user.favorites.includes(carId);

    if (isFavorite) {
      // Remove from favorites if already in the list
      user.favorites = user.favorites.filter((id) => id.toString() !== carId);
    } else {
      // Add to favorites if not in the list
      user.favorites.push(carId);
    }

    await user.save();
    res.json({
      message: "Car favorited",
      favorites: user.favorites,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error updating favorite status" });
  }
});

//Get the user favorited cars
app.get("/favorites", isThereLoggedUser, async (req, res) => {
  try {
    const token = req.cookies.jwt; // Get token from cookies

    if (!token) {
      // If no token is found, return an error message
      return res.json({ message: "JWT must be provided. Please log in." });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET); // Verify the token
    req.user = await User.findById(decoded.id).select("-password"); // Attach user to req

    if (!req.user) {
      return res.status(401).json({ message: "User not found" });
    }

    const user = await User.findById(req.user._id).populate("favorites");

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    res.json({ favorites: user.favorites });
  } catch (error) {
    // Handle errors properly, such as invalid token or other issues
    console.error(error);
    if (error instanceof jwt.JsonWebTokenError) {
      return res.status(401).json({ message: "Invalid token" });
    }
    res.status(500).json({ message: "Error fetching favorites" });
  }
});

//USER ROUTES
//Sign up
//objective: create user, send token
app.post("/signup", async (req, res) => {
  try {
    const userExists = await User.findOne({ email: req.body.email });
    if (userExists)
      return res.json({
        message: "There is already an account with that email!",
      });

    const newUser = await User.create({
      name: req.body.name,
      email: req.body.email,
      password: req.body.password,
      passwordConfirm: req.body.passwordConfirm,
    });

    return res.json({ message: "User signed up", newUser });
  } catch (error) {
    if (error.name === "ValidationError") {
      return res.json({ message: error.message });
    } else if (error.code === 11000) {
      // MongoDB duplicate key error code
      return res.json({ message: "That name is already taken!" });
    }
  }
});

//Log in
//objective: check if user exists, send token
app.post("/login", async (req, res) => {
  const email = req.body.email;
  const password = req.body.password;

  if (!email || !password)
    return res.json({ message: "Please provide a valid email and password!" });

  const user = await User.findOne({ email: email });

  if (!user) return res.json({ message: "User not found!" });

  if (password !== user.password)
    return res.json({ message: "Wrong password!" });

  const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRE_TIME,
  });

  res.cookie("jwt", token, {
    httpOnly: true,
    secure: false, //set to true when you host
    sameSite: "strict",
    maxAge: 7 * 24 * 60 * 60 * 1000,
  });

  res.json({ message: "User logged in!" });
});

//get user
app.get("/getUser", isThereLoggedUser, async (req, res) => {
  let token = req.cookies.jwt;

  // Check if the token is missing
  if (!token) {
    return res.json({ message: "Not authenticated" });
  }

  try {
    // Verify the token
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    // Check if the decoded data exists
    if (!decoded) {
      return res.json({ message: "Invalid token" });
    }

    // Find the current user
    const currentUser = await User.findById(decoded.id);

    // If no user is found, send a response indicating the user no longer exists
    if (!currentUser) {
      return res.status(404).json({
        message: "The user belonging to this token no longer exists",
      });
    }

    // Send the user information back
    res.json({ currentUser });
  } catch (error) {
    console.error(error);
    return res.status(401).json({ message: "Invalid or expired token" });
  }
});

//Send email to the user that posted the car ad
app.post("/sendEmail", isThereLoggedUser, async (req, res) => {
  const { name, email, number, message, carOwnerEmail, subject } = req.body;

  if (!name || !email || !number || !message || !carOwnerEmail) {
    return res.status(400).json({ message: "All fields are required!" });
  }

  try {
    // Create a transporter using an email service like Gmail, SMTP, etc.
    let transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.TEMPLATE9BACKEND_GMAIL, // Your email
        pass: process.env.TEMPLATE9BACKEND_APP_PASSWORD, // Your email password or app password
      },
    });

    // Email content
    let mailOptions = {
      from: `"${name}" <${email}>`,

      //You must send the email to the user email, set the user email to the localstorage,
      //you already have a fetch data logs the user to the console,
      //carOwnerEmail is navysealbey@gmail.com just for testing.
      to: carOwnerEmail,
      subject: `${name} is INTERESTED in your ${subject}!`,
      text: `Name: ${name}\nEmail: ${email}\nPhone: ${number}\n\nMessage:\n${message}`,
    };

    // Send email
    await transporter.sendMail(mailOptions);
    res.json({ message: "Email sent successfully!" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error sending email" });
  }
});

//Log out
//objective: delete token, if there's a token there's a logged in user
app.post("/logout", isThereLoggedUser, (req, res) => {
  res.cookie("jwt", "", { httpOnly: true, maxAge: 0 });
  res.json({ message: "Logged out successfully!" });
});

app.listen(process.env.PORT, () =>
  console.log(`Server running on port ${process.env.PORT}`)
);
