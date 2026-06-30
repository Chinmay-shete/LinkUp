exports.renderIndex = (req, res) => {
  res.render("index", { socketServerUrl: process.env.SOCKET_SERVER_URL || "" });
};

exports.renderChat = (req, res) => {
  res.render("chat", { socketServerUrl: process.env.SOCKET_SERVER_URL || "" });
};
