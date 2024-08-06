import { ProfileModel } from "../models/profile_model.js";
import { UserModel } from "../models/user_model.js";
import { profileValidator } from "../validators/profile_validator.js";


export const addProfile = async (req, res, next) => {
    try {
      const { error, value } = profileValidator.validate({
        ...req.body,
        identificationDocument: req.file.filename,
      });
      if (error) {
        return res.status(400).send(error.details[0].message);
      }
      //Get user id from session or request
  
      const id = req.session?.user?.id || req?.user?.id;
      const user = await UserModel.findById(id);
      if (!user) {
        return res.status(404).send("User not found");
      }
  
      const newProfile = await ProfileModel.create({
        ...value,
        user: id,
      });
  
      user.profile = newProfile.id;
  
      await user.save();
  
      res.status(201).json({message:"User Profile added successfully", newProfile});
    } catch (error) {
      next(error);
    }
  };

  export const updateProfile = async (req, res, next) => {
    try {
      const { error, value } = profileValidator.validate({
        ...req.body,
        identificationDocument: req.file.filename,
      });
      if (error) {
        return res.status(400).send(error.details[0].message);
      }
  
      const id = req.session?.user?.id || req?.user?.id;
      const user = await UserModel.findById(id);
      if (!user) {
        return res.status(404).send("User not found");
      }
  
      const editProfile = await ProfileModel.findByIdAndUpdate(
        req.params.id,
        value,
        { new: true }
      );
      if (!editProfile) {
        return res.status(404).json({message: "Profile cannot be updated" });
      }
  
      res.status(201).json({message:"User profile updated successfully", editProfile} );
    } catch (error) {
      next(error);
    }
  };
  