const fs = require("fs");
const path = require("path");
const PDFDocument = require("pdfkit");

const generateFormSixPDF = (data, callback) => {
  try {
    const doc = new PDFDocument({
      margins: { top: 70, bottom: 70, left: 100, right: 100 },
    });

    const pdfPath = path.join(
      __dirname,
      "../templates/Form6_AdditionalInfoRequest.pdf"
    );
    const writeStream = fs.createWriteStream(pdfPath);
    doc.pipe(writeStream);

    const contentWidth =
      doc.page.width - doc.page.margins.left - doc.page.margins.right;

    // FORM HEADER
    doc
      .fontSize(14)
      .font("Helvetica-Bold")
      .text("FORM 6", { align: "center", width: contentWidth });
    doc.moveDown(1);

    doc
      .fontSize(12)
      .text("Format for seeking additional information from the", {
        align: "center",
        width: contentWidth,
      })
      .text("Practice Unit by the Reviewer", { align: "center" })
      .text("[As per Clause 7(3) of the Peer Review Guidelines 2022]", {
        align: "center",
        width: contentWidth,
      });

    doc.moveDown(5);

    // ADDRESSING THE PRACTICE UNIT
    doc.fontSize(12).font("Helvetica").text("To,", { align: "left" });
    doc.moveDown();
    doc.text(`Name of Partner of PU: ${data.partnerName}`, {
      align: "left",
      width: contentWidth,
    });

    doc.moveDown(2);

    // INTRODUCTORY STATEMENT
    doc.text(
      `This is regarding the Peer Review of the Firm ${data.firmName} for the period ${data.reviewPeriod}.`,
      { align: "justify", width: contentWidth }
    );

    doc.moveDown(2);

    doc.text(
      "I would like to inform you that the responses submitted by you to the following clauses of the Questionnaire are incomplete/not clear. Accordingly, you are requested to provide clarifications on the following points:",
      { align: "justify", width: contentWidth }
    );

    doc.moveDown(2);

    // TABLE HEADER
    const tableTop = doc.y;
    const columnWidths = [50, 150, 200, 200];
    const headers = [
      "S. No.",
      "Reference No. of the Questionnaire",
      "Further Information Required",
      "Reason for Asking the Information",
    ];

    doc.font("Helvetica-Bold");
    headers.forEach((header, i) => {
      doc.text(
        header,
        doc.x + (i === 0 ? 0 : columnWidths[i - 1] + 5),
        tableTop,
        {
          width: columnWidths[i],
          align: "left",
        }
      );
    });

    doc.moveDown(1);
    doc.font("Helvetica");

    // TABLE CONTENT
    let rowIndex = 1;
    data.additionalInfoRequests.forEach((item) => {
      doc.text(rowIndex.toString(), doc.x, doc.y, {
        width: columnWidths[0],
        align: "left",
      });
      doc.text(item.referenceNo, doc.x + columnWidths[0] + 5, doc.y, {
        width: columnWidths[1],
        align: "left",
      });
      doc.text(
        item.informationRequired,
        doc.x + columnWidths[0] + columnWidths[1] + 10,
        doc.y,
        { width: columnWidths[2], align: "left" }
      );
      doc.text(
        item.reason,
        doc.x + columnWidths[0] + columnWidths[1] + columnWidths[2] + 15,
        doc.y,
        { width: columnWidths[3], align: "left" }
      );

      doc.moveDown(1);
      rowIndex++;
    });

    doc.moveDown(2);

    // DEADLINE FOR INFORMATION SUBMISSION
    doc.text(
      `On receipt of the above information by ${data.informationDueDate}, I will intimate you the date of my visit to your office.`,
      { align: "justify", width: contentWidth }
    );

    doc.moveDown(3);

    // CLOSING STATEMENT
    doc.text("Thanking you,", { align: "left" });
    doc.moveDown(2);

    // SIGNATURE
    doc.text("Signature: ______________________", {
      align: "left",
      width: contentWidth,
    });
    doc.moveDown(0.5);
    doc.text(`Name: ${data.reviewerName}`, { align: "left" });
    doc.moveDown(0.5);
    doc.text(`Date: ${data.date}`, { align: "left" });

    doc.end();

    writeStream.on("finish", () => {
      callback(null, pdfPath);
    });
  } catch (error) {
    callback(error, null);
  }
};

module.exports = generateFormSixPDF;
