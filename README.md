# USDU Finance App

Application for USDU with custom functions to interact with the protocol.

## Project Structure

### Pages & Components Pattern

This project follows a clean separation of concerns where **pages** act as simple route handlers and **components/sections** contain the actual UI logic and implementation.

#### Pattern Overview

```
pages/
  index.tsx          → Import and render section components
  governance.tsx     → Import and render Governance component

components/
  sections/
    Hero.tsx             → Home page hero section
    ProtocolOverview.tsx → Protocol overview section
    Governance.tsx       → Governance page implementation
```

#### Why This Pattern?

1. **Clean Separation**: Pages only handle routing, components handle UI
2. **Reusability**: Section components can be reused across different pages
3. **Maintainability**: All UI logic is in one place (components/sections)
4. **Testability**: Components can be tested independently of routing

#### Example

**pages/governance.tsx** (Simple, just routing):
```tsx
import Governance from '@/components/sections/Governance';

export default function GovernancePage() {
  return <Governance />;
}
```

**components/sections/Governance.tsx** (Complex, contains all logic):
```tsx
export default function Governance() {
  const { modules, history } = useModuleDataAll();

  return (
    <div className="container mx-auto px-4 py-12">
      {/* All UI implementation here */}
    </div>
  );
}
```

### Hooks

Custom hooks are organized in the `hooks/` directory:

- `useModulesData.ts` - Fetch and manage stablecoin module data from the Ponder indexer
  - `useModulesData()` - Get all current modules
  - `useModuleDataAll()` - Get all modules with complete history
  - `useModuleHistory()` - Get history for a specific module
  - `useModuleByAddress()` - Get specific module with its history

### Data Fetching with Apollo Client

The app uses Apollo Client for GraphQL data fetching with smart caching:

- **Cache Strategy**: `cache-and-network` policy
  - Returns cached data immediately if available
  - Fetches fresh data in background to update cache
  - Manual `refetch()` always fetches fresh data

- **Provider Setup**: See `lib/graphql/provider.tsx`

### Styling

- Uses Tailwind CSS with custom design tokens
- Color palette: `usdu-orange`, `usdu-black`, `usdu-bg`, `usdu-surface`
- Consistent spacing and component patterns throughout
