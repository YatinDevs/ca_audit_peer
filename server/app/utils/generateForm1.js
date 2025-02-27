const fs = require("fs");
const path = require("path");
const PDFDocument = require("pdfkit");

const generateFormOnePDF = (data, callback) => {
  try {
    const doc = new PDFDocument({
      margins: { top: 100, bottom: 70, left: 80, right: 80 },
    });

    const pdfPath = path.join(
      __dirname,
      "../templates/Form1_PracticeUnitApplication.pdf"
    );
    const writeStream = fs.createWriteStream(pdfPath);
    doc.pipe(writeStream);

    const contentWidth =
      doc.page.width - doc.page.margins.left - doc.page.margins.right;

    // FORM HEADER
    doc
      .fontSize(14)
      .font("Helvetica-Bold")
      .text("FORM 1", { align: "center", width: contentWidth });
    doc.moveDown(1);
    doc
      .fontSize(12)
      .text("APPLICATION CUM QUESTIONNAIRE TO BE SUBMITTED BY PRACTICE UNIT", {
        align: "center",
        width: contentWidth,
      });

    // Proper way to apply italics
    doc
      .font("Helvetica-Bold")
      .font("Helvetica-Oblique")

      .text("[As per Clause 6(1) & 6(2) of the Peer Review Guidelines 2022]", {
        align: "center",
      });
    doc.moveDown(2);

    // ADDRESS BLOCK
    doc.fontSize(12).font("Helvetica-Bold").text("To,", { align: "left" });
    doc.text("The Secretary, Peer Review Board,");
    doc.text("The Institute of Chartered Accountants of India,");
    doc.text("ICAI Bhawan,");
    doc.text("Post Box No. 7100,");
    doc.text("Indraprastha Marg, New Delhi – 110002");
    doc.moveDown(2);
    doc
      .fontSize(14)
      .font("Helvetica-Bold")
      .text("APPLICATION", { align: "center", width: contentWidth });
    doc.moveDown(1);
    // GREETING
    doc.fontSize(12).font("Helvetica").text("Dear Sir,");
    doc.moveDown(1);

    // APPLICATION TEXT
    const indentSpacing = 20; // Space for numbering alignment

    // Point 1
    doc
      .fontSize(12)
      .font("Helvetica")
      .text("1.", doc.x, doc.y, { continued: true }) // Print "1." and keep the text on the same line
      .text(
        `Our Firm ${data.firmName}, (Name of practice unit as per ICAI Records); FRN/ M. No ${data.frnNo}, (Firm Registration Number/ Mem. No. as per ICAI records) would like to apply for Peer Review for the period from ${data.reviewPeriodFrom} to ${data.reviewPeriodTo} (three preceding financial years from the date of application).`,
        doc.x + indentSpacing,
        doc.y
      );

    // Additional text should align properly
    doc.text(
      "We have gone through the Peer Review Guidelines 2022 hosted at:",
      {
        indent: indentSpacing,
      }
    );
    doc
      .fillColor("blue")
      .text(
        "https://resource.cdn.icai.org/72010prb57960-peer-review-guidelines2022.pdf",
        { underline: true, indent: indentSpacing }
      )
      .fillColor("black")
      .text("And undertake to abide by the same.", { indent: indentSpacing });

    doc.moveDown(2);

    // Point 2
    doc
      .text("2.", doc.x, doc.y, { continued: true }) // Print "2." first
      .text(
        `I/We hereby declare that my/our firm is applying for Peer Review (Tick the applicable clause):`,
        doc.x + indentSpacing,
        doc.y
      );
    doc.moveDown(1);
    // TABLE FOR CHECKBOXES
    const bulletPoints = [
      "(i)       As it is Mandatory by: ICAI",
      "          Any other Regulator (please specify): " +
        (data.otherRegulator || ""),
      "(ii)      Voluntarily",
      "(iii)     As a special case Review initiated by the Board",
      "(iv)     New Unit",
      "(v)      As per decision of the Board",
    ];

    bulletPoints.forEach((point, index) => {
      doc.text("     " + point, { width: contentWidth - 50 }).moveUp(1);
      doc.text(
        ` [${
          [
            data.mandatoryICAI,
            data.mandatoryOther,
            data.voluntary,
            data.specialCase,
            data.newUnit,
            data.boardDecision,
          ][index]
            ? "✔"
            : " "
        }]`,
        { align: "right" }
      );
      doc.moveDown(1);
    });

    doc.moveDown(3);

    const startX = 80; // Left padding
    const tableWidth = 450;
    const rowHeight = 25;

    doc.addPage();

    // Section 3 Title
    doc
      .font("Helvetica-Bold")
      .text(
        "3. I/We hereby declare that my/our firm has signed reports pertaining to the following assurance services during the period under review:"
      );
    doc.moveDown(1);

    // Table Headers with Gray Background
    doc
      .fillColor("gray")
      .rect(startX, doc.y, tableWidth, rowHeight)
      .fill()
      .fillColor("black")
      .font("Helvetica-Bold")
      .text("S. No.", startX + 5, doc.y + 8)
      .text("Type of Assurance Service Rendered", startX + 70, doc.y + 8)
      .text("Major Type of Client", startX + 320, doc.y + 8);

    doc.moveDown(1);

    // Table Data
    const assuranceServices = [
      {
        type: "Central Statutory Audit",
        client: data.centralStatutoryAudit || "N/A",
      },
      { type: "Statutory Audit", client: data.statutoryAudit || "N/A" },
      { type: "Internal Audit", client: data.internalAudit || "N/A" },
      { type: "Tax Audit", client: data.taxAudit || "N/A" },
      { type: "Concurrent Audit", client: data.concurrentAudit || "N/A" },
      { type: "Certification Work", client: data.certificationWork || "N/A" },
      {
        type: "Any other, please specify",
        client: data.otherAssurance || "N/A",
      },
    ];

    // Draw Table Rows
    assuranceServices.forEach((service, index) => {
      doc
        .strokeColor("black")
        .lineWidth(1)
        .rect(startX, doc.y, tableWidth, rowHeight)
        .stroke();

      doc
        .font("Helvetica")
        .text(`${index + 1}.`, startX + 5, doc.y + 8)
        .text(service.type, startX + 70, doc.y + 8)
        .text(service.client, startX + 320, doc.y + 8);
      doc.moveDown(1);
    });

    doc.moveDown(2);

    // Section 4: Statutory Audit Declaration
    doc
      .font("Helvetica-Bold")
      .text(
        "4. I [ ] / We [ ] hereby declare that my [ ] / our [ ] firm has conducted [ ] / has not conducted [ ] Statutory Audit of enterprises Listed in India or abroad as defined under SEBI LODR, 2015 during the Review Period."
      );
    doc.moveDown(2);

    // Section 5: Reviewer Appointment Options
    doc
      .font("Helvetica-Bold")
      .text("5. Option for appointment of Reviewer: (Tick appropriate option)");
    doc.moveDown(1);

    const reviewerOptions = [
      { label: "Same City", value: data.reviewerSameCity },
      { label: "From Outside City", value: data.reviewerOutsideCity },
      { label: "Either option (i) or (ii)", value: data.reviewerEitherOption },
    ];

    reviewerOptions.forEach((option) => {
      doc.text(` [ ${option.value ? "✔" : " "} ] ${option.label}`);
    });

    doc.moveDown(1);
    doc.text(
      `(iv) Preferred City in case of option (ii): ${
        data.preferredCity || "______"
      }`
    );

    doc.moveDown(2);

    // Section 6: Contact Information
    doc
      .font("Helvetica-Bold")
      .text("6. Mail ID for communication with the Practice unit:");
    doc.font("Helvetica").text(data.email || "______");
    doc.moveDown(1);

    // Section 7: Address
    doc
      .font("Helvetica-Bold")
      .text("7. Address for sending the Peer Review Certificate:");
    doc.font("Helvetica").text(data.address || "______________________");
    doc.moveDown(2);

    // Further Information for New Units
    doc
      .font("Helvetica-Bold")
      .text("Further Information to be submitted by New Unit:");
    doc.font("Helvetica").text("..."); // Placeholder
    // Add content to the PDF

    doc.end();
    writeStream.on("finish", () => {
      callback(null, pdfPath);
    });
  } catch (error) {
    callback(error, null);
  }
};

module.exports = generateFormOnePDF;
