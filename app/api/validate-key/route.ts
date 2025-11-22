import { NextRequest, NextResponse } from "next/server";
import { supabase } from "@/lib/supabase";

/**
 * POST /api/validate-key
 * Validates an API key against the Supabase database
 *
 * Request body: { "apiKey": "your-api-key-here" }
 * Response: { "valid": boolean, "message": string }
 */
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { apiKey } = body;

    // Validate request body
    if (!apiKey || typeof apiKey !== "string" || apiKey.trim().length === 0) {
      return NextResponse.json(
        { valid: false, message: "API key is required" },
        { status: 400 }
      );
    }

    // Query Supabase api_keys table to check if key exists
    const { data, error } = await supabase
      .from("api_keys")
      .select("id")
      .eq("key", apiKey.trim())
      .single();

    // If error (including "not found"), key is invalid
    if (error) {
      // PGRST116 means no rows found - this is expected for invalid keys
      if (error.code === "PGRST116") {
        return NextResponse.json(
          { valid: false, message: "Invalid API key" },
          { status: 401 }
        );
      }
      // Other errors (network, permissions, etc.)
      console.error("Error validating API key:", error);
      return NextResponse.json(
        { valid: false, message: "Error validating API key" },
        { status: 500 }
      );
    }

    // If data exists, key is valid
    if (data) {
      return NextResponse.json(
        { valid: true, message: "API key is valid" },
        { status: 200 }
      );
    }

    return NextResponse.json(
      { valid: false, message: "Invalid API key" },
      { status: 401 }
    );
  } catch (error) {
    console.error("Unexpected error in validate-key:", error);
    return NextResponse.json(
      { valid: false, message: "Internal server error" },
      { status: 500 }
    );
  }
}
