// import React from 'react';
import Enzyme from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

Enzyme.configure({ adapter: new Adapter() });

// if (typeof window !== 'undefined') {
//   window.React = React;
//   window.localStorage = (function storageMock() {
//     const storage = {};
//     return {
//       setItem(key, value) {
//         storage[key] = value || '';
//       },
//       getItem(key) {
//         return key in storage ? storage[key] : null;
//       },
//       removeItem(key) {
//         delete storage[key];
//       },
//       get length() {
//         return Object.keys(storage).length;
//       },
//       key(i) {
//         const keys = Object.keys(storage);
//         return keys[i] || null;
//       },
//     };
//   }());
// }
