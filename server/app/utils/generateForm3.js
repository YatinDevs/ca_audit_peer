const fs = require("fs");
const path = require("path");
const PDFDocument = require("pdfkit");

const generateFormThreePDF = (data, callback) => {
  try {
    const doc = new PDFDocument({
      margins: { top: 70, bottom: 70, left: 100, right: 100 },
    });

    const pdfPath = path.join(
      __dirname,
      "../templates/Form3_PeerReviewerApplication.pdf"
    );
    const writeStream = fs.createWriteStream(pdfPath);
    doc.pipe(writeStream);

    const contentWidth =
      doc.page.width - doc.page.margins.left - doc.page.margins.right;

    // FORM HEADER
    doc
      .fontSize(14)
      .font("Helvetica-Bold")
      .text("FORM 3", { align: "center", width: contentWidth });
    doc.moveDown(1);

    doc
      .fontSize(12)
      .text(
        "APPLICATION CUM DECLARATION FORM FOR EMPANELMENT AS A PEER REVIEWER",
        {
          align: "center",
          width: contentWidth,
        }
      );
    doc.moveDown(2);

    // ADDRESS BLOCK
    doc.fontSize(12).font("Helvetica").text("To,", { align: "left" });
    doc.text("The Secretary, Peer Review Board,");
    doc.text("The Institute of Chartered Accountants of India,");
    doc.text("ICAI Bhawan,");
    doc.text("Post Box No. 7100,");
    doc.text("Indraprastha Marg, New Delhi – 110002");
    doc.moveDown(2);

    // GREETING
    doc.text("Dear Sir,");
    doc.moveDown(1);

    doc.text(
      `I, ${data.name}, M. No. ${data.membershipNo}, would like to apply for Empanelment as a Peer Reviewer.`
    );
    doc.moveDown(1);
    doc.text(
      `I have attended the training Programme organized by the Board physically/through VCM on ${data.trainingDate}.`
    );
    doc.moveDown(1);
    doc.text("I have gone through the Peer Review Guidelines 2022 hosted at:");
    doc
      .fillColor("blue")
      .text(
        "https://resource.cdn.icai.org/72010prb57960-peer-review-guidelines-2022.pdf",
        { underline: true }
      );
    doc.fillColor("black");
    doc.text("And undertake to abide by the same.");
    doc.moveDown(2);

    // CONTACT DETAILS TABLE
    const tableX = doc.x;
    const tableY = doc.y;
    const cellWidth = 25;
    const cellHeight = 20;

    doc.text("Mobile No.:", tableX, tableY);
    for (let i = 0; i < 10; i++) {
      doc
        .rect(tableX + 80 + i * cellWidth, tableY - 5, cellWidth, cellHeight)
        .stroke();
      if (data.mobileNo && data.mobileNo[i]) {
        doc.text(data.mobileNo[i], tableX + 88 + i * cellWidth, tableY, {
          width: cellWidth,
          align: "center",
        });
      }
    }
    doc.moveDown(2);

    // ADDRESS FIELD
    doc.text("Present Communication Address:");
    doc.rect(tableX, doc.y, contentWidth, 60).stroke();
    doc.text(data.address, tableX + 5, doc.y + 5, { width: contentWidth - 10 });
    doc.moveDown(5);
    // CONTACT DETAILS TABLE
    const tableEX = doc.x;
    const tableEY = doc.y;
    const cellEWidth = 25;
    const cellEHeight = 20;
    doc.text("E-mail Address:", tableEX, tableEY);
    for (let i = 0; i < 12; i++) {
      doc
        .rect(
          tableEX + 100 + i * cellEWidth,
          tableEY - 5,
          cellEWidth,
          cellEHeight
        )
        .stroke();
      if (data.email && data.email[i]) {
        doc.text(data.email[i], tableEX + 108 + i * cellEWidth, tableEY, {
          width: cellEWidth,
          align: "center",
        });
      }
    }
    doc.moveDown(3);

    doc.moveDown(3);
    doc.text("Signature: ______________________");
    doc.moveDown(1);
    doc.text(`Name: ${data.name}`);
    doc.moveDown(1);
    doc.text(`Membership No.: ${data.membershipNo}`);

    doc.end();
    writeStream.on("finish", () => {
      callback(null, pdfPath);
    });
  } catch (error) {
    callback(error, null);
  }
};

module.exports = generateFormThreePDF;
