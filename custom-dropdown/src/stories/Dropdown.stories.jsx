import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';
import {Dropdown} from "../components";

export default {
  title: 'Components/Dropdown',
  component: Dropdown,
  argTypes: {
    trigger: { control: { type: 'text' } },
    components: { control: { type: null } }
  },
};

const Template = (args) => <div className="dropdown-story-container is-centered">
  <Dropdown {...args} />
</div>;

const WideTemplate = (args) => <div className="dropdown-story-container is-centered">
  <style>
    {`
      html {
        overflow: auto;
      }
      body {
        width: 2000px;
        height: 2000px;
      }
    `}
  </style>
  <Dropdown {...args} />
</div>;

export const Default = Template.bind({});
Default.args = {
  children: "CONTENT"
};

export const Styled = Template.bind({});
Styled.args = {
  children: "CONTENT",
  trigger: "OPEN",
  options: {
    "trigger": { "replaceClassName": "button is-primary" },
    "panel": {
      "replaceClassName": "box"
    }
  }
};

export const Scrolled = WideTemplate.bind({});
Scrolled.args = {
  children: "CONTENT",
  trigger: "OPEN",
  options: {
    "trigger": { "replaceClassName": "button is-primary" },
    "panel": {
      "replaceClassName": "box"
    }
  }
};
Scrolled.parameters = {
  viewport: {
    defaultViewport: 'widescreen',
    viewports: {
      widescreen: {
        name: 'Scrollable Area',
        styles: {
          width: '100%',
          height: '100%'
        }
      }
    }
  }
};
