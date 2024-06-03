import { Text, View } from 'react-native';
import styled from 'styled-components/native';
import StyledSwitch from './StyledSwitch';
import { useDispatch } from 'react-redux';
import { initialState } from '../store/reducer';
import { useSelector } from 'react-redux';
import { RootState } from '../store';

const FuzzySearchToggle = () => {
  const dispatch = useDispatch();
  const isFuzzySearch = useSelector((state: RootState) => state.isFuzzySearch);

  const handleSetFuzzySearch = (val: boolean) => {
    dispatch({ type: 'SET_FUZZY_SEARCH', payload: val });
    dispatch({ type: 'SET_SORT', payload: initialState.sort });
    dispatch({ type: 'SET_USERS', payload: [...initialState.listUsers] });
    dispatch({ type: 'SET_USERNAME', payload: '' });
  };

  return (
    <SwitchContainer>
      <Text style={{ marginRight: 5 }}>Fuzzy Search</Text>
      <StyledSwitch value={isFuzzySearch} onValueChange={handleSetFuzzySearch} />
    </SwitchContainer>
  );
};

const SwitchContainer = styled(View)`
  flex-direction: row;
  justify-content: flex-end;
  align-items: center;
  width: 100%;
  margin-top: 10px;
  margin-bottom: 10px;
`;

export default FuzzySearchToggle;
