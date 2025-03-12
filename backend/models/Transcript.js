const mongoose = require("mongoose");

const transcriptSchema = new mongoose.Schema({
  universityId: { type: String, required: true },
  studentID: { type: String, required: true },
  studentName: { type: String, required: true },
  transcriptFile: { type: String, required: true },
  transactionID: { type: String, required: true },
  issueDate: { type: Date, default: Date.now },
});

module.exports = mongoose.model("Transcript", transcriptSchema);