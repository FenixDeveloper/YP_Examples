import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';
import {CommandEventHandler, Menu} from "../components";

export default {
  title: 'Components/Menu',
  component: Menu,
  argTypes: {
    onCommand: { control: { type: null }, action: true }
  },
};

const Template = (args) => <div className="dropdown-story-container is-centered">
  <Menu {...args} />
</div>;

const command = (event, item) => {
  alert(`clicked: ${item.label}`);
};

const items = [
  { label: 'Item 1', icon: 'fa-solid fa-user', command },
  { label: 'Item 1', icon: 'fa-solid fa-user', className: "has-background-primary", labelClassName: "is-uppercase",  command },
  { label: 'Item 1', icon: 'fa-solid fa-user' },
  { label: 'Item 1' },
  { label: 'Item 1', icon: 'fa-solid fa-user', command },
  { label: 'Item 1', command }
];

export const Default = Template.bind({});
Default.args = {
  items
};

export const Styled = Template.bind({});
Styled.args = {
  className: "menu panel has-background-white",
  items
};
Styled.parameters = {
  backgrounds: {
    default: 'dark'
  }
};


