const Sib = require("sib-api-v3-sdk");
require("dotenv").config();

exports.forgotPassword = async (req, res) => {
  try {
    const email = req.body.email;

    const client = Sib.ApiClient.instance;

    const apiKey = client.authentications["api-key"];
    apiKey.apiKey = process.env.API_KEY;

    const tranEmailApi = new Sib.TransactionalEmailsApi();

    const sender = {
      email: "chaithanyakumar167@gmail.com",
      name: "expense app",
    };

    const receivers = [{ email: email }];
    tranEmailApi
      .sendTransacEmail({
        sender,
        to: receivers,
        subject: "forgot password",
        textContent: "password",
      })
      .then(console.log)
      .catch(console.log);
    res.status(200).json({ message: "success" });
  } catch (error) {
    res.status(404).json({ error: error });
  }
};
