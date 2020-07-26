const User = require('../models/user');
exports.checkLogin=async(req,res)=>{
    const {user_name, password} = req.body
    User.findOne({user_name:user_name})
    .then(user => {
        if(!user){
            res.json({data:{},status_code:300, messager: "That email is not registered"})

        }else{
            if(user.password!= password)
            res.json({data:{},status_code:300,messager: "Password is incorrect"})
            else res.json({
                data: {user:user},
                status_code:200,
                messager:"Success",
            });
        }
    }).catch(err =>{
        res.json({data:{},status_code:300,messager: "Error"});
    });
    
}
exports.checkRegister=async(req,res)=>{
    const {user_name, password,full_name,role_id}= req.body
   await User.findOne({user_name:user_name})
.then(user => {
    if(user)
    res.json({
        data: {},
        status_code:300,
        messager:"That email is registed",
    });
    else{
        const newUser = new User (req.body);
        newUser.save().then(user =>{
            res.json({
                data: {user:user},
                status_code:200,
                messager:"Success",
            });
        })
    }
})
.catch(err=> {
    res.json({data:{},status_code:300,messager: "Error"});
});   
}
