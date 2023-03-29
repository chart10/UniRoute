import React from 'react';
import { render, screen } from '@testing-library/react';
import Map from '../components/Map';
import axios from 'axios';

jest.mock('axios');

const dummyDirectionsRequest = {};

test('Should be able to display a route on the map', async () => {
  render(<Map />);

  // Simulate a user running a Get Route search
});
