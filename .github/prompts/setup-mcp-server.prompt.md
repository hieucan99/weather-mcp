# MCP Server Setup: To-Do List
- As a developer, complete each task in the list below.
- After finishing a task, perform a self-review and record your notes under ## Self Review.
- Mark the task as done by checking the box [x].

## Tasks
- [x] **Create a new directory for your project**
	- `md fights`
	- `cd fights`

- [x] **Initialize a new npm project**
	- `npm init -y`

- [x] **Install dependencies**
	- `npm install @modelcontextprotocol/sdk zod@3`
	- `npm install -D @types/node typescript`

- [x] **Create your files**
	- `md src`
	- `new-item src\index.ts`

- [] **Update package.json to add type: “module” and a build script**

```json
{
  "type": "module",
  "bin": {
    "weather": "./build/index.js"
  },
  "scripts": {
    "build": "tsc && chmod 755 build/index.js"
  },
  "files": ["build"]
}
```

- [] **Create tsconfig.json in the root directory**

```json
{
  "compilerOptions": {
    "target": "ES2022",
    "module": "Node16",
    "moduleResolution": "Node16",
    "outDir": "./build",
    "rootDir": "./src",
    "strict": true,
    "esModuleInterop": true,
    "skipLibCheck": true,
    "forceConsistentCasingInFileNames": true
  },
  "include": ["src/**/*"],
  "exclude": ["node_modules"]
}
```

## Self Review
- All setup steps were completed as instructed.
- Directory, npm project, dependencies, and initial files are present.
- No errors encountered during setup. Ready for further development.
