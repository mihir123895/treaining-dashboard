import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import User from "../models/User.js";
import transporter from "../config/nodemailer.js";
import  Module  from "../models/Module.js";

//Register
export const registerUser = async (req, res) => {
  try {
    const { username, email, password, role } = req.body;
    const existingUser = await User.findOne({ email });

    if (existingUser) {
      return res.status(400).json({ message: "Email already exists" });
    }
    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = new User({
      username,
      email,
      password: hashedPassword,
      role,
    });
    await newUser.save();
     // ✅ Generate token after saving user
     const token = jwt.sign(
        { id: newUser._id, role: newUser.role },
        process.env.JWT_SECRET,
        {
          expiresIn: "7d",
        }
      );
  
      // ✅ Set token in cookie
      res.cookie("token", token, {
        httpOnly: true,
        maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
        sameSite: "Lax",
      });
  
      // ✅ Send response
      res.status(201).json({
        message: "User registered and logged in",
        token,
        user: {
          _id: newUser._id,
          username: newUser.username,
          email: newUser.email,
          role: newUser.role,
        },
      });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  };

export const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (!user) return res.status(404).json({ message: "User not found" });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch)
      return res.status(400).json({ message: "Invalid credentials" });

    const token = jwt.sign(
      { id: user._id, role: user.role },
      process.env.JWT_SECRET,
      {
        expiresIn: "7d",
      }
    );

    // 🛠️ Set the cookie first, then send one response
   res.cookie("token", token, {
  httpOnly: true,
  sameSite: "Lax", // ✅ Good for same-origin or localhost
  maxAge: 7 * 24 * 60 * 60 * 1000,
})
      .status(200)
      .json({ token, user, message: "Login successful" }); // <-- Include token here if needed on frontend
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

//send otp
export const forgotPassword = async (req, res) => {
  const { email } = req.body;
  if (!email) {
    return res.status(400).json({ message: "Invalid email" });
  }

  try {
    const user = await User.findOne({ email });

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    const otp = Math.floor(100000 + Math.random() * 900000).toString();

    user.resetOtp = otp;
    user.resetOtpExpires = new Date(Date.now() + 10 * 60 * 1000); // 10 min
    await user.save();

    const mailOptions = {
      from: process.env.SENDER_EMAIL,
      to: user.email,
      subject: "Password Reset OTP",
      html: `
          <div style="font-family: Arial, sans-serif; line-height: 1.5; color: #333;">
            <h2 style="color: #0e76a8;">Password Reset Request</h2>
            <p>Hi there,</p>
            <p>You recently requested to reset your password. Please use the OTP below to proceed:</p>
            <div style="background-color: #f3f3f3; padding: 12px 20px; border-radius: 5px; font-size: 20px; font-weight: bold; display: inline-block; letter-spacing: 2px; margin: 10px 0;">
              ${otp}
            </div>
            <p>This OTP will expire in <strong>10 minutes</strong>. If you did not request this, please ignore this email.</p>
            <p>Thanks,<br/>The Support Team</p>
          </div>
        `,
    };

    await transporter.sendMail(mailOptions);

    return res
      .status(200)
      .json({ success: true, message: "OTP sent to your email" });
  } catch (error) {
    console.error("OTP sending error:", error); // ✅ log it
    return res
      .status(500)
      .json({ success: false, message: "Error sending OTP" });
  }
};
//reset user password

export const resetPassword = async (req, res) => {
  const { email, otp, newPassword } = req.body;

  if (!email || !otp || !newPassword) {
    return res
      .status(400)
      .json({ success: false, message: "Email,otp and Password require" });
  }

  try {
    const user = await User.findOne({ email });

    if (!user) {
      return res
        .status(404)
        .json({ success: false, message: "User not found" });
    }

    if (user.resetOtp === "" || user.resetOtp !== otp) {
      return res.status(400).json({ success: false, message: "Invalid OTP" });
    }

    const hashedPassword = await bcrypt.hash(newPassword, 10);

    user.password = hashedPassword;
    user.resetOtp = ""; // Clear the OTP after successful password reset
    user.resetOtpExpires = 0; // Clear the expiration time

    await user.save();

    return res
      .status(200)
      .json({ success: true, message: "Password reset successfully" });
  } catch (error) {
    console.error("Password reset error:", error);
    return res.status(500).json({ success: false, message: "Error resetting password", error: error.message });
  }
};

export const updateProfile = async (req, res) => {
  try {
    const { id } = req.user;
    const { username, photo, gender, dob, phone, role } = req.body;

    const user = await User.findById(id);
    if (!user) return res.status(404).json({ message: "User not found" });
    if (username) user.username = username;
    if (photo) user.photo = photo;
    if (gender) user.gender = gender;
    if (dob) user.dob = dob;
    if (phone) user.phone = phone;
    if (role && req.user.role === "instructor" && ["instructor", "trainee"].includes(role)) {
  user.role = role;
}


    await user.save();

    res.status(200).json({ message: "Profile updated successfully" });
  } catch (error) {
    console.error("Update error:", error.message);
    res
      .status(500)
      .json({ error: "Something went wrong while updating profile." });
  }
};

// Get All Users (for instructor)
export const getAllUsers = async (req, res) => {
  try {
    const users = await User.find({}, "_id username email role");
    res.status(200).json(users);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// ✅ Get trainee's progress summary
export const getMyProgressStats = async (req, res) => {
    try {
      const totalModules = await Module.countDocuments({ assignedTo: req.user.id });
      const completedModules = await Module.countDocuments({
        assignedTo: req.user.id,
        isCompleted: true,
      });
  
      const pendingModules = totalModules - completedModules;
      const percentage = totalModules === 0 ? 0 : Math.round((completedModules / totalModules) * 100);
  
      res.status(200).json({
        total: totalModules,
        completed: completedModules,
        pending: pendingModules,
        progressPercent: percentage,
      });
    } catch (error) {
      res.status(500).json({ message: "Error fetching progress", error: error.message });
    }
  };

  // ✅ Get current user (used by frontend on load)
export const getUser = async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select("-password");
    if (!user) return res.status(404).json({ message: "User not found" });

    res.status(200).json(user);
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch user", error: error.message });
  }
};


export const getAllTrainees = async (req, res) => {
  try {
    console.log("User info:", req.user.role); // ✅ Place here

    const trainees = await User.find({ role: "trainee" }).select("_id username email");
    res.status(200).json(trainees);
  } catch (error) {
    res.status(500).json({ message: "Error fetching trainees", error: error.message });
  }
};
