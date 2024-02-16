import mongoose from "mongoose"

const jobSchema = new mongoose.Schema({
  company: String,
  subject: String,
  location: String,
  experience: String,
  deadline: Date,
  created_at: {
    type: Date,
    default: Date.now,
  },
});

// Create the Job model
const Job = mongoose.model("Job", jobSchema);
export default Job