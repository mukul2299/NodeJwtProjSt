const userService= require('../user/user.services');
const userModel = require('./user.model');
const { loginValidator } = require('./user.validation');

const userController={
    createUser: async (req,res)=>{

        res.send(await userService.createAUser(req.body));
    },
    getUser:async (req,res)=>{

        res.send(await userService.getAUser());
    },
    getUserById:async (req,res)=>{

        res.send(await userService.getAUserById(req.params.id));
    },
    updateUser:async (req,res)=>{

        res.send(await userService.updateAUser(req.params.id,req.body));
    },
    deleteUser:async (req,res)=>{

        res.send(await userService.deleteAUser(req.params.id));
    },
    loginUser: async (req, res) => {
        const response = await loginValidator(req, res, userService.loginAUser);
        if (response.status) {
            
            // console.log(res.header('auth-token'));
            res.redirect("http://localhost:3003/api/v1/product/userlogin");

        }
        else res.send(await loginValidator(req,res,userService.loginAUser));
        
    },
    logoutUser: async (req, res) => {
       
        // console.log("logout cont", user);
        res.send(await userService.logoutAUser({ 'token': req.header('auth-token') }));
      // loginValidator(req, res, userService.logoutAUser);
    }
}
    

    

module.exports=userController;