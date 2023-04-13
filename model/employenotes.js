const { Schema, model } = require("mongoose");

const employenotesSchema = new Schema({
  date: {
    type: String,
    required: true,
  },
  notes: [
    {
      pdf: {
        type: String,
        required: true,
      },
    },
  ],
});

const Notes = model("employeenote", employenotesSchema);
module.exports = Notes;
