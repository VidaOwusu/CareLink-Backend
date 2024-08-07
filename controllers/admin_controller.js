import { AppointmentModel } from '../models/appointment_model.js';
import bcrypt from "bcrypt";
import { mailTransport } from '../config/mail.js';
import { UserModel } from '../models/user_model.js';
import { createUserValidator, updateUserValidator } from '../validators/user_validator.js';


// Controller function to create an initial admin user
export const setupAdmin = async (req, res) => {
  try {
    const adminExists = await UserModel.findOne({ role: 'admin' });
    if (adminExists) {
      return res.status(403).json({ error: 'Admin already exists' });
    }

    const { firstName, lastName, username, email, password } = req.body
    const hashedPassword = bcrypt.hashSync(password, 12);

    const adminUser = await UserModel.create({
      firstName,
      lastName,
      username,
      email,
      password: hashedPassword,
      role: 'admin',
    });

    res.status(201).json({ message: 'Admin user created successfully', adminUser });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};





export const createUser = async (req, res, next) => {
  try {
    // Validate request
    const { value, error } = createUserValidator.validate(req.body);
    if (error) {
      return res.status(422).json(error.details[0].message);
    }
    const { firstName, lastName, username, email, password } = req.body

    // Encrypt user password
    const hashedPassword = bcrypt.hashSync(value.password, 10);

    // Create user with role
    const user = await UserModel.create({
      ...value,
      password: hashedPassword,
      role: value.role || 'user' // Default to 'user' if role is not provided
    });

    // Send email to user
    await mailTransport.sendMail({
      from: "Health Care Support <fromMomo.com>",
      to: value.email,
      subject: "User Account Created!",
      text: `Dear user,\n\nA user account has been created for you with the following credentials.\n\nfirstName: ${value.firstName}\n\nlastName: ${value.lastName}\n\nEmail: ${value.email}\n\npassword: ${value.password}\n\nRole: ${value.role || 'user'}\n\nThank you!`,
    });

    // Return response
    res.status(201).json('User Created with an admin role successfully');
  } catch (error) {
    next(error);
  }
};


export const updateUser = async (req, res, next) => {
  try {
      // Validate request
      const { value, error } = updateUserValidator.validate(req.body);
      if (error) {
          return res.status(422).json(error);
      }
      // Update user
      await UserModel.findByIdAndUpdate(
          req.params.id,
          value,
          { new: true }
      );
      // Return response
      res.status(200).json('User Updated');
  } catch (error) {
      next(error);
  }
}

export const deleteUser = async (req, res, next) => {
  try {
      // Get user id from session or request
      const id = req.session?.user?.id || req?.user?.id;
      // Ensure user is not deleting themselves
      if (id === req.params.id) {
          return res.status(409).json('Cannot Delete Self');
      }
      // Delete user
      await UserModel.findByIdAndDelete(req.params.id);
      // Return response
      res.status(200).json('User Deleted');
  } catch (error) {
      next(error);
  }
}

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


export const getDoctors = async (req, res, next) => {
  try {
    const doctors = [
      "Dr. John Smith",
      "Dr. Emily Johnson",
      "Dr. Sarah Davis",
      "Dr. David Wilson",
      "Dr. James Taylor",
      "Dr. Jessica Anderson",
      "Dr. Robert Thomas",
      "Dr. Elizabeth Lee",
      "Dr. William Harris",
      "Dr. Karen Clark",
    ];
    res.status(200).json(doctors);
  } catch (error) {
    next(error);
  }
};

export const getAppointments = async (req, res, next) => {
  try {
    const appointments = await AppointmentModel.find()
      .populate({
        path: 'user',
        select: 'firstName email phoneNumber' // Exclude the password field
      });
    res.status(200).json(appointments);
  } catch (error) {
    next(error);
  }
};
