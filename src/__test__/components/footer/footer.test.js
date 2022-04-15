import React from 'react';
import renderer from 'react-test-renderer';
import Footer from '../../../component/footer/Footer';

it('Footer text is render', () => {
  const footerText = renderer.create(<Footer></Footer>)
  expect(footerText).toMatchSnapshot();
});