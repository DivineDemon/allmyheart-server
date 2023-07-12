import { getMessaging } from "firebase-admin/messaging";

export const sendNotification = (req, res) => {
  const { title, body } = req.body;
  const registrationToken = req.headers.token;

  const message = {
    notification: {
      title,
      body,
    },
    webpush: {
      fcmOptions: {
        link: "/",
      },
    },
    token: registrationToken,
  };

  getMessaging()
    .send(message)
    .then((response) => {
      return res.status(200).json({
        success: true,
        message: "Successfully Sent Notification!",
        response,
      });
    })
    .catch((error) => {
      return res.status(400).json({
        success: false,
        message: "Error Sending Notification!",
        error,
      });
    });
};
