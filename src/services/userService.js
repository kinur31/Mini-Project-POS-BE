const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const path = require("path");
const handlebars = require("handlebars");
const fs = require("fs");

const {
  createCashierQuery,
  updateCashierQuery,
  deleteCashierQuery,
  deactiveCashierQuery,
} = require("../queries/userQuery");
const { findUserQuery } = require("../queries/userQuery");
const transporter = require("../utils/nodemailer");

const createCashierService = async (
  fullname,
  address,
  email,
  username,
  password,
  role_id
) => {
  try {
    const check = await findUserQuery({ email, username });

    if (check) throw new Error("Email or username already exist");

    const salt = await bcrypt.genSalt(10);

    const hashPassword = await bcrypt.hash(password, salt);

    let payload = {
      email: email,
    };

    const token = jwt.sign(payload, process.env.JWT_SECRET_KEY, {
      expiresIn: "1hr",
    });

    const res = await createCashierQuery(
      fullname,
      address,
      email,
      username,
      hashPassword,
      role_id
    );

    return res;
  } catch (err) {
    throw err;
  }
};

const updateCashierService = async (id, fullname, address, username) => {
  try {
    const check = await findUserQuery({ id });
    if (!check) throw new Error("Username not found");

    const result = await updateCashierQuery(id, fullname, address, username);

    return result;
  } catch (err) {
    throw err;
  }
};

const deleteCashierService = async (id) => {
  try {
    const check = await findUserQuery({ id });
    if (!check) throw new Error("User not found");

    await deleteCashierQuery(id);
  } catch (err) {
    throw err;
  }
};

const deactiveCashierService = async (id) => {
  try {
    const check = await findUserQuery({ id });
    if (!check) throw new Error("Cashier not found");

    const result = await deactiveCashierQuery(id);

    return result;
  } catch (err) {
    throw err;
  }
};

module.exports = {
  createCashierService,
  updateCashierService,
  deleteCashierService,
  deactiveCashierService,
};