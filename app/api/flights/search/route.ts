
import { NextRequest, NextResponse } from "next/server";

const DUFFEL_API_URL = "https://api.duffel.com";

type SearchSegment = {
    from: string;
    to: string;
    departure?: string | Date;
};

type SearchBody = {
    offerRequestId?: string;
    after?: string | null;
    limit?: number;
    sort?: string;
    tripType: "oneway" | "roundtrip" | "multicity";
    segments?: SearchSegment[];
    returnDate?: string | Date;
    adults?: number;
    children?: number;
    infants?: number;
    childAges?: number[];
    infantAges?: number[];
    travelClass?: string;
};

function getAirportCode(value: string) {
    const parts = value.trim().split("/");
    const code = parts[parts.length - 1].trim().toUpperCase();

    if (!/^[A-Z]{3}$/.test(code)) {
        throw new Error(`Invalid airport IATA code: ${value}`);
    }

    return code;
}

function formatDate(value: string | Date) {
    if (!value) {
        throw new Error("Please select a departure date.");
    }

    if (typeof value === "string") {
        const match = value.match(/^(\d{4})-(\d{2})-(\d{2})/);

        if (match) {
            const [, year, month, day] = match;
            const date = new Date(
                Number(year),
                Number(month) - 1,
                Number(day)
            );

            if (
                date.getFullYear() !== Number(year) ||
                date.getMonth() !== Number(month) - 1 ||
                date.getDate() !== Number(day)
            ) {
                throw new Error("Invalid departure date.");
            }

            return `${year}-${month}-${day}`;
        }
    }

    const date = new Date(value);

    if (Number.isNaN(date.getTime())) {
        throw new Error("Invalid departure date.");
    }

    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const day = String(date.getDate()).padStart(2, "0");

    return `${year}-${month}-${day}`;
}

function getDuffelHeaders(token: string) {
    return {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
        Accept: "application/json",
        "Duffel-Version": "v2",
    };
}

