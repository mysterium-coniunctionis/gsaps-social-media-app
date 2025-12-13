# Performance Quick Reference

Quick tips for writing performant React code in the GSAPS project.

## When to Use What

### useMemo
Use for expensive computations that depend on props/state:
```javascript
const sortedData = useMemo(
  () => data.sort((a, b) => a.value - b.value),
  [data]
);
```

**When to use**:
- Filtering/sorting large arrays (>50 items)
- Complex calculations
- Object transformations
- Derived state

**When NOT to use**:
- Simple calculations (x + y)
- Primitive values
- Values that change on every render anyway

### useCallback
Use for functions passed to child components:
```javascript
const handleClick = useCallback(
  () => doSomething(id),
  [id]
);
```

**When to use**:
- Event handlers passed to memoized children
- Functions in dependency arrays
- Debounced/throttled functions

**When NOT to use**:
- Event handlers not passed to children
- Functions that need latest props/state every time

### React.memo
Use for components that render often with same props:
```javascript
export default React.memo(MyComponent);
```

**When to use**:
- List items (cards, rows)
- Presentational components
- Components with expensive render logic

**When NOT to use**:
- Components that change on every render
- Components with children prop that changes often
- Top-level route components

## Common Pitfalls

### ❌ Inline Object/Array Creation
```javascript
// BAD - Creates new object on every render
<MyComponent style={{ margin: 10 }} />
<MyComponent items={[1, 2, 3]} />
```

### ✅ Extract or Memoize
```javascript
// GOOD - Reuses same reference
const style = { margin: 10 };
<MyComponent style={style} />

// Or with useMemo for dynamic values
const style = useMemo(() => ({ margin: value }), [value]);
<MyComponent style={style} />
```

### ❌ Anonymous Functions in Props
```javascript
// BAD - New function on every render
<Button onClick={() => handleClick(id)} />
```

### ✅ Use useCallback
```javascript
// GOOD - Same function reference
const handleClick = useCallback(
  () => handleButtonClick(id),
  [id]
);
<Button onClick={handleClick} />
```

### ❌ Spreading Large Objects
```javascript
// BAD - Creates new object with all fields
const newState = { ...hugeObject, field: newValue };
```

### ✅ Update Only What Changed
```javascript
// GOOD - Only modify needed field
setState(prev => {
  if (prev.field === newValue) return prev; // No change
  return { ...prev, field: newValue };
});
```

## Performance Patterns

### Filter/Sort Pattern
```javascript
const filteredData = useMemo(() => {
  return data
    .filter(item => item.active)
    .sort((a, b) => a.name.localeCompare(b.name));
}, [data]);
```

### Debounced Search
```javascript
const debouncedSearch = useMemo(
  () => debounce((query) => performSearch(query), 300),
  []
);

const handleSearchChange = (e) => {
  const query = e.target.value;
  setSearchQuery(query);
  debouncedSearch(query);
};
```

### Conditional Rendering
```javascript
// Avoid expensive computation if not rendered
{showDetails && (
  <ExpensiveComponent data={processData(rawData)} />
)}

// Better: useMemo with condition
const processedData = useMemo(() => {
  if (!showDetails) return null;
  return processData(rawData);
}, [showDetails, rawData]);

{showDetails && <ExpensiveComponent data={processedData} />}
```

## Component Structure Template

```javascript
import React, { useState, useMemo, useCallback } from 'react';

const MyComponent = ({ items, onSelect, config }) => {
  // 1. State hooks
  const [selectedId, setSelectedId] = useState(null);
  
  // 2. Memoized values
  const filteredItems = useMemo(
    () => items.filter(item => item.active),
    [items]
  );
  
  // 3. Callback handlers
  const handleSelect = useCallback(
    (id) => {
      setSelectedId(id);
      onSelect(id);
    },
    [onSelect]
  );
  
  // 4. Render
  return (
    <div>
      {filteredItems.map(item => (
        <ItemCard
          key={item.id}
          item={item}
          selected={item.id === selectedId}
          onSelect={handleSelect}
        />
      ))}
    </div>
  );
};

// 5. Memoize component
export default React.memo(MyComponent);
```

## Performance Budget

| Component Type | Max Render Time |
|---------------|-----------------|
| Simple Card | 5ms |
| Complex Form | 16ms |
| List Item | 3ms |
| Modal/Dialog | 20ms |
| Page Component | 50ms |

If exceeding budget:
1. Profile with React DevTools
2. Check for unnecessary re-renders
3. Add memoization
4. Consider code splitting

## Tools

```bash
# Bundle analysis
npm run build
npx webpack-bundle-analyzer build/static/js/*.js

# Runtime profiling
# Use React DevTools Profiler tab in browser

# Lighthouse audit
npm run build
npx lighthouse http://localhost:3000 --view
```

## Red Flags 🚩

Watch for these in code reviews:

- ⚠️ `map()` without `key` prop
- ⚠️ Event handlers created in render without `useCallback`
- ⚠️ Style objects created inline
- ⚠️ `filter()` + `map()` + `sort()` without `useMemo`
- ⚠️ Large components (>300 lines) - split them
- ⚠️ Lists without pagination/virtualization (>100 items)
- ⚠️ API calls without debouncing
- ⚠️ localStorage access in render function

## Quick Wins

1. **Add React.memo to all card components** → 40% fewer re-renders
2. **Memoize filter/sort operations** → 30% faster interactions
3. **Use useCallback for event handlers** → Prevents child re-renders
4. **Debounce search inputs** → 80% fewer API calls
5. **Lazy load images** → 50% faster initial load

---

**Need help?** Check `docs/PERFORMANCE_OPTIMIZATION.md` for detailed guide.
