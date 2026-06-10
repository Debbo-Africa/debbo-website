const SHEET_COLUMNS = {
  "Corporate Enquiries": [
    "timestamp",
    "companyName",
    "contactPerson",
    "email",
    "industry",
    "interests",
    "teamSize",
    "preferredMeetingDate",
    "additionalNotes",
    "consent",
  ],
  Bookings: [
    "timestamp",
    "firstName",
    "lastName",
    "phoneNumber",
    "email",
    "bookingTypes",
    "serviceNeeded",
    "preferredDateTime",
    "additionalNotes",
    "consent",
  ],
};

function doPost(e) {
  try {
    const params = e.parameter || {};
    const sheetName = params.sheetName || "Bookings";
    const columns = SHEET_COLUMNS[sheetName];

    if (!columns) {
      throw new Error("Unknown sheetName: " + sheetName);
    }

    const spreadsheet = SpreadsheetApp.getActiveSpreadsheet();
    let sheet = spreadsheet.getSheetByName(sheetName);

    if (!sheet) {
      sheet = spreadsheet.insertSheet(sheetName);
      sheet.appendRow(columns);
    }

    if (sheet.getLastRow() === 0) {
      sheet.appendRow(columns);
    }

    const row = columns.map(function (column) {
      return params[column] || "";
    });

    sheet.appendRow(row);

    return ContentService.createTextOutput(
      JSON.stringify({
        success: true,
        message: "Saved to " + sheetName,
      })
    ).setMimeType(ContentService.MimeType.JSON);
  } catch (error) {
    return ContentService.createTextOutput(
      JSON.stringify({
        success: false,
        message: error.message,
      })
    ).setMimeType(ContentService.MimeType.JSON);
  }
}
