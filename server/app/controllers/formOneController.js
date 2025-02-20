const FormOne = require("../models/form1Model");
const PDFDocument = require("pdfkit");
const fs = require("fs");
const path = require("path");

// Create Form 1 Entry
exports.createFormOne = async (req, res) => {
  try {
    const data = req.body;

    const doc = new PDFDocument({ margin: 50 });

    // Save the PDF file
    const pdfPath = path.join(__dirname, "Form1_Application.pdf");
    const writeStream = fs.createWriteStream(pdfPath);
    doc.pipe(writeStream);

    // Header
    doc.fontSize(16).text("FORM 1", { align: "center", underline: true });
    doc.moveDown();
    doc
      .fontSize(14)
      .text("APPLICATION CUM QUESTIONNAIRE TO BE SUBMITTED BY PRACTICE UNIT", {
        align: "center",
      });
    doc.moveDown();
    doc
      .fontSize(12)
      .text("[As per Clause 6(1) & 6 (2) of the Peer Review Guidelines 2022]", {
        align: "center",
      });
    doc.moveDown(2);

    // Address
    doc.text("The Secretary, Peer Review Board,", { align: "left" });
    doc.text("The Institute of Chartered Accountants of India,", {
      align: "left",
    });
    doc.text("ICAI Bhawan,", { align: "left" });
    doc.text("Post Box No. 7100,", { align: "left" });
    doc.text("Indraprastha Marg, New Delhi – 110002", { align: "left" });
    doc.moveDown(2);

    // Application Body
    doc.fontSize(12).text("APPLICATION", { align: "center", underline: true });
    doc.moveDown();

    doc.text("Dear Sir,", { align: "left" });
    doc.moveDown();

    doc.text(
      `1. Our Firm ${data.firmName} (Name of practice unit as per ICAI Records); FRN/ M. No. ${data.frn} (Firm Registration Number/ Mem. No. as per ICAI records) would like to apply for Peer Review for the period from ${data.reviewStartDate} to ${data.reviewEndDate} (three preceding financial years from the date of application).`
    );
    doc.moveDown();
    doc.text("We have gone through the Peer Review Guidelines 2022 hosted at:");
    doc
      .fillColor("blue")
      .text(
        "https://resource.cdn.icai.org/72010prb57960-peer-review-guidelines2022.pdf",
        {
          link: "https://resource.cdn.icai.org/72010prb57960-peer-review-guidelines2022.pdf",
        }
      );
    doc.fillColor("black");
    doc.text("and undertake to abide by the same.");
    doc.moveDown();

    // Reason for Peer Review
    doc.text(
      "2. I/We hereby declare that my/our firm is applying for Peer Review (Tick the applicable clause):",
      { bold: true }
    );
    if (data.mandatoryICAI) doc.text("- Mandatory by ICAI");
    if (data.mandatoryOther) doc.text("- Any other Regulator");
    if (data.voluntary) doc.text("- Voluntarily");
    if (data.specialCase) doc.text("- Special Case Review");
    if (data.newUnit) doc.text("- New Unit");
    if (data.boardDecision) doc.text("- As per Board Decision");
    doc.moveDown();

    // Assurance Services
    doc.text(
      "3. I/We hereby declare that my/our firm has signed reports pertaining to the following assurance services during the period under review:"
    );
    doc.moveDown();

    // Create a Table-like Structure
    doc.text("S. No.   | Type of Assurance Service Rendered", {
      underline: true,
    });
    doc.text(
      "1. Central Statutory Audit - " + (data.centralStatutoryAudit || "N/A")
    );
    doc.text("2. Statutory Audit - " + (data.statutoryAudit || "N/A"));
    doc.text("3. Internal Audit - " + (data.internalAudit || "N/A"));
    doc.text("4. Tax Audit - " + (data.taxAudit || "N/A"));
    doc.text("5. Concurrent Audit - " + (data.concurrentAudit || "N/A"));
    doc.text("6. Certification Work - " + (data.certificationWork || "N/A"));
    doc.text(
      "7. Any other, please specify - " + (data.otherAssurance || "N/A")
    );
    doc.moveDown();

    // Statutory Audit of Listed Enterprises
    doc.text(
      "4. I/We hereby declare that my/our firm has " +
        (data.conductedAudit ? "conducted" : "not conducted") +
        " Statutory Audit of enterprises Listed in India or abroad as defined under SEBI LODR, 2015 during the Review Period."
    );
    doc.moveDown();

    // Reviewer Appointment
    doc.text("5. Option for appointment of Reviewer:");
    if (data.sameCity) doc.text("- Same City");
    if (data.outsideCity) doc.text("- From Outside City");
    if (data.eitherOption) doc.text("- Either option");
    doc.text("Preferred City: " + (data.preferredCity || "N/A"));
    doc.moveDown();

    // Email & Address
    doc.text(
      "6. Mail Id for communication with the Practice Unit: " + data.email
    );
    doc.text("7. Address for sending the Peer Review Certificate: ");
    doc.text(data.address, { indent: 20 });
    doc.moveDown(2);

    doc.text("Signature of Practice Unit", { align: "right" });
    doc.moveDown(3);

    // Finalize PDF
    doc.end();

    writeStream.on("finish", () => {
      res.download(pdfPath, "Form1_Application.pdf", (err) => {
        if (err) {
          console.error("Error sending PDF:", err);
          res
            .status(500)
            .json({ success: false, message: "Error generating PDF" });
        }
        fs.unlinkSync(pdfPath); // Delete the PDF after sending
      });
    });
  } catch (error) {
    console.error("Error:", error);
    res.status(500).json({ success: false, message: "An error occurred" });
  }
};

