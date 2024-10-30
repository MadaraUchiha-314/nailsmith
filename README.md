# nailsmith

A minimal example of how we can do SSR with module federation

## Architecture

```mermaid
sequenceDiagram
    participant browser
    participant bff
    participant shell
    participant remote-a
    browser-->>bff: Load web page
    bff-->>shell: load remote entry 
    shell-->>remote-a: load remote entry
    remote-a-->>shell: 
    shell-->>bff: 
    bff-->>bff: React render
    bff-->>browser: Server rendered HTML
    browser-->>browser: React hydration
```

## Local dev

```sh
# Install deps
npm i
# Run the shell first on port 3001
npm run dev --workspace packages/shell
# Run the node server for the backend on port 3000
# Load this url: http://localhost:3000/
npm run dev --workspace packages/bff
```
