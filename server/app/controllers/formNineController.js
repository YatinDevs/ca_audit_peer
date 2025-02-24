const PDFDocument = require("pdfkit");
const fs = require("fs");
const path = require("path");
const generateFormNinePDF = require("../utils/generateForm9");

exports.createFormNine = async (req, res) => {
  try {
    const data = req.body;

    generateFormNinePDF(data, (err, pdfPath) => {
      if (err) {
        console.error("Error generating PDF:", err);
        return res
          .status(500)
          .json({ success: false, message: "Error generating PDF" });
      }

      res.download(pdfPath, "Form9_PeerReviewReport.pdf", (err) => {
        if (err) {
          console.error("Error sending PDF:", err);
          res
            .status(500)
            .json({ success: false, message: "Error sending PDF" });
        }
        fs.unlinkSync(pdfPath); // Delete the PDF after sending
      });
    });
  } catch (error) {
    console.error("Error:", error);
    res.status(500).json({ success: false, message: "An error occurred" });
  }
};
