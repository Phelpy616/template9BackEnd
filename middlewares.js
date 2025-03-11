//Middleware to check if there's logged in user
const isThereLoggedUser = (req, res, next) => {
  // Check if cookies exist
  if (!req.headers.cookie) {
    return res.json({ message: "You are not logged in! Please log in." });
  }

  next();
};

//autentification middleware

module.exports = isThereLoggedUser;
