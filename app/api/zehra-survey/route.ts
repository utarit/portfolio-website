import { NextRequest, NextResponse } from "next/server";

import { appendToSheet, readFromSheet } from "../../../lib/google-sheets";

// This will be deployed as a Vercel Edge Function
// Free tier: 100GB bandwidth, 1000 invocations per day

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const action = searchParams.get("action");

    if (action === "getResults") {
      const sheetData = await readFromSheet();
      if (!sheetData) {
        // Return empty results if sheet is empty or fails to load
        return NextResponse.json(calculateResults([]));
      }

      // Remove header row
      const data = sheetData.slice(1);

      const results = calculateResults(data);

      return NextResponse.json(results, {
        headers: {
          "Access-Control-Allow-Origin": "*",
          "Access-Control-Allow-Methods": "GET, POST, OPTIONS",
          "Access-Control-Allow-Headers": "Content-Type",
        },
      });
    }

    return NextResponse.json({ error: "Invalid action" }, { status: 400 });
  } catch (error) {
    console.error("GET Error:", error);
    return NextResponse.json(
      { error: "Server error", details: (error as Error).message },
      { status: 500 },
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();

    if (body.action === "submitForm") {
      const submissionData = body.data;
      const timestamp = body.timestamp || new Date().toISOString();

      const values = [
        timestamp,
        submissionData.initialConclusion,
        submissionData.responsible.join(", "),
        submissionData.carAccident,
        submissionData.hospitalReason,
        submissionData.finalAction,
      ];

      await appendToSheet(values);

      return NextResponse.json({ success: true }, {
        headers: {
          "Access-Control-Allow-Origin": "*",
          "Access-Control-Allow-Methods": "GET, POST, OPTIONS",
          "Access-Control-Allow-Headers": "Content-Type",
        },
      });
    }

    return NextResponse.json({ error: "Invalid action" }, { status: 400 });
  } catch (error) {
    console.error("POST Error:", error);
    return NextResponse.json(
      { error: "Server error", details: (error as Error).message },
      { status: 500 },
    );
  }
}

export async function OPTIONS() {
  return new Response(null, {
    status: 200,
    headers: {
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Methods": "GET, POST, OPTIONS",
      "Access-Control-Allow-Headers": "Content-Type",
    },
  });
}

function calculateResults(data: any[]) {
  const results = {
    totalResponses: data.length,
    results: {
      initialConclusion: {} as Record<string, number>,
      responsible: {} as Record<string, number>,
      carAccident: {} as Record<string, number>,
      hospitalReason: {} as Record<string, number>,
      finalAction: {} as Record<string, number>,
    },
  };

  if (data.length === 0) {
    return results;
  }

  data.forEach((row) => {
    const item = {
      timestamp: row[0],
      initialConclusion: row[1],
      responsible: row[2] ? row[2].split(", ") : [],
      carAccident: row[3],
      hospitalReason: row[4],
      finalAction: row[5],
    };

    // Count initial conclusions
    if (item.initialConclusion) {
      results.results.initialConclusion[item.initialConclusion] =
        (results.results.initialConclusion[item.initialConclusion] || 0) + 1;
    }

    // Count responsible people
    if (item.responsible && Array.isArray(item.responsible)) {
      item.responsible.forEach((person: string) => {
        results.results.responsible[person] =
          (results.results.responsible[person] || 0) + 1;
      });
    }

    // Count car accidents
    if (item.carAccident) {
      results.results.carAccident[item.carAccident] =
        (results.results.carAccident[item.carAccident] || 0) + 1;
    }

    // Count hospital reasons
    if (item.hospitalReason) {
      results.results.hospitalReason[item.hospitalReason] =
        (results.results.hospitalReason[item.hospitalReason] || 0) + 1;
    }

    // Count final actions
    if (item.finalAction) {
      results.results.finalAction[item.finalAction] =
        (results.results.finalAction[item.finalAction] || 0) + 1;
    }
  });

  return results;
}

// Optional: Function to save to Google Sheets API (requires setup)
// This is now handled in lib/google-sheets.ts
