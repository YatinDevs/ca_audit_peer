import path from "path";
import PDFDocument from "pdfkit";
import fs from "fs";

export const generateForm1Page1 = (data, callback) => {
  try {
    const doc = new PDFDocument({
      margins: { top: 70, bottom: 70, left: 100, right: 100 },
    });
    const pdfPath = path.join(__dirname, "../templates/Form1_Page1.pdf");
    const writeStream = fs.createWriteStream(pdfPath);
    doc.pipe(writeStream);

    const contentWidth =
      doc.page.width - doc.page.margins.left - doc.page.margins.right;

    // FORM HEADER
    doc
      .font("Helvetica-Bold")
      .fontSize(14)
      .text("FORM 1", { align: "center", width: contentWidth });
    doc.moveDown(0.5);

    doc.fontSize(12).text("APPLICATION CUM QUESTIONNAIRE TO BE SUBMITTED BY", {
      align: "center",
      width: contentWidth,
    });
    doc.text("PRACTICE UNIT", { align: "center", width: contentWidth });
    doc.moveDown(0.5);

    doc
      .font("Helvetica")
      .text("[As per Clause 6(1) & 6 (2) of the Peer Review Guidelines 2022]", {
        align: "center",
        width: contentWidth,
      });

    doc.moveDown(2);

    // ADDRESS BLOCK
    doc
      .font("Helvetica-Bold")
      .text("The Secretary, Peer Review Board,", { align: "left" });
    doc
      .font("Helvetica")
      .text("The Institute of Chartered Accountants of India,", {
        align: "left",
      });
    doc.text("ICAI Bhawan,", { align: "left" });
    doc.text("Post Box No. 7100,", { align: "left" });
    doc.text("Indraprastha Marg, New Delhi – 110002", { align: "left" });

    doc.moveDown(2);

    // APPLICATION TITLE
    doc.font("Helvetica-Bold").text("APPLICATION", { align: "left" });

    doc.moveDown();

    // GREETING
    doc.font("Helvetica").text("Dear Sir,", { align: "left" });

    doc.moveDown();

    // POINT 1 - Firm Information
    doc.text(
      "1.\tOur Firm " +
        ".......................................................................................... " +
        "(Name of practice unit as per ICAI Records); FRN/ M. No. " +
        ".... .... " +
        "(Firm Registration Number/ Mem. No. as per ICAI records) " +
        "would like to apply for Peer Review for the period from ........ to ........ " +
        "(three preceding financial years from the date of application). " +
        "We have gone through the Peer Review Guidelines 2022 hosted at " +
        "https://resource.cdn.icai.org/72010prb57960-peer-review-guidelines2022.pdf " +
        "and undertake to abide by the same.",
      { align: "justify", width: contentWidth }
    );

    doc.moveDown(2);

    // POINT 2 - Declaration for Peer Review
    doc.text(
      "2.\tI/We hereby declare that my/our firm is applying for Peer Review (Tick the applicable clause):",
      { align: "left" }
    );

    doc.moveDown(0.5);

    // LIST ITEMS
    const options = [
      "As it is Mandatory by: ICAI   Any other Regulator (please specify)",
      "Voluntarily",
      "As a special case Review initiated by the Board",
      "New Unit",
      "As per decision of the Board",
    ];

    options.forEach((option, index) => {
      doc.text(`(${index + 1})\t ${option}`, { align: "left", indent: 20 });
      doc.moveDown(0.5);
    });

    doc.moveDown(2);

    // POINT 3 - Declaration for Reports Signed
    doc.text(
      "3.\tI/We hereby declare that my/our firm has signed reports pertaining to",
      { align: "left" }
    );

    doc.moveDown(3);

    doc.end();

    writeStream.on("finish", () => {
      callback(null, pdfPath);
    });
  } catch (error) {
    callback(error, null);
  }
};

