
import { NextResponse } from "next/server";

export async function GET(request: Request) {
    // Keep this outside try/catch so Next.js can handle
    // its internal prerender interruption correctly.
    const query = new URL(request.url).searchParams
        .get("query")
        ?.trim();

    try {
        if (!query || query.length < 2) {
            return NextResponse.json({ data: [] });
        }

        const token = process.env.DUFFEL_ACCESS_TOKEN;

        if (!token) {
            return NextResponse.json(
                { error: "Duffel API token is missing" },
                { status: 500 }
            );
        }

        const response = await fetch(
            `https://api.duffel.com/places/suggestions?query=${encodeURIComponent(query)}`,
            {
                headers: {
                    Authorization: `Bearer ${token}`,
                    "Duffel-Version": "v2",
                    Accept: "application/json",
                },
                cache: "no-store",
            }
        );

        if (!response.ok) {
            const result = await response.json().catch(() => null);

            return NextResponse.json(
                {
                    error:
                        result?.errors?.[0]?.message ||
                        "Airport search failed",
                },
                { status: response.status }
            );
        }

        const result = await response.json();

        return NextResponse.json({
            data: result.data || [],
        });
    } catch (error) {
        console.error("Airport suggestions error:", error);

        return NextResponse.json(
            { error: "Unable to fetch airport suggestions" },
            { status: 500 }
        );
    }
}