export async function POST(request: NextRequest) {
    try {
        const token = process.env.DUFFEL_ACCESS_TOKEN;

        if (!token) {
            return NextResponse.json(
                { error: "Duffel API token is missing." },
                { status: 500 }
            );
        }

        const body: SearchBody = await request.json();

        const {
            offerRequestId,
            after,
            limit = 10,
            sort = "total_amount",
            tripType,
            segments,
            returnDate,
            adults = 1,
            children = 0,
            infants = 0,
            childAges = [],
            infantAges = [],
            travelClass = "Economy",
        } = body;

        // STEP 1: Validate pagination parameters.

      if (
    !Number.isInteger(adults) ||
    !Number.isInteger(children) ||
    !Number.isInteger(infants) ||
    adults < 1 ||
    children < 0 ||
    infants < 0 ||
    adults + children + infants > 9
) {
    return NextResponse.json(
        { error: "Passenger count must be between 1 and 9." },
        { status: 400 }
    );
}

if (infants > adults) {
    return NextResponse.json(
        { error: "Each infant must be accompanied by an adult." },
        { status: 400 }
    );
}

if (
    !Array.isArray(childAges) ||
    !Array.isArray(infantAges) ||
    childAges.length !== children ||
    infantAges.length !== infants
) {
    return NextResponse.json(
        { error: "Please provide the age of every child and infant." },
        { status: 400 }
    );
}

if (
    childAges.some(
        (age) => !Number.isInteger(age) || age < 2 || age >= 18
    ) ||
    infantAges.some(
        (age) => !Number.isInteger(age) || age < 0 || age >= 2
    )
) {
    return NextResponse.json(
        { error: "Please enter valid passenger ages." },
        { status: 400 }
    );
}
        // STEP 2: Create or reuse offer request.

        let currentOfferRequestId = offerRequestId;

        if (!currentOfferRequestId) {
            if (!Array.isArray(segments) || !segments.length) {
                return NextResponse.json(
                    { error: "Please provide flight segments." },
                    { status: 400 }
                );
            }

            if (
                !["oneway", "roundtrip", "multicity"].includes(tripType)
            ) {
                return NextResponse.json(
                    { error: "Invalid trip type." },
                    { status: 400 }
                );
            }

            if (
                segments.length > 5 ||
                (tripType !== "multicity" && segments.length !== 1)
            ) {
                return NextResponse.json(
                    { error: "Invalid number of flight segments." },
                    { status: 400 }
                );
            }

            if (tripType === "roundtrip" && !returnDate) {
                return NextResponse.json(
                    { error: "Please select a return date." },
                    { status: 400 }
                );
            }

            if (
                !Number.isInteger(adults) ||
                !Number.isInteger(children) ||
                !Number.isInteger(infants) ||
                adults < 1 ||
                children < 0 ||
                infants < 0 ||
                adults + children + infants > 9
            ) {
                return NextResponse.json(
                    { error: "Passenger count must be between 1 and 9." },
                    { status: 400 }
                );
            }

            if (
                !Array.isArray(childAges) ||
                !Array.isArray(infantAges) ||
                childAges.length !== children ||
                infantAges.length !== infants
            ) {
                return NextResponse.json(
                    {
                        error: "Please provide the age of every child and infant.",
                    },
                    { status: 400 }
                );
            }

            if (
                childAges.some(
                    (age) =>
                        !Number.isInteger(age) || age < 2 || age >= 18
                ) ||
                infantAges.some(
                    (age) =>
                        !Number.isInteger(age) || age < 0 || age >= 2
                )
            ) {
                return NextResponse.json(
                    { error: "Please enter valid passenger ages." },
                    { status: 400 }
                );
            }

            const cabinMap: Record<string, string> = {
                Economy: "economy",
                "Premium Economy": "premium_economy",
                Business: "business",
                "First Class": "first",
            };

            if (!cabinMap[travelClass]) {
                return NextResponse.json(
                    { error: "Invalid travel class." },
                    { status: 400 }
                );
            }

            // Prepare flight slices.

            const slices = segments.map((segment) => ({
                origin: getAirportCode(segment.from),
                destination: getAirportCode(segment.to),
                departure_date: formatDate(segment.departure!),
            }));

            // Add return flight for round trip.

            if (tripType === "roundtrip") {
                const first = segments[0];

                slices.push({
                    origin: getAirportCode(first.to),
                    destination: getAirportCode(first.from),
                    departure_date: formatDate(returnDate!),
                });
            }

            // Prepare passengers.

         const passengers = [
    ...Array.from(
        { length: adults },
        () => ({ type: "adult" })
    ),

    ...childAges.map((age) => ({
        age,
    })),

    ...infantAges.map((age) => ({
        age,
    })),
];
            // Create Duffel offer request.

            const createResponse = await fetch(
                `${DUFFEL_API_URL}/air/offer_requests?return_offers=false`,
                {
                    method: "POST",
                    headers: getDuffelHeaders(token),
                    body: JSON.stringify({
                        data: {
                            slices,
                            passengers,
                            cabin_class: cabinMap[travelClass],
                        },
                    }),
                    cache: "no-store",
                }
            );

            const createResult = await createResponse.json();

            if (!createResponse.ok) {
                console.error("Duffel search error:", createResult);

                return NextResponse.json(
                    {
                        error:
                            createResult.errors?.[0]?.message ||
                            "Unable to search flights. Please try again.",
                        details: createResult.errors,
                    },
                    { status: createResponse.status }
                );
            }

            currentOfferRequestId = createResult.data.id;
        }

        // STEP 3: Fetch requested page of offers.

        const params = new URLSearchParams({
            offer_request_id: currentOfferRequestId!,
            limit: String(limit),
            sort: sort,
        });

        if (after) {
            params.set("after", after);
        }

        const offersResponse = await fetch(
            `${DUFFEL_API_URL}/air/offers?${params.toString()}`,
            {
                method: "GET",
                headers: getDuffelHeaders(token),
                cache: "no-store",
            }
        );

        const offersResult = await offersResponse.json();

        if (!offersResponse.ok) {
            console.error("Duffel offers error:", offersResult);

            return NextResponse.json(
                {
                    error:
                        offersResult.errors?.[0]?.message ||
                        "Unable to fetch flight offers.",
                    details: offersResult.errors,
                },
                { status: offersResponse.status }
            );
        }

        // STEP 4: Return paginated response.

        const nextCursor = offersResult.meta?.after ?? null;

        return NextResponse.json({
            success: true,
            offerRequestId: currentOfferRequestId,
            offers: offersResult.data || [],
            pagination: {
                limit,
                nextCursor,
                hasMore: Boolean(nextCursor),
            },
        });

    } catch (error) {
        console.error("Flight search error:", error);

        return NextResponse.json(
            {
                error:
                    error instanceof Error
                        ? error.message
                        : "Something went wrong.",
            },
            { status: 500 }
        );
    }
}
