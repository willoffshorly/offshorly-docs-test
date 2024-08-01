# Basic Bootstrap Navigation Bar in React

This guide demonstrates how to create a basic Bootstrap navigation bar using React. We'll use React Bootstrap, which provides pre-built Bootstrap components for React applications.

## Installation

First, install the necessary dependencies:

```bash
npm install react-bootstrap bootstrap
```

## Usage

Import the required components and add the Bootstrap CSS in your main App.js or index.js file:

```jsx
import 'bootstrap/dist/css/bootstrap.min.css';
```

Now, create a new component for your navigation bar:

```jsx
import React from 'react';
import { Navbar, Nav, Container } from 'react-bootstrap';

function NavigationBar() {
  return (
    <Navbar bg="light" expand="lg">
      <Container>
        <Navbar.Brand href="#home">React-Bootstrap</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            <Nav.Link href="#home">Home</Nav.Link>
            <Nav.Link href="#link">Link</Nav.Link>
            <Nav.Link href="#about">About</Nav.Link>
            <Nav.Link href="#contact">Contact</Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default NavigationBar;
```

## Explanation

- We import the necessary components from `react-bootstrap`.
- The `Navbar` component is the main container for the navigation bar.
- `Container` helps in centering and providing proper padding to the navbar contents.
- `Navbar.Brand` is used for the website logo or name.
- `Navbar.Toggle` and `Navbar.Collapse` are used to create a responsive navbar that collapses on smaller screens.
- `Nav` and `Nav.Link` components are used to create the navigation links.

## Implementation

To use this navigation bar in your React application, import and render the `NavigationBar` component in your main App component or any other component where you want the navbar to appear:

```jsx
import React from 'react';
import NavigationBar from './NavigationBar';

function App() {
  return (
    <div>
      <NavigationBar />
      {/* Other components */}
    </div>
  );
}

export default App;
```

This will create a basic Bootstrap navigation bar with a brand name and four navigation links. The navbar is responsive and will collapse into a hamburger menu on smaller screens.