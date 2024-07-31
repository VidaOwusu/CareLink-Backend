import { UserModel } from "../models/user_model.js";
import * as bcrypt from 'bcrypt';
import jwt from "jsonwebtoken";
import { registerValidator } from "../validators/user_validator.js";


export const signup = async(req, res, next) =>{ 
    const {error, value} = registerValidator.validate(req.body)
    if (error){
        return res.status(400).send(error.details[0].message)
    }

//Check if user exists already in the database
const email = value.email
console.log('email', email)

const findIfUserExist = await UserModel.findOne({email})
if(findIfUserExist){
    return res.status(401).send('User has already signed up')
}else{
    const hashedPassword = bcrypt.hashSync(value.password, 12)
    value.password = hashedPassword
    console.log('val', value)

   const addUser = await UserModel.create(value)
    return res.status(201).send('User registered successfully')
}

}

export const login = async (req, res, next) => {
  try {
      const {email, phoneNumber, password} = req.body
  //Find a user using their unique identifier
  const user = await UserModel.findOne({email})
     
  if (!user){
      res.status(401).json('No user found')
  }else{
  //Verify their password
  const correctPassword = bcrypt.compareSync(password, user.password)
  if(!correctPassword){
      res.status(401).json('Invalid credentials')
  }else{
  //Generate a token
  const token = jwt.sign(
    {id: user.id}, 
    process.env.JWT_PRIVATE_KEY,
    {expiresIn: '5h'}
  );
 
 // Return response
  res.status(200).json({
    message: 'Login successful',
    accessToken: token
  })

  }

  }
  } catch (error) {
     next(error) 
  }
 
}

export const sessionLogin = async (req, res, next) => {
  try {
      const {email, phoneNumber, password} = req.body
  //Find a user using their unique identifier
  const user = await UserModel.findOne({email})
     
  if (!user){
      res.status(401).json('No user found')
  }else{
  //Verify their password
  const correctPassword = bcrypt.compareSync(password, user.password)
  if(!correctPassword){
      res.status(401).json('Invalid credentials')
  }else{
  //Generate a session
  req.session.user = {id: user.id} 
  console.log('user', req.session.user)
 // Return response
  res.status(200).json('Login successful')

  }

  }
  } catch (error) {
     next(error) 
  }
 
}
export const getUser = async (req, res, next) => {
  try {
    const email = req.params.email.toLowerCase();

  const options = { sort: { startDate: -1 } }
  const userDetails = await UserModel.findOne({ email }).select("-password")
    .populate({
      path: "appointment",
      options,
    })
    .populate("profile")
    

  return res.status(200).json({ user: userDetails });
  } catch (error) {
  //  next()
  console.log(error)
  }
};


  
  export const getUsers = async (req, res) => {
   
  
    const email = req.query.email?.toLowerCase()
    const phoneNumber = req.query.phoneNumber
  
    const filter = {};
    if (email) {
      filter.email = email;
    }
    if (phoneNumber) {
      filter.phoneNumber = phoneNumber;
    }
  
    const users = await UserModel.find(filter);
  
    return res.status(200).json({ users });
  };
  
  export const logout = async (req, res, next) => {
    try {
        //Destroy user section
        await req.session.destroy();
        //Return response 
    res.status(200).json('logout successfull')
    } catch (error) {
        next(error)
    }
}