// Import the Spinner component into this file and test
// that it renders what it should for the different props it can take.
import React from 'react'
import { render, fireEvent, screen, waitForElementToBeRemoved } from '@testing-library/react'
import { BrowserRouter } from 'react-router-dom'
import '@testing-library/jest-dom'
import { setupServer, getHandlers } from '../../backend/mock-server'
import Spinner from './Spinner'
import App from './App'

const renderApp = ui => {
  window.localStorage.clear()
  window.history.pushState({}, 'Test page', '/')
  return render(ui)
}
let server
beforeAll(() => {
  server = setupServer(...getHandlers())
  server.listen()
})
afterAll(() => {
  server.close()
})
beforeEach(() => {
  renderApp(<BrowserRouter><App /></BrowserRouter>)
})
afterEach(() => {
  server.resetHandlers(...getHandlers())
})

const usernameInput = () => screen.queryByPlaceholderText('Enter username');
const passwordInput = () => screen.queryByPlaceholderText('Enter password');
const loginBtn = () => screen.queryByText('Submit credentials');
const spinner = () => screen.queryByText('Please wait...');

describe('Advanced Applications', () => {
  describe('Spinner', () => {
    test(`renders`, () => {
      fireEvent.change(usernameInput(), { target: { value: 'foo' } });
      fireEvent.change(passwordInput(), { target: { value: '12345678' } })
      fireEvent.click(loginBtn());
      expect(spinner()).toBeInTheDocument();
    })
    test(`unrenders`, async () => {
      fireEvent.change(usernameInput(), { target: { value: 'foo' } });
      fireEvent.change(passwordInput(), { target: { value: '12345678' } })
      fireEvent.click(loginBtn());
      expect(spinner()).toBeInTheDocument();
      await screen.findByText("Create Article");
      fireEvent.change(screen.queryByPlaceholderText('Enter title'), { target: { value: 'Foo' } })
      expect(spinner()).not.toBeInTheDocument();
    })
  })
});