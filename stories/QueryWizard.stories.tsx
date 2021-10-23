import React, { ComponentProps } from 'react';

import { QueryWizard } from '@app/QueryWizard/QueryWizard';
import { Story } from '@storybook/react';
import { Provider } from 'react-redux';
import store from '../src/redux/store';

export default {
  title: 'Components/Wizard',
  component: QueryWizard,
};

const Template: Story<ComponentProps<typeof QueryWizard>> = (args) => (
  <Provider store={store}>
    <QueryWizard {...args} />
  </Provider>
);

export const FirstStory = Template.bind({});
FirstStory.args = {
  /*👇 The args you need here will depend on your component */
};
