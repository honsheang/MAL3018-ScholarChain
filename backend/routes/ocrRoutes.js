// filepath: d:\ScholarChain\backend\routes\ocrRoutes.js
const express = require('express');
const multer = require('multer');
const Tesseract = require('tesseract.js');
const sharp = require('sharp');
const router = express.Router();

const upload = multer({ dest: 'uploads/' });

router.post('/process', upload.single('image'), async (req, res) => {
  try {
    const imagePath = req.file.path;

    // Optional: Resize or process the image using sharp
    const processedImagePath = `processed_${req.file.filename}.png`;
    await sharp(imagePath)
      .resize(800, 800, { fit: 'inside' })
      .toFile(processedImagePath);

    // Perform OCR using Tesseract
    const { data: { text } } = await Tesseract.recognize(processedImagePath, 'eng');

    res.json({ text });
  } catch (error) {
    console.error('Error processing image:', error);
    res.status(500).json({ message: 'Error processing image' });
  }
});

module.exports = router;