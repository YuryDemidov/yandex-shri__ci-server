module.exports = class ValidationError extends Error {
  constructor(status, message) {
    super(message);

    this.status = status;
  }

  sendResponse(res) {
    return res.status(this.status).json({ message: this.message });
  }
};
