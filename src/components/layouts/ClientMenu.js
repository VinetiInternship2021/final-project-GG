import React from 'react';
import { orderTypes } from '../../utils/configs';
import { PageButton } from '../Buttons';

const ClientMenu = ({ handleOrders }) => Object.keys(orderTypes).map((buttonKey) => (
  <PageButton
    key={orderTypes[buttonKey].text}
    button={orderTypes[buttonKey].text}
    onSelect={handleOrders}
    buttonClassName="grid"
    className={orderTypes[buttonKey].icon}
  />
));

export default ClientMenu;
