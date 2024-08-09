import { UserModel } from "../models/user_model.js";
import bcrypt from "bcrypt";
import crypto from "crypto";
import { mailTransport } from "../config/mail.js";



//Reseting a password
const generateOTP = () => {
    const otp = Math.floor(100000 + Math.random() * 900000);
    const otpString = otp.toString();
    const hashedOtp = crypto.createHash("sha256").update(otpString).digest("hex");
    return { otpString, hashedOtp };
  };
  
  export const forgotPassword = async (req, res, next) => {
    const { email } = req.body;
  
    try {
      const user = await UserModel.findOne({ email });
      if (!user) {
        return res.status(404).json("No user found with the given email");
      }
  
      const { otpString, hashedOtp } = generateOTP();
      const expirationTime = Date.now() + 1800000; // Token expires in 30 mins
      user.resetToken = hashedOtp;
      user.resetTokenExpiresAt = expirationTime;
      await user.save();
  
      // Format expiration time to a human-readable format
    //   const expirationDate = new Date(expirationTime);
    //   const formattedExpirationTime = expirationDate.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
      
      // Send OTP via email
      mailTransport.sendMail({
        from: "Health Care Support <fromMomo.com>", // Your email address
        to: user.email,
        subject: "Password Reset",
        text: `Dear ${user.firstName} ${user.lastName},
Please use the following OTP to complete the process of resetting your password:\n
resetToken: ${otpString}
This OTP will expire in the next 30 minutes
If you did not request this, please ignore this email and your password will remain unchanged.
    Thank you!
   Best regards,
    Health Care Support Team`,
      }, (err, info) => {
        if (err) {
          return res.status(500).json({ message: "Failed to send email. Please try again later." });
        } else {
          res.status(200).json("A password recovery instruction has been sent to your email.");
        }
      });
  
    } catch (error) {
      next(error);
    }
  };
  
  
  export const verifyCode = async (req, res, next) => {
    try {
      const { email, newOtp } = req.body;
  
      // Validate email format
      const user = await UserModel.findOne({ email });
      if (!user) {
        return res.status(404).json({ message: "User not found" });
      }
  
      const otpHash = newOtp.toString();
  
      const hashedOtp = crypto.createHash("sha256").update(otpHash).digest("hex");
  
      if (user.resetToken !== hashedOtp) {
        return res.status(400).json({ message: "Code is not valid" });
      }
  
      if (Date.now() > user.resetPasswordExpiresAt) {
        return res.status(400).json({ message: "Invalid or expired code" });
      }
  
      return res.status(200).json({ message: "Code is valid" });
  
    } catch (error) {
      next(error);
    }
  };
  
  export const resetPassword = async (req, res, next) => {
    const { email, newOtp, password } = req.body;
  
    const otpHash = newOtp.toString();
  
    const hashedOtp = crypto.createHash("sha256").update(otpHash).digest("hex");
  
    try {
      const user = await UserModel.findOne({
        email,
        resetToken: hashedOtp,
        resetTokenExpiresAt: { $gt: Date.now() },
      });
  
      if (!user) {
        return res
          .status(400)
          .json(
            "Invalid or expired verification code. Please restart the password recovery process."
          );
      }
  
      // Validate the new password
      const { error } = passwordSchema.validate({ password });
      if (error) {
        return res.status(400).json(error.details[0].message);
      }
  
      // Ensure the new password is different from the previous password
      const isSamePassword = await bcrypt.compare(password, user.password);
      if (isSamePassword) {
        return res
          .status(400)
          .json("New password must be different from the old password.");
      }
  
      // Resetting the password
      const hashedPassword = bcrypt.hashSync(password, 12);
      user.password = hashedPassword;
  
      user.resetToken = undefined;
      user.resetTokenExpiresAt = undefined;
  
      await user.save();
  
      return res
        .status(200)
        .json(
          "Your password has been successfully reset. You can now log in with your new password."
        );
    } catch (error) {
      next(error);
    }
  };
  