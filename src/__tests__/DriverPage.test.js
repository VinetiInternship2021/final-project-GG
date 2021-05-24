import { render } from '@testing-library/react';
import '@testing-library/jest-dom';
// import axios from 'axios';
import ReactDom from 'react-dom';
import Enzyme, { shallow } from 'enzyme';
import Adapter from '@wojtekmaj/enzyme-adapter-react-17';
import * as React from 'react';
import { Provider } from 'react-redux';
import store from '../redux/store';
import DriverPage from '../components/Driver/DriverPage';

jest.mock('axios');

Enzyme.configure({ adapter: new Adapter() });
let page;
beforeAll(() => {
  page = <Provider store={store}><DriverPage /></Provider>;
});

it('should renders DriverPage without crashing', () => {
  const div = document.createElement('div');
  ReactDom.render(page, div);
  ReactDom.unmountComponentAtNode(div);
});

it('should check title text content', () => {
  const { getByTestId } = render(page);
  expect(getByTestId('title')).toHaveTextContent('Driver Map');
});

it('should render DriverPage', () => {
  const wrapper = shallow(page);
  expect(wrapper.exists()).toBe(true);
});
