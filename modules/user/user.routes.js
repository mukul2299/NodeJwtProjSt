const userController= require('../user/user.controller')
const validations=require('./user.validation');
const prefixUrl='/api/v1/user';
// app.use(json());



module.exports=async (app)=>{
    app
    .post(prefixUrl+'/',validations.registerValidator, (req,res)=> userController.createUser(req,res));
    
    app
    .route(prefixUrl+'/')
    .get(userController.getUser);

    app
    .route(prefixUrl+'/:id')
    .get(userController.getUserById);
    
    app
    .route(prefixUrl+'/:id')
    .put(userController.updateUser);
    
    app
    .route(prefixUrl+'/:id')
    .delete(userController.deleteUser);
    
    app
    .route(prefixUrl+'login')
    .put(userController.loginUser);
    
    app
    .route(prefixUrl+'logout')
    .get(userController.logoutUser)
    
    
}

// router.get('/',(req,res)=>{
//     User.find().then(data=>res.send(data),err=>res.send(err))
// });

// router.post('/login',validators.loginValidator,(req,res)=>{
//     res.send('Logged In');
// })



//     router.put('/:id',tokenVerifier,(req,res)=>{
        
//         User.findByIdAndUpdate(req.params.id,req.body,{ useFindAndModify: false},(err,data)=>{
//             if (err){
//                 console.log(err);
//             }
//             else{
//                 res.send("updated");
//             }
//         });
        
//     })

//     router.delete('/:id',tokenVerifier,(req,res)=>{
//         User.findByIdAndDelete(req.params.id).then(data=>{
//             res.send('Deleting '+data);
//         },
//         err=>{
//             res.send(err);
//         })
//     });

//     router.get('/search/:value',tokenVerifier,async (req,res)=>{
//         console.log('Search hitted');
//         try{
//             const searchedData= await User.find({name:{'$regex':req.params.value}});
//             res.send(searchedData);
//         }
//         catch(err){
//             res.send(err);
//         }


//         // Logout
//     router.delete('/logout',(req,res)=>console.log('Logged out')); 
        
        
//     });
    
    
// module.exports=router;