import React from 'react';
import renderer from 'react-test-renderer';
import Loader from '../../../component/loader/Loader';

it('When Loader is render', () => {
  const loaderText = renderer.create(<Loader />)
  expect(loaderText).toMatchSnapshot();
});