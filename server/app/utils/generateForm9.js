const fs = require("fs");
const path = require("path");
const PDFDocument = require("pdfkit");

const generateFormNinePDF = (data, callback) => {
  try {
    const doc = new PDFDocument({
      margins: { top: 70, bottom: 70, left: 100, right: 100 },
    });

    const pdfPath = path.join(
      __dirname,
      "../templates/Form9_PeerReviewReport.pdf"
    );
    const writeStream = fs.createWriteStream(pdfPath);
    doc.pipe(writeStream);

    const contentWidth =
      doc.page.width - doc.page.margins.left - doc.page.margins.right;

    // FORM 9 HEADER
    doc
      .fontSize(14)
      .font("Helvetica-Bold")
      .text("FORM 9", { align: "center", width: contentWidth });
    doc.moveDown(1);

    doc
      .fontSize(12)
      .text("Letter for submission of report by the Peer Reviewer to the", {
        align: "center",
        width: contentWidth,
      })
      .text("Peer Review Board", { align: "center", width: contentWidth })
      .text("[As per Clause 9(1) of the Peer Review Guidelines 2022]", {
        align: "center",
        width: contentWidth,
      });

    doc.moveDown(5);

    // DATE & ADDRESS
    doc
      .fontSize(12)
      .font("Helvetica")
      .text("To,", { align: "left", continued: true, width: contentWidth })
      .text(`Dated: ${data.date}`, { align: "right", width: contentWidth });

    doc.moveDown();
    doc.text("The Secretary,", { align: "left", width: contentWidth });
    doc.text("Peer Review Board", { align: "left", width: contentWidth });
    doc.moveDown(2);

    // SUBJECT LINE
    doc
      .fontSize(12)
      .font("Helvetica-Bold")
      .text(`Sub: Peer Review Report of ${data.firmName}, FRN ${data.frn}`, {
        align: "left",
        width: contentWidth,
      });

    doc.moveDown(3);

    // BODY CONTENT
    doc
      .font("Helvetica")
      .text("Dear Sir,", { align: "left", width: contentWidth });
    doc.moveDown(2);

    doc.text(
      `I have carried out the Peer Review of ${data.firmName}, FRN ${data.frn} in terms of Peer Review Guidelines issued by the Council of the Institute of Chartered Accountants of India.`,
      { align: "justify", width: contentWidth }
    );

    doc.moveDown(2);

    doc.text(
      "The Peer Review process has been completed and I am submitting the Peer Review Report along with the following:",
      { align: "justify", width: contentWidth }
    );

    doc.moveDown();
    // LIST OF DOCUMENTS
    const listItems = [
      "Annexure I",
      "Annexure II",
      "Annexure III (AQMM, if applicable)",
      "List of Samples selected along with basis of selection and sample confirmation (as per Board’s criteria)",
      "Preliminary Report along with Practice Unit submission and my verification on the same",
      "Questionnaire copy as received from the Practice Unit.",
    ];

    const leftMargin = doc.page.margins.left + 20; // Move the list a little to the right
    const listNumberWidth = 20; // Space reserved for numbers
    const textStartX = leftMargin + listNumberWidth; // Start text after number

    listItems.forEach((item, index) => {
      // Render number first
      doc.text(`${index + 1}.`, leftMargin, doc.y, { continued: true });

      // Render text with proper wrapping
      doc.text(item, textStartX, doc.y, {
        width: contentWidth - (textStartX - doc.page.margins.left),
        align: "left",
      });

      doc.moveDown(0.5);
    });

    doc.moveDown(2);

    doc.text(
      "I also confirm to have received the Peer Review fees from the Practice Unit for the above review conducted by me.",
      { align: "justify", width: contentWidth }
    );

    doc.moveDown(3);

    // SIGNATURE
    doc.text("Regards,", { align: "left", width: contentWidth });
    doc.moveDown();
    doc.text("Signature: ______________________", {
      align: "left",
      width: contentWidth,
    });
    doc.moveDown(0.5);
    doc.text(`Name : ${data.partnerName}`, {
      align: "left",
      width: contentWidth,
    });
    doc.moveDown(0.5);

    doc.text(`Membership No.: ${data.memberShipNo}`, {
      align: "left",
      width: contentWidth,
    });
    doc.moveDown(0.5);
    // ADD A NEW PAGE FOR THE NEXT SECTION
    doc.addPage();

    // HEADER FOR PRACTICE UNIT CONFIRMATION
    doc
      .fontSize(12)
      .font("Helvetica-Bold")
      .text("[To be filled by the Practice Unit]", {
        underline: true,
        align: "center",
        width: contentWidth,
      });

    doc.moveDown();

    // Define font paths
    const fontNormal = path.join(__dirname, "../app/fonts/OldTown-Normal.ttf");
    const fontRegular = path.join(
      __dirname,
      "../app/fonts/OldTown-Regular.ttf"
    );

    // Check if font files exist
    if (fs.existsSync(fontNormal)) {
      doc.font(fontNormal); // Use OldTown-Normal font
    } else {
      console.warn("⚠️ Font file not found. Falling back to Helvetica.");
      doc.font("Helvetica"); // Use default font if missing
    }

    // Add text with checkboxes
    doc.text(
      `${
        data.isMultipleReviewers ? "☐ I / We ✓" : "I ✓ / ☐ We"
      } confirm the receipt of Peer Review report from the Peer Reviewer as mentioned above and confirm that the Reviewer had submitted the Declaration of Confidentiality as prescribed by the Board in Form 2 to us on ${
        data.declarationDate || "____"
      }.`,
      { align: "justify", width: contentWidth }
    );

    doc.moveDown(3);

    // SIGNATURE FOR PRACTICE UNIT
    doc.text("Regards,", { align: "left", width: contentWidth });
    doc.moveDown(3);
    doc.text("Signature: ______________________", {
      align: "left",
      width: contentWidth,
    });
    doc.moveDown(0.5);
    doc.text(`Name of Partner of the Practice Unit: ${data.partnerName}`, {
      align: "left",
      width: contentWidth,
    });
    doc.moveDown(0.5);

    doc.text(`Membership No.: ${data.memberShipNo}`, {
      align: "left",
      width: contentWidth,
    });
    doc.moveDown(0.5);

    doc.end();

    writeStream.on("finish", () => {
      callback(null, pdfPath);
    });
  } catch (error) {
    callback(error, null);
  }
};

module.exports = generateFormNinePDF;
