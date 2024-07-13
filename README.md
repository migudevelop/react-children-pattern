<div align="center">

# react-children-pattern

</div>

React utilities for checking allowed components and retrieving specific children

## Installation

```sh
  # NPM
  pnpm install react-children-pattern

  # NPM
  npm install react-children-pattern

  # YARN
  yarn add react-children-pattern
```

## Hooks

### useChildrenOfType

Returns the childs matching the provided function component

```ts
import { useChildrenOfType } from "react-children-pattern"

function Child({children}){
  return <span>{children}</span>
}

function OtherChild({children}){
  return <span>{children}</span>
}

function Wrapper({children}){
  const child = useChildrenOfType(Child, children)
  return <div>children</div>
}

<Wrapper>
  <Child>Child 1</Child>
  <OtherChild>Other Child</OtherChild>
  <Child>Child 2</Child>
</Wrapper>

// Result
<div>
  <span>Child 1</span>
  <span>Child 2</span>
</div>
```

### useChildOfType

Returns the first child matching the provided function component

```ts
import { useChildOfType } from "react-children-pattern"

function Child({children}){
  return <span>{children}</span>
}

function OtherChild({children}){
  return <span>{children}</span>
}

function Wrapper({children}){
  const child = useChildOfType(Child, children)
  return <div>children</div>
}

<Wrapper>
  <Child>Child 1</Child>
  <OtherChild>Other Child</OtherChild>
  <Child>Child 2</Child>
</Wrapper>

// Result
<div>
  <span>Child 1</span>
</div>
```

### useCheckChildrenTypes

Throws an error if the children don't match the provided function components

```ts
import { useCheckChildrenTypes } from "react-children-pattern"

function Child({children}){
  return <span>{children}</span>
}

function OtherChild({children}){
  return <span>{children}</span>
}

function InvalidChild({children}){
  return <span>{children}</span>
}

function Wrapper({children}){
  useCheckChildrenTypes([Child, OtherChild], children)
  return <div>children</div>
}

// Throw this error: Invalid child type InvalidChild. Expected one of Child, OtherChild.
<Wrapper>
  <InvalidChild>Other Child</InvalidChild>
</Wrapper>


// Valid types
<Wrapper>
  <Child>Child 1</Child>
</Wrapper>

// Result
<div>
  <span>Child 1</span>
</div>
```

## License

[MIT License](/LICENSE)

<div align="center">

Copyright (c) 2024 Migudevelop

</div>
