const {
  forgotPasswordService,
  loginService,
  keepLoginService,
  resetPasswordService,
} = require("../services/authService");

const forgotPasswordController = async (req, res) => {
  try {
    const { email } = req.body;
    const result = await forgotPasswordService(email);

    return res.status(200).json({
      message: "Success",
      data: result,
    });
  } catch (err) {
    console.log(err);
    return res.status(500).json({
      message: err?.message,
    });
  }
};

const resetPasswordController = async (req, res) => {
  try {
    const { token } = req.query;
    const { password } = req.body;
    const result = await resetPasswordService(token, password);

    return res.status(200).json({
      message: "Success",
      data: result,
    });
  } catch (err) {
    console.log(err);
    return res.status(500).json({
      message: err?.message,
    });
  }
};

const loginController = async (req, res) => {
  try {
    const { username, password } = req.body;
    const result = await loginService(username, password);

    return res.status(200).json({
      message: "Success",
      data: result,
    });
  } catch (err) {
    console.log(err.message);
    return res.status(500).send("Username atau password salah!");
  }
};

const keepLoginController = async (req, res) => {
  try {
    const { id } = req.user;

    const result = await keepLoginService(id);

    return res.status(200).json({
      message: "Success",
      data: result,
    });
  } catch (err) {
    // return res.status(500).send(err.message);
    console.log("gagal");
  }
};

module.exports = {
  forgotPasswordController,
  resetPasswordController,
  loginController,
  keepLoginController,
};