export const generateForm1Page2 = (data, callback) => {
  try {
    const doc = new PDFDocument({
      margins: { top: 70, bottom: 70, left: 100, right: 100 },
    });
    const pdfPath = path.join(__dirname, "../templates/Form1_Page2.pdf");
    const writeStream = fs.createWriteStream(pdfPath);
    doc.pipe(writeStream);

    const contentWidth =
      doc.page.width - doc.page.margins.left - doc.page.margins.right;

    doc.moveDown();

    // HEADING
    doc
      .font("Helvetica")
      .fontSize(12)
      .text(
        "The following assurance services were rendered during the period under review:",
        { align: "left", width: contentWidth }
      );

    doc.moveDown(1);

    // TABLE HEADER
    const tableTop = doc.y;
    const columnWidths = [50, 220, 220]; // Column widths for S. No, Type of Assurance, Major Type of Client

    doc.font("Helvetica-Bold");

    doc.text("S. No.", doc.x, tableTop, {
      width: columnWidths[0],
      align: "center",
    });
    doc.text(
      "Type of Assurance Service Rendered",
      doc.x + columnWidths[0],
      tableTop,
      {
        width: columnWidths[1],
        align: "center",
      }
    );
    doc.text(
      "Major Type of Client",
      doc.x + columnWidths[0] + columnWidths[1],
      tableTop,
      {
        width: columnWidths[2],
        align: "center",
      }
    );

    doc.moveDown(0.5);
    doc.font("Helvetica");

    // TABLE CONTENT
    const services = [
      "Central Statutory Audit",
      "Statutory Audit",
      "Internal Audit",
      "Tax Audit",
      "Concurrent Audit",
      "Certification work",
      "Any other, please specify",
    ];

    services.forEach((service, index) => {
      doc.text(`${index + 1}`, doc.x, doc.y, {
        width: columnWidths[0],
        align: "center",
      });
      doc.text(service, doc.x + columnWidths[0], doc.y, {
        width: columnWidths[1],
      });
      doc.text(
        "_________________",
        doc.x + columnWidths[0] + columnWidths[1],
        doc.y,
        {
          width: columnWidths[2],
          align: "center",
        }
      );
      doc.moveDown(0.5);
    });

    doc.moveDown(2);

    // STATUTORY AUDIT DECLARATION
    doc.text(
      "4. I / We hereby declare that my/ our firm has conducted/ has not conducted Statutory Audit of enterprises Listed in India or abroad as defined under SEBI LODR, 2015 during the Review Period.",
      { align: "justify", width: contentWidth }
    );

    doc.moveDown(2);

    // REVIEWER OPTION
    doc.text(
      "5. Option for appointment of Reviewer: (Tick appropriate option)",
      { align: "left" }
    );

    const reviewerOptions = [
      "Same City",
      "From outside City",
      "Either option (i) or (ii)",
      "Preferred City in case of option (ii)   ______________________",
    ];

    reviewerOptions.forEach((option, index) => {
      doc.text(`(${index + 1}) ${option}`, { align: "left", indent: 20 });
      doc.moveDown(0.5);
    });

    doc.moveDown(2);

    // EMAIL ID
    doc.text(
      "6. Mail Id for communication with the Practice Unit: ________________________",
      {
        align: "left",
      }
    );

    doc.moveDown(1.5);

    // ADDRESS
    doc.text("7. Address for sending the Peer Review Certificate:", {
      align: "left",
    });

    doc.moveDown();
    doc.text(
      "________________________________________________________________________",
      { align: "left" }
    );
    doc.text(
      "________________________________________________________________________",
      { align: "left" }
    );
    doc.text(
      "________________________________________________________________________",
      { align: "left" }
    );

    doc.moveDown(3);

    // FURTHER INFORMATION FOR NEW UNITS
    doc
      .font("Helvetica-Bold")
      .text("Further Information to be submitted by New Unit", {
        align: "left",
        underline: true,
      });

    doc.end();

    writeStream.on("finish", () => {
      callback(null, pdfPath);
    });
  } catch (error) {
    callback(error, null);
  }
};
