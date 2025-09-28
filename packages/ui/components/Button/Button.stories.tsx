import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';
import { Button } from './Button';

export default {
  title: 'UI/Button',
  component: Button,
  argTypes: {
    onClick: { action: 'clicked' },
    disabled: {
      control: 'boolean',
      description: '버튼의 비활성화 상태를 설정합니다',
    },
    isLoading: {
      control: 'boolean',
      description: '버튼의 로딩 상태를 설정합니다',
    },
    children: {
      control: 'text',
      description: '버튼의 내용을 설정합니다',
    },
  },
} as ComponentMeta<typeof Button>;

const Template: ComponentStory<typeof Button> = args => <Button {...args} />;

export const Default = Template.bind({});
Default.args = {
  children: '다음',
};

export const Disabled = Template.bind({});
Disabled.args = {
  children: '다음',
  disabled: true,
};

export const Loading = Template.bind({});
Loading.args = {
  children: '다음',
  isLoading: true,
};

export const ButtonStates = () => (
  <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
    <Button>BtnDefault</Button>
    <Button disabled>BtnDisabled</Button>
    <Button isLoading>BtnLoading</Button>
  </div>
);
