// Q. How can you optimize the performance of a React application?


// 1. Use the useCallback and useMemo Hooks
import React, { useCallback, useMemo } from 'react';
const MyComponent = ({ data }) => {
  const handleClick = useCallback(() => {
    // Handle click
  }, [/* dependencies */]);

  const computedValue = useMemo(() => {
    // Expensive calculation
    return result;
  }, [/* dependencies */]);

  return <button onClick={handleClick}>{computedValue}</button>;
};


// 2. Avoid Inline Functions in JSX
const MyComponent2 = () => {
  const handleClick = () => {
    // Handle click
  };

  return <button onClick={handleClick}>Click Me</button>;
}


// 3. Optimize List Rendering with Keys
const MyComponent3 = () => {
  const items = [/* array of items */];
  return (
    <ul>
      {items.map(item => (
        <li key={item.id}>{item.name}</li>
      ))}
    </ul>
  );
}

// 4. Code Splitting
import React, { Suspense, lazy } from 'react';
const LazyComponent = lazy(() => import('./LazyComponent'));
function MyComponent4() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <LazyComponent />
    </Suspense>
  );
}

// 5. Optimize Context Usage
const MyContext = React.createContext();

function MyProvider({ children }) {
  const [value, setValue] = React.useState(/* initial value */);

  return (
    <MyContext.Provider value={value}>
      {children}
    </MyContext.Provider>
  );
}


// 6. Use Virtualization for Large Lists
// npm install react-window
import { FixedSizeList as List } from 'react-window';

function MyComponent5() {
  return (
    <List
      height={150}
      itemCount={1000}
      itemSize={35}
      width={300}
    >
      {
        ({ index, style }) => (
          <div style={style}>Item {index}</div>
        )
      }
    </List>
  );
}

// 7. Debounce and Throttle Expensive Operations
// npm install lodash

import React, { useCallback } from 'react';
import debounce from 'lodash/debounce';

function MyComponent() {
  const handleScroll = useCallback(debounce(() => {
    // Handle scroll
  }, 300), []);

  return <div onScroll={handleScroll}>Content</div>;
}
/*

Debounce and throttle are techniques used to control the rate at which a function executes, especially when dealing with frequent events like scrolling, resizing, or typing.

Debounce
Purpose: Ensures a function is executed only after a certain period of inactivity.
Delays the execution of the function until after a specified delay period has passed since the last call. If the function is called again before the delay period ends, the timer resets.

Throttle
Purpose: Limits the rate at which a function can be executed.
Ensures a function is executed at most once per specified time interval, regardless of how many times it’s called.
*/


// 8. Minimize Re-renders with useReducer
import React, { useReducer } from 'react';

function reducer(state, action) {
  // Handle state updates
}

function MyComponent() {
  const [state, dispatch] = useReducer(reducer, /* initial state */);

  return <div>{/* Render based on state */}</div>;
}


// 9. Lazy Loading Images
// npm install --save react-lazyload
// Lazy loading allows you to delay the loading of images until they are visible to the user instead of loading all the images on page load.
import React from 'react';
import LazyLoad from 'react-lazyload';

const MyLazyLoadedImage = ({ src, alt }) => {
  return (
    <LazyLoad height={200} offset={100}>
      {/* The height and offset props control when the image should start loading */}
      <img src={src} alt={alt} />
    </LazyLoad>
  );
};

export default MyLazyLoadedImage;


// 10. React Fragments
function BookShelf() {
  return (
    <>
      <Book title="React for Beginners" />
      <Book title="Mastering Redux" />
      <Book title="JavaScript Essentials" />
    </>
  );
}


/*
11. Web Workers
JavaScript operates as a single-threaded application designed to handle synchronous tasks.
Web Workers serve as a solution to alleviate the burden on the main thread. They allow the execution of scripts in the background on a separate thread, distinct from the main JavaScript thread.
*/

// worker.js
self.onmessage = function(event) {
  var input = event.data;
  var result = performHeavyComputation(input);
  postMessage(result);
};

function performHeavyComputation(input) {
  // Insert your heavy computation logic here
  return input *   2; // Just a placeholder operation
}


import React, { useEffect, useRef } from 'react';

function MyComponent() {
  const workerRef = useRef();

  useEffect(() => {
    // Initialize the worker
    workerRef.current = new Worker('path-to-your-worker-file.js');

    // Handle incoming messages from the worker
    workerRef.current.onmessage = (event) => {
      console.log('Message received from worker:', event.data);
    };

    // Cleanup the worker when the component unmounts
    return () => {
      workerRef.current.terminate();
    };
  }, []);

  // Function to send a message to the worker
  const sendMessageToWorker = (message) => {
    workerRef.current.postMessage(message);
  };
  
  return (
    <></>
  );
}