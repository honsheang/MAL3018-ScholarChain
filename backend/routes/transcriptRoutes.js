const express = require("express");
const router = express.Router();
const Transcript = require("../models/Transcript");
const User = require("../models/User");
const authMiddleware = require("../middleware/authMiddleware");

// Save transcript metadata
router.post("/", authMiddleware, async (req, res) => {
	const {
		universityId,
		studentID,
		studentName,
		transcriptFile,
		transactionID,
	} = req.body;

	try {
		// Validate required fields
		if (!universityId || !studentID || !transcriptFile || !transactionID) {
			return res.status(400).json({ message: "All fields are required" });
		}

		// Validate transcriptFile URL
		if (
			!transcriptFile.startsWith("http://") &&
			!transcriptFile.startsWith("https://")
		) {
			return res.status(400).json({ message: "Invalid transcript file URL" });
		}

		// Check if the university exists (using universitySsoId)
		const university = await User.findOne({
			universitySsoId: universityId,
			role: "University",
		});
		if (!university) {
			return res.status(404).json({ message: "University not found" });
		}

        console.log("🏫 University SsoId:", university.universitySsoId);

		// Check if a transcript for this student already exists
		const existingTranscript = await Transcript.findOne({ studentID });
		if (existingTranscript) {
			return res
				.status(400)
				.json({ message: "Transcript for this student already exists" });
		}

		// Create and save the transcript metadata
		const transcript = new Transcript({
			universityId,
			studentID,
			studentName,
			transcriptFile,
			transactionID,
		});

		await transcript.save();
		res.status(201).json(transcript);
	} catch (error) {
		console.error("Error saving transcript:", error);
		res.status(500).json({ message: "Server error" });
	}
});

// Get transcript metadata by student ID
// ✅ Get a specific transcript by student ID
router.get('/:studentID', async (req, res) => {
    try {
      const transcript = await Transcript.findOne({ studentID: req.params.studentID });
      if (!transcript) {
        return res.status(404).json({ message: 'Transcript not found' });
      }
      res.json(transcript);
    } catch (error) {
      console.error("❌ Error fetching transcript:", error);
      res.status(500).json({ message: `Server error: ${error.message}` });
    }
  });
  

// Get transcripts by university ID
router.get("/university/:universityId", async (req, res) => {
	try {
		// Validate that the university exists
		const university = await User.findOne({
			universitySsoId: req.params.universityId,
			role: "University",
		});
		if (!university) {
			return res.status(404).json({ message: "University not found" });
		}

		// Fetch transcripts for this university
		const transcripts = await Transcript.find({
			universityId: req.params.universityId,
		}).select("-__v");

		if (!transcripts.length) {
			return res
				.status(404)
				.json({ message: "No transcripts found for this university" });
		}

		res.json(transcripts);
	} catch (error) {
		console.error("Error fetching transcripts:", error);
		res.status(500).json({ message: "Server error" });
	}
});

// Fetch all transcripts issued by the logged-in university
router.get("/university", authMiddleware, async (req, res) => {
    try {
      console.log("📩 Received request to fetch transcripts for university:", req.user.userId);
  
      // Find the university based on logged-in user ID
      const university = await User.findById(req.user.userId);
      if (!university) {
        console.error("❌ University not found for user ID:", req.user.userId);
        return res.status(404).json({ message: "University not found" });
      }
  
      console.log("🏫 University found:", university.universitySsoId);
  
      // Fetch all transcripts issued by this university
      const transcripts = await Transcript.find({ universityId: university.universitySsoId }).select("-__v");
  
      console.log("📜 Transcripts found:", transcripts.length);
  
      if (transcripts.length === 0) {
        return res.status(404).json({ message: "Transcript not found" });
      }
  
      res.status(200).json(transcripts);
    } catch (error) {
      console.error("❌ Error fetching transcripts:", error);
      res.status(500).json({ message: "Server error" });
    }
  });

// ✅ Fetch all transcripts (No university filtering)
// Fetch all transcripts (without filtering by universityId)
router.get("/all", authMiddleware, async (req, res) => {
    try {
      console.log("📩 Received request to fetch all transcripts");
  
      // Fetch all transcripts from the database
      const transcripts = await Transcript.find().select("-__v");
  
      console.log("📜 Total transcripts found:", transcripts.length);
  
      // Return the transcripts
      res.status(200).json(transcripts);
    } catch (error) {
      console.error("❌ Error fetching all transcripts:", error);
      res.status(500).json({ message: "Server error" });
    }
  });

  router.get("/", async (req, res) => {
    try {
        const transcripts = await Transcript.find(); // Fetch all transcripts
        res.status(200).json(transcripts);
    } catch (error) {
        console.error("❌ Error fetching transcripts:", error);
        res.status(500).json({ message: "Server error." });
    }
});

// Fetch transcripts by studentID
router.get("/student/:studentId", authMiddleware, async (req, res) => {
	try {
	  const { studentId } = req.params;
	  console.log("📩 Received request to fetch transcripts for student:", studentId);
  
	  // Fetch all transcripts for this student
	  const transcripts = await Transcript.find({ studentID: studentId }).select("-__v");
  
	  console.log("📜 Transcripts found:", transcripts.length);
  
	  if (transcripts.length === 0) {
		return res.status(404).json({ message: "No transcripts found for this student" });
	  }
  
	  res.status(200).json(transcripts);
	} catch (error) {
	  console.error("❌ Error fetching transcripts:", error);
	  res.status(500).json({ message: "Server error" });
	}
  });

module.exports = router;