// Create Form 1 Entry
exports.createFormOne = async (req, res) => {
  try {
    const data = req.body;

    writeStream.on("finish", () => {
      res.download(pdfPath, "Form1_Application.pdf", (err) => {
        if (err) {
          console.error("Error sending PDF:", err);
          res
            .status(500)
            .json({ success: false, message: "Error generating PDF" });
        }
        fs.unlinkSync(pdfPath); // Delete the PDF after sending
      });
    });
  } catch (error) {
    console.error("Error:", error);
    res.status(500).json({ success: false, message: "An error occurred" });
  }
};

// Get All Form One Entries
exports.getAllForms = async (req, res) => {
  try {
    const forms = await FormOne.findAll();
    res.status(200).json(forms);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Get Form One by ID
exports.getFormOneById = async (req, res) => {
  try {
    const formOne = await FormOne.findByPk(req.params.id);
    if (!formOne)
      return res.status(404).json({ message: "Form One not found" });
    res.status(200).json(formOne);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Update Form One by ID
exports.updateFormOne = async (req, res) => {
  try {
    const formOne = await FormOne.findByPk(req.params.id);
    if (!formOne)
      return res.status(404).json({ message: "Form One not found" });

    await formOne.update(req.body);
    res
      .status(200)
      .json({ message: "Form One updated successfully", data: formOne });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Delete Form One by ID
exports.deleteFormOne = async (req, res) => {
  try {
    const formOne = await FormOne.findByPk(req.params.id);
    if (!formOne)
      return res.status(404).json({ message: "Form One not found" });

    await formOne.destroy();
    res.status(200).json({ message: "Form One deleted successfully" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Generate PDF for Form One
exports.generateFormOnePDF = async (req, res) => {
  try {
    const formOne = await FormOne.findByPk(req.params.id);
    if (!formOne)
      return res.status(404).json({ message: "Form One not found" });

    const doc = new PDFDocument();
    const filePath = path.join(__dirname, `../pdfs/formOne_${formOne.id}.pdf`);

    // Pipe the PDF to a file
    doc.pipe(fs.createWriteStream(filePath));

    // Add content to the PDF
    doc.fontSize(18).text("Form One Details", { align: "center" });
    doc.moveDown();
    doc.fontSize(12).text(`Firm Name: ${formOne.firmName}`);
    doc.text(`FRN/Member No: ${formOne.frnOrMemberNo}`);
    doc.text(
      `Review Period: ${formOne.reviewPeriodFrom} to ${formOne.reviewPeriodTo}`
    );
    doc.text(`Mandatory Review By: ${formOne.mandatoryReviewBy}`);
    doc.text(`Other Regulator: ${formOne.otherRegulator}`);
    doc.text(`Voluntarily: ${formOne.voluntarily ? "Yes" : "No"}`);
    doc.text(
      `Special Case Review: ${formOne.specialCaseReview ? "Yes" : "No"}`
    );
    doc.text(`New Unit: ${formOne.newUnit ? "Yes" : "No"}`);
    doc.text(`Board Decision: ${formOne.boardDecision ? "Yes" : "No"}`);
    doc.text(
      `Signed Reports Details: ${formOne.signedReportsDetails || "N/A"}`
    );

    doc.end();

    res.download(filePath, `FormOne_${formOne.id}.pdf`);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
