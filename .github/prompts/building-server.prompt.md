# MCP Server Setup: To-Do List
- As a developer, complete each task in the list below.
- After finishing a task, perform a self-review and record your notes under ## Self Review.
- Mark the task as done by checking the box [x].

## Tasks
- [x] **Importing packages and setting up the instance**

  ```typescript
    import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
    import { StdioServerTransport } from "@modelcontextprotocol/sdk/server/stdio.js";
    import { z } from "zod";

    const NWS_API_BASE = "https://api.weather.gov";
    const USER_AGENT = "weather-app/1.0";

    // Create server instance
    const server = new McpServer({
      name: "weather",
      version: "1.0.0",
      capabilities: {
        resources: {},
        tools: {},
      },
    });

  ```

- [] **Build Helper functions to call the Flights API** using the curl instructions provided: `instructions/search-flights-api.instructions.md`

  ```typescript
    // Helper function for making Search Flight API requests
    // Todo

    // Interface for the request body, response, and error handling
    // Todo

  ```


