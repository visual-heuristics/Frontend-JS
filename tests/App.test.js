import { render, screen } from '@testing-library/react';
import App from '../App';
import { BrowserRouter as Router } from 'react-router-dom';

test('renders learn react link', () => {
  render(
    <Router>
      <App />
    </Router>);
  const linkElement = screen.getByText(/Quickly build an visualisation animation form problem or VFG file shows the plan and subplan for each problem./i);
  expect(linkElement).toBeInTheDocument();
});
