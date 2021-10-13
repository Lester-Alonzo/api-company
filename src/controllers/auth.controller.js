import User from "../models/User";
import jwt from "jsonwebtoken";
import config from "../config";
import Role from "../models/Role";

export const singUp = async (req, res) => {
  const { username, email, password, roles } = req.body;
  const newUser = new User({
    username,
    email,
    password: await User.encryptPassword(password),
  });

  if (roles) {
    const foundRoles = await Role.find({ name: { $in: roles } });
    newUser.roles = foundRoles.map((role) => role._id);
  } else {
    const role = await Role.findOne({ name: "user" });
    newUser.roles = [role.id];
  }

  const saveUser = await newUser.save();
  console.log(saveUser);
  const token = jwt.sign({ id: saveUser._id }, config.SECRET, {
    expiresIn: 86400, //24h
  });
  res.status(200).json({ token });
};
export const singIn = async (req, res) => {
  const userFoudn = await User.findOne({ email: req.body.email }).populate(
    "roles"
  );
  if (!userFoudn) return res.status(400).json("User not found");
  const mamtchPasword = await User.comparePassword(
    req.body.password,
    userFoudn.password
  );

  if (!mamtchPasword)
    return res.status(401).json({ token: "null", message: "invalid password" });

  const token = jwt.sign({ id: userFoudn._id }, config.SECRET, {
    expiresIn: 86400,
  });

  res.json({ token });
};
