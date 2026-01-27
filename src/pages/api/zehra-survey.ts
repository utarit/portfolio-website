import type { APIRoute } from 'astro';
import { appendToSheet, readFromSheet } from '../../lib/google-sheets';

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

export const GET: APIRoute = async ({ url }) => {
  try {
    const action = url.searchParams.get("action");

    if (action === "getResults") {
      const sheetData = await readFromSheet();
      if (!sheetData) {
        // Return empty results if sheet is empty or fails to load
        return new Response(JSON.stringify(calculateResults([])), {
          status: 200,
          headers: {
            "Content-Type": "application/json",
            "Access-Control-Allow-Origin": "*",
            "Access-Control-Allow-Methods": "GET, POST, OPTIONS",
            "Access-Control-Allow-Headers": "Content-Type",
          },
        });
      }

      // Remove header row
      const data = sheetData.slice(1);
      const results = calculateResults(data);

      return new Response(JSON.stringify(results), {
        status: 200,
        headers: {
          "Content-Type": "application/json",
          "Access-Control-Allow-Origin": "*",
          "Access-Control-Allow-Methods": "GET, POST, OPTIONS",
          "Access-Control-Allow-Headers": "Content-Type",
        },
      });
    }

    return new Response(JSON.stringify({ error: "Invalid action" }), {
      status: 400,
      headers: {
        "Content-Type": "application/json",
      },
    });
  } catch (error) {
    console.error("GET Error:", error);
    return new Response(
      JSON.stringify({
        error: "Server error",
        details: (error as Error).message,
      }),
      {
        status: 500,
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
  }
};

export const POST: APIRoute = async ({ request }) => {
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

      return new Response(JSON.stringify({ success: true }), {
        status: 200,
        headers: {
          "Content-Type": "application/json",
          "Access-Control-Allow-Origin": "*",
          "Access-Control-Allow-Methods": "GET, POST, OPTIONS",
          "Access-Control-Allow-Headers": "Content-Type",
        },
      });
    }

    return new Response(JSON.stringify({ error: "Invalid action" }), {
      status: 400,
      headers: {
        "Content-Type": "application/json",
      },
    });
  } catch (error) {
    console.error("POST Error:", error);
    return new Response(
      JSON.stringify({
        error: "Server error",
        details: (error as Error).message,
      }),
      {
        status: 500,
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
  }
};

export const OPTIONS: APIRoute = async () => {
  return new Response(null, {
    status: 200,
    headers: {
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Methods": "GET, POST, OPTIONS",
      "Access-Control-Allow-Headers": "Content-Type",
    },
  });
};