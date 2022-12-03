import { render, screen, cleanup, fireEvent } from '@testing-library/react';
import StyleSelector from '/Users/seanmcdaniel/hack-reactor-rpp2207/fec/rpp2207-fec/client/src/components/Overview/StylesSelector/StyleSelector.jsx';
import chosenStyleData from './mockData.js';
import React from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  useSearchParams
} from "react-router-dom";
const fetch = require('node-fetch');
// globalThis.fetch = fetch
// global.window = Object.create(window);

test('renders Style Selector information', async () => {
  render(<StyleSelector
    chosenStyle={ chosenStyleData.results[0] }
    styles={ chosenStyleData.results } />);
  const styleSelectorInfo = screen.getByRole('heading');
  expect(styleSelectorInfo).toBeInThenDocument();
})

// describe('StyleSelector component', () => {
//   it('renders the correct style information passed to it', async () => {
//     const { container } = render(<StyleSelector chosenStyle={chosenStyleData} />,
//     {wrapper: Router});

//     await waitFor(() => {
//       expect(container.getElementById('style-info').length).toBe(1);
//       expect(container.getElementById('style-info').innerText).toBe('140.00 STYLE > Forest Green & Black');

//     })
//   })
// })

// test('getAllProducts returns correct data from API', async () => {
//   var actual = await Overview.getAllProducts();
//   var expected = {
//     "id": 71697,
//     "campus": "hr-rpp",
//     "name": "Camo Onesie",
//     "slogan": "Blend in to your crowd",
//     "description": "The So Fatigues will wake you up and fit you in. This high energy camo will have you blending in to even the wildest surroundings.",
//     "category": "Jackets",
//     "default_price": "140.00",
//     "created_at": "2022-05-11T19:38:15.373Z",
//     "updated_at": "2022-05-11T19:38:15.373Z"
//   };
//   expect(actual[0]).toStrictEqual(expected);
// });

// test('getProductById returns correct data for specific product id', () => {
//   var expected = {
//     "id": 71698,
//     "campus": "hr-rpp",
//     "name": "Bright Future Sunglasses",
//     "slogan": "You've got to wear shades",
//     "description": "Where you're going you might not need roads, but you definitely need some shades. Give those baby blues a rest and let the future shine bright on these timeless lenses.",
//     "category": "Accessories",
//     "default_price": "69.00",
//     "created_at": "2022-05-11T19:38:15.373Z",
//     "updated_at": "2022-05-11T19:38:15.373Z",
//     "features": [
//         {
//             "feature": "Lenses",
//             "value": "Ultrasheen"
//         },
//         {
//             "feature": "UV Protection",
//             "value": null
//         },
//         {
//             "feature": "Frames",
//             "value": "LightCompose"
//         }
//     ]
// };
// Overview.getProductById(71698)
//   .then(result => {
//     expect(result).toStrictEqual(expected);
//   })
//   .catch(err => {
//     console.log(err);
//   });
// });