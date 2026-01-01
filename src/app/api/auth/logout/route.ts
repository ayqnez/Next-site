import { NextResponse } from "next/server";

export async function POST() {
    const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/api/auth/logout`,
        {
            method: "POST",
            credentials: "include",
        }
    );

    const response = NextResponse.json({}, { status: res.status });

    const setCookie = res.headers.get("set-cookie");
    if (setCookie) {
        response.headers.set("set-cookie", setCookie);
    }

    return response;
}
