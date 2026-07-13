exports.renderIndex = (req, res) => {
  res.render("index", {
    socketServerUrl: process.env.SOCKET_SERVER_URL || "",
    turnUrl: process.env.TURN_URL || "turn:openrelay.metered.ca:80",
    turnUsername: process.env.TURN_USERNAME || "",
    turnCredential: process.env.TURN_CREDENTIAL || ""
  });
};

exports.renderChat = (req, res) => {
  res.render("chat", {
    socketServerUrl: process.env.SOCKET_SERVER_URL || "",
    turnUrl: process.env.TURN_URL || "turn:openrelay.metered.ca:80",
    turnUsername: process.env.TURN_USERNAME || "",
    turnCredential: process.env.TURN_CREDENTIAL || ""
  });
};
