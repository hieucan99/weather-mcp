import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { StdioServerTransport } from "@modelcontextprotocol/sdk/server/stdio.js";
import { z } from "zod";
const WEATHER_API_BASE = "https://dataservice.accuweather.com";
const SEARCH_TOP_CITIES = "/currentconditions/v1/topcities";
// Create server instance
const server = new McpServer({
    name: "weather",
    version: "1.0.0",
    capabilities: {
        resources: {},
        tools: {},
    },
});
// Helper function for making Search - Current conditions for top cities
async function searchTopCities(topCity, language) {
    const url = `${WEATHER_API_BASE}${SEARCH_TOP_CITIES}`;
    const apiKey = process.env.ACCUWEATHER_API_KEY || "";
    if (!apiKey) {
        throw new Error("API key is required");
    }
    const realHeader = {
        Authorization: `Bearer ${apiKey}`,
        language: language,
    };
    const queryParams = new URLSearchParams({
        topCity: topCity.toString(),
    });
    const fullUrl = `${url}/${topCity}`;
    try {
        const response = await fetch(fullUrl, {
            headers: realHeader,
        });
        if (!response.ok) {
            throw new Error(`Error: ${response.status} - ${response.statusText}`);
        }
        return await response.json();
    }
    catch (error) {
        // Log error details: url, payload, header (without sensitive info)
        console.error("Fetch error:", error && error.message ? error.message : error);
        console.error("Request details:", {
            url: fullUrl,
            payload: null, // GET request, so no payload
            headers: realHeader,
        });
        return null;
    }
}
// Register Search - Current conditions for top cities
server.tool("search_top_cities", "Search - Current conditions for top cities", {
    top_city: z.number().min(1).max(100).default(50).describe("Number of top cities to retrieve"),
    language: z.string().min(2).max(2).default("en-us").describe("Language code"),
}, async ({ top_city, language }) => {
    const language_code = language.toLocaleLowerCase() || "en-us";
    const top_cities = Math.min(Math.max(top_city, 1), 100); // Ensure top_city is between 1 and 100
    const result = await searchTopCities(top_cities, language_code);
    if (!result) {
        return {
            content: [
                { type: "text", text: "Failed to fetch weather data. Please check your parameters." }
            ]
        };
    }
    // Format the result for better readability based on API documentation
    const formattedResult = result.map((city) => {
        return [
            `  City: ${city.LocalizedName || city.EnglishName || "Unknown"}`,
            `  Country: ${city.Country?.LocalizedName || city.Country?.EnglishName || "Unknown"}`,
            `  TimeZone: ${city.TimeZone?.Name || "Unknown"}`,
            `  GeoPosition: lat ${city.GeoPosition?.Latitude ?? "?"}, lon ${city.GeoPosition?.Longitude ?? "?"}`,
            `  LocalObservationDateTime: ${city.LocalObservationDateTime || "Unknown"}`,
            `  Weather: ${city.WeatherText || "Unknown"} (Icon: ${city.WeatherIcon ?? "?"})`,
            `  Precipitation: ${city.HasPrecipitation ? (city.PrecipitationType || "Yes") : "No"}`,
            `  IsDayTime: ${city.IsDayTime ? "Day" : "Night"}`,
            `  Temperature: ${city.Temperature?.Metric?.Value != null ? city.Temperature.Metric.Value + "°C" : "N/A"} / ${city.Temperature?.Imperial?.Value != null ? city.Temperature.Imperial.Value + "°F" : "N/A"}`,
            `  Link: ${city.Link || "N/A"}`,
            `  MobileLink: ${city.MobileLink || "N/A"}`
        ].join("\n");
    }).join("\n\n");
    return {
        content: [
            { type: "text", text: formattedResult }
        ]
    };
});
// Start the server with stdio transport
async function main() {
    const transport = new StdioServerTransport();
    await server.connect(transport);
    console.error("Weather MCP Server running on stdio");
}
main().catch((error) => {
    console.error("Fatal error in main():", error);
    process.exit(1);
});
