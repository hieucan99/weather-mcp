# weather-mcp

## Project Overview

`weather-mcp` is a Model Context Protocol (MCP) server that provides weather data for the top cities using the AccuWeather API. It exposes a tool to search for current weather conditions in the top N cities, supporting multiple languages.

## Project Structure

```
weather-mcp/
├── package.json
├── README.md
├── weather/
│   ├── tsconfig.json
│   ├── build/
│   │   └── index.js
│   └── src/
│       └── index.ts
```


## Tool and Status

| Tool Name           | Description                              | Parameters                                                                 | Returns                                                                                       | Status   |
|---------------------|------------------------------------------|----------------------------------------------------------------------------|-----------------------------------------------------------------------------------------------|----------|
| `search_top_cities` | Search - Current conditions for top cities | `top_city` (number): Number of top cities to retrieve (1-100, default: 50)<br/>`language` (string): Language code (e.g., `en`, `vi`) | List of cities with weather details: name, country, timezone, geolocation, observation time, weather, precipitation, day/night, temperature, and links. | Active   |


## How to Setup

1. **Clone the repository:**
	```powershell
	git clone https://github.com/hieucan99/weather-mcp.git
	cd weather-mcp
	```
2. **Install dependencies:**
	```powershell
	npm install
	```
3. **Add your server to VS Code MCP extension:**
	- Install the [MCP extension for VS Code](https://marketplace.visualstudio.com/items?itemName=modelcontextprotocol.mcp-vscode).
	- Open VS Code settings (`settings.json`) and add your server to the `mcpServers` key:
	  ```json
        {
            "servers": {
                "my-mcp-server-b401af69": {
                    "type": "stdio",
                    "command": "node",
                    "args": [
                        "index.ts file path"
                    ],
                    "env": {
                        "ACCUWEATHER_API_KEY": ""
                    }
                }
            }
        }
	  ```

## How to Run

1. **Start the MCP server manually (optional):**
	```powershell
	node weather/build/index.js
	```
	Or, let the VS Code MCP extension launch it automatically via the `mcpServers` configuration above.
2. The server will run using stdio transport and expose the `search_top_cities` tool for use by MCP clients in VS Code.

For more details, see the source code in `weather/src/index.ts`.

## Next Phase: Export as .exe for MCP Connection

To make the MCP server easier to distribute and run on Windows, you can export it as a standalone `.exe` file. This allows users to connect to the MCP server without needing Node.js installed.

- **Update your MCP server configuration in VS Code:**
- Change the `command` in your `mcpServers` config to point to the `.exe` file:
    ```json
    {
        "servers": {
            "my-mcp-server-b401af69": {
                "type": "stdio",
                "command": "./weather-mcp.exe",
                "env": {
                    "ACCUWEATHER_API_KEY": ""
                }
            }
        }
    }
    ```

Now, the MCP extension can launch your server directly as a Windows executable.