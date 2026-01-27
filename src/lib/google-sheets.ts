import { google } from "googleapis";

export const getGoogleSheetsClient = () => {
  const privateKey = import.meta.env.GOOGLE_PRIVATE_KEY?.replace(/\\n/g, "\n");
  const clientEmail = import.meta.env.GOOGLE_CLIENT_EMAIL;

  if (!privateKey || !clientEmail) {
    throw new Error(
      "Google credentials (GOOGLE_PRIVATE_KEY, GOOGLE_CLIENT_EMAIL) are not set in environment variables.",
    );
  }

  const auth = new google.auth.GoogleAuth({
    credentials: {
      private_key: privateKey,
      client_email: clientEmail,
    },
    scopes: ["https://www.googleapis.com/auth/spreadsheets"],
  });

  return google.sheets({ version: "v4", auth });
};

export const SPREADSHEET_ID = import.meta.env.GOOGLE_SHEET_ID;
export const SHEET_NAME = "Submissions"; // You can change this if you want

const getSheetTitle = (sheets: any) => `${SHEET_NAME}!A1:Z`;

export const appendToSheet = async (values: any[]) => {
  if (!SPREADSHEET_ID) {
    throw new Error("GOOGLE_SHEET_ID is not set.");
  }
  const sheets = await getGoogleSheetsClient();
  const range = getSheetTitle(sheets);

  // Check for header row
  const getResponse = await sheets.spreadsheets.values.get({
    spreadsheetId: SPREADSHEET_ID,
    range: `${SHEET_NAME}!A1:E1`,
  });

  if (!getResponse.data.values || getResponse.data.values.length === 0) {
    // Header row is missing, so add it
    const header = [
      "timestamp",
      "initialConclusion",
      "responsible",
      "carAccident",
      "hospitalReason",
      "finalAction",
    ];
    await sheets.spreadsheets.values.append({
      spreadsheetId: SPREADSHEET_ID,
      range: `${SHEET_NAME}!A1`,
      valueInputOption: "USER_ENTERED",
      requestBody: {
        values: [header],
      },
    });
  }

  // Append the new row
  const response = await sheets.spreadsheets.values.append({
    spreadsheetId: SPREADSHEET_ID,
    range: range,
    valueInputOption: "USER_ENTERED",
    requestBody: {
      values: [values],
    },
  });

  return response;
};

export const readFromSheet = async () => {
  if (!SPREADSHEET_ID) {
    throw new Error("GOOGLE_SHEET_ID is not set.");
  }
  const sheets = await getGoogleSheetsClient();
  const range = getSheetTitle(sheets);

  const response = await sheets.spreadsheets.values.get({
    spreadsheetId: SPREADSHEET_ID,
    range: range,
  });

  return response.data.values;
};