/*
 * Copyright 2022 by s4y.solutions
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *      http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

import React from 'react';
// import '@testing-library/react/cleanup-after-each';
// import '@testing-library/jest-dom/extend-expect';
import {render} from '@testing-library/react';
import App from '../App';

describe('<App />', () => {
  test('true is truthy', () => {
    expect(true).toBe(true);
  });

  test('false is falsy', () => {
    expect(false).toBe(false);
  });

  test('render', () => {
    render(<App />);
    /*
    const { getByText } = render(<App />);
    expect(getByText('Hi Alejandro Roman')).toBeNull();

     */
  });
});