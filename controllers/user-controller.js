import User from "../models/User";
import bcrypt from "bcryptjs";



export const getAllUsers= async(req,res,next)=>{
    let users;

    try{
        users= await User.find();
    }
    
    catch(err)
    {
        return next(err);
    }

    if(!users)
    {
        return res.status(500).json({message:"Unexpected Error Occured"});

    }

    return res.status(200).json({users});

};



export const signup = async(req,res,next)=>
{
    const {name,email,password}=req.body;
    if(!name&&
        name.trim()===""&& 
        !email && 
        email.trim()===""&& 
        !password && 
        password.trim==="")
    {
        return res.status(422).json({message:"Invalid Inputs"});

    }

    const hashedPassword=bcrypt.hashSync(password);

    let user;

    try{

        user=new User({name,email,password:hashedPassword});
        user= user.save();
    }
     catch(err)
    {
        return console.log(err);

    }

        if(!user)
        {
            return res.staus(500).json({message:"Unexpected error Ocuured"});

        }

        return res.status(201).json({user});

    };


  
        
export const updateUser = async(req,res,next)=>{
     const id= req.params.id;

    const {name,email,password}=req.body;
    if(!name&&
        name.trim()===""&& 
        !email && 
        email.trim()===""&& 
        !password && 
        password.trim==="")
    {
        return res.status(422).json({message:"Invalid Inputs"});

    }
    const hashedPassword=bcrypt.hashSync(password);

    let user;




try{
  user=await User.findByIdAndUpdate(id,{name,email,password:hashedPassword});


}
catch(err){

    return console.log({err});

}

if(!user)
{
    return res.status(500).json({message:"Something went wrong!!!"});
}

res.status(200).json({message:"Updated Successfully"});

};

export const deleteUser= async(req,res,next)=>
{

    const id= req.params.id;

    let user;

    try{
        user=await User.findByIdAndRemove(id);


    }

    catch(err){

        return console.log(err);

    }
    
    return res.status(200).json({message:"Deleted Successfully"});

}


export const login= async(req,res,next)=>
{

    const {email,password}=req.body;
    if( 
        !email && 
        email.trim()===""&& 
        !password && 
        password.trim==="")
    {
        return res.status(422).json({message:"Invalid Inputs"});

    }

    let existingUser;

    try{
        existingUser=await User.findOne({email});

    }
    catch(err){
        return console.log(err);

    }

    const isPassCorrect=bcrypt.compareSync(password,existingUser.password);
      

    if(!existingUser)
    {
        return res.status(404).json({message:"User doesn't exist"});

    }
    if(!isPassCorrect)
    {
        return res.status(400).json({message:"Incorrect Passowrd"});

    }

    return res.status(200).json({message:"Login Successfull"});

}



