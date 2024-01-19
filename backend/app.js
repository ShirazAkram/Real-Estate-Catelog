// const express = require('express');
// const app = express();
// const port = 5000;

// app.get('/', (req, res) => {
//   res.send('Hello from the backend!');
// });


// app.listen(port, () => {
//   console.log(`Server is running on port ${port}`);
// });


const bcrypt = require('bcrypt');
const express = require('express');
const mongoose = require('mongoose');
const cors = require("cors")
const propertyRoutes = require('./routes/propertyRoutes');


const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());
app.use(express.urlencoded())
app.use(cors())


mongoose.connect('mongodb://127.0.0.1:27017/real-estate-db')
  .then(() => console.log('MongoDB Connected'))
  .catch((err) => {
    console.error('MongoDB Connection Error:', err);
    process.exit(1);
  }
);

const userSchema = new mongoose.Schema({
  email: String,
  password: String
})

const User = new mongoose.model("User", userSchema)

/*
app.post('/', (req, res) => {
  const { email, password } = req.body
  User.findOne({ email: email }, (err, user) => {
    if(user) {
      if(password === user.password ) {
        res.send({message: "Login Successfull", user: user})
      } else {
        res.send({message: "Password didn't match"})
      }
    } else {
      res.send({message: "User not registered"})
    }
  })
});
*/

app.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email: email }).exec();

    if (user) {
      if (password === user.password ) {
        res.send({ message: "Login Successful", user: user });
      } else {
        res.send({ message: "Password didn't match" });
      }
    } else {
      res.send({ message: "User not registered" });
    }
  } catch (error) {
    console.error(error);
    res.status(500).send({ message: "Internal Server Error" });
  }
});



app.post('/signup', async (req, res) => {
  try {
    const { email, password } = req.body;

    const existingUser = await User.findOne({ email: email }).exec();

    if (existingUser) {
      return res.status(400).send({ message: "User already registered" });
    }

    // const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = new User({
      email,
      password
    });

    await newUser.save();

    res.send({ message: "Successfully Registered, Please login now" });
  } catch (error) {
    console.error(error);
    if (error.name === 'ValidationError') {
      return res.status(400).send({ message: "Validation error", error: error.message });
    }
    res.status(500).send({ message: "Internal Server Error" });
  }
});

/*
app.post('/signup', (req, res) => {
  const { email, password } = req.body
  User.findOne({ email: email }, (err, user) => {
    if(user) {
      res.send({message: "User already registered"})
    } else {
      const user = new User({
        email,
        password
      })
      user.save( err => {
        if(err) {
          res.send(err)
        } else {
          res.send( { message: "Successfully Registered" })
        }
      })
    }
  })
  
});
*/


app.get('/add-property', async (req, res) => {
  try {
    const properties = await Property.find();
    res.json(properties);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.post('/add-property', async (req, res) => {
  try {
  const { PPDID, imageUrls, Property, Contact, Area, Views, Status, DaysLeft, Action } = req.body;
    

    const newProperty = new Property({
      PPDID,
      imageUrls,
      Property,
      Contact,
      Area,
      Views,
      Status,
      DaysLeft,
      Action
    });

    const savedProperty = await newProperty.save();
    res.status(201).json(savedProperty);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});

