import React, { ComponentProps } from 'react';

import { QueryWizard } from '@app/QueryWizard/QueryWizard';
import { Story } from '@storybook/react';

export default {
  title: 'Components/Wizard',
  component: QueryWizard,
};

const Template: Story<ComponentProps<typeof Wizard>> = (args) => (
  <QueryWizard {...args} />
);

export const FirstStory = Template.bind({});
FirstStory.args = {
  /*👇 The args you need here will depend on your component */
};
