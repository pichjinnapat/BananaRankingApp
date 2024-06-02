import React, { FC, useState } from 'react';
import { Switch, SwitchProps } from 'react-native';

type StyledSwitchProps = SwitchProps;

const StyledSwitch: FC<StyledSwitchProps> = ({ value, onValueChange, ...props }) => {
  return (
    <Switch
      trackColor={{ false: '#767577', true: '#3e4b7b' }}
      thumbColor={value ? '#748ef4' : '#f4f3f4'}
      ios_backgroundColor='#3e3e3e'
      onValueChange={onValueChange}
      value={value}
      {...props}
    />
  );
};

export default StyledSwitch;
