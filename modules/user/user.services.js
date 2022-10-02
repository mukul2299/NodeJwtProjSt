const User = require('./user.model');
const bcrypt = require('bcryptjs');
const userService = {
  createAUser: async (user) => {
    // Password hash
    const salt = await bcrypt.genSalt(10);
    const hashedPass = await bcrypt.hash(user.password, salt);

    try {
      const savedUser = await User.create({
        name: user.name,
        email: user.email,
        password: hashedPass,
        city: user.city,
      });
      return {
        status: true,
        data: savedUser,
      };
    } catch (err) {
      console.log("------- Inside Post request--------- " + err);
      return {
        data: JSON.stringify(err),
        status: false,
      };
    }
  },

  getAUser: async () => {
    try {
      const foundUser = await User.find();
      return {
        status: true,
        data: foundUser,
      };
    } catch (err) {
      console.log("------- Inside getAll request--------- " + err);
      return {
        status: false,
        data: err,
      };
    }
  },

  getAUserById: async (id) => {
    try {
      const foundUser = await User.find({ _id: id });
      return {
        status: true,
        data: foundUser,
      };
    } catch (err) {
      console.log("------- Inside getById request--------- " + err);
      return {
        status: false,
        data: err,
      };
    }
  },

  updateAUser: async (id, updates) => {
    try {
      const updatedUser = await User.findByIdAndUpdate(id, updates, {
        useFindAndModify: false,
      });
      return {
        status: true,
        data: updatedUser,
      };
    } catch (err) {
      console.log("------- Inside updateUser1 request--------- " + err);
      return {
        status: false,
        data: err,
      };
    }
  },

  deleteAUser: async (id) => {
    try {
      const deletedUser = await User.findByIdAndDelete({ _id: id });
      return {
        status: true,
        data: deletedUser,
      };
    } catch (err) {
      console.log("------- Inside Delete request--------- " + err);
      return {
        status: false,
        data: err,
      };
    }
  },

  loginAUser: async (updates,res) => {
    console.log("4 updates", updates);
    try {
      const updatedUser = await User.findByIdAndUpdate(updates._id, updates, {
        useFindAndModify: false,
      });

      return {
        status: true,
        data: updatedUser,
        header:res.header('auth-token')
      };
    } catch (err) {
      console.log("------- Inside loginUser request--------- " + err);
      return {
        status: false,
        data: err,
      };
    }
  },

    logoutAUser: async (theToken) => {
      console.log((theToken));
      try {
          const user = await User.findOne(theToken);
          console.log("4 updates", user);
          user.token = "";
          const updatedUser = await User.findByIdAndUpdate({ _id: user._id }, user, {
        useFindAndModify: false,
      });
          console.log('updateduser', updatedUser);
          return {
              status: true,
              data:updatedUser
          }
      }
      catch (err) {
          console.log(err);
          return {
              status: false,
              data:err
          }
      }
  }
};

module.exports= userService;
