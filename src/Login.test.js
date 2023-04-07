import React from 'react';
import { render, fireEvent, cleanup } from '@testing-library/react';
import axios from 'axios';
import Login from './components/pages/Login';

jest.mock('axios');

describe('Login component', () => {
  beforeEach(() => {
    global.localStorage = {
      setItem: jest.fn(),
      getItem: jest.fn(),
      removeItem: jest.fn(),
    };
  });

  afterEach(cleanup);

  test('logs in successfully and stores token in local storage', async () => {
    const response = { data: { access_token: 'testtoken' } };
    axios.post.mockResolvedValueOnce(response);
    const { getByPlaceholderText, getByText } = render(<Login />);
    fireEvent.change(getByPlaceholderText('Username'), { target: { value: 'testuser' } });
    fireEvent.change(getByPlaceholderText('Password'), { target: { value: 'testpassword' } });
    fireEvent.click(getByText('Submit'));
    expect(axios.post).toHaveBeenCalledTimes(1);
    expect(axios.post).toHaveBeenCalledWith('/token', {
      username: 'testuser',
      password: 'testpassword',
    });
    expect(global.localStorage.setItem).toHaveBeenCalledWith('token', 'testtoken');
  });

  test('displays error message on login failure', async () => {
    const error = { response: { status: 401 } };
    const { getByPlaceholderText, getByText, findByText } = render(<Login />);
    axios.post.mockRejectedValueOnce(error);
    fireEvent.change(getByPlaceholderText('Username'), { target: { value: 'testuser' } });
    fireEvent.change(getByPlaceholderText('Password'), { target: { value: 'testpassword' } });
    fireEvent.click(getByText('Submit'));
    expect(axios.post).toHaveBeenCalledTimes(1);
    expect(axios.post).toHaveBeenCalledWith('/token', {
      username: 'testuser',
      password: 'testpassword',
    });
    const errorMessage = await findByText('WRONG USERNAME OR PASSWORD');
    expect(errorMessage).toBeInTheDocument();
  });
});