import React, {useContext, useCallback, useMemo} from 'react';
import {View, Text, StyleSheet} from 'react-native';
import RNPickerSelect from 'react-native-picker-select';
import SignUpContext from '../../contexts/SignUpContext';
import UnderlinedInput from '../../components/UnderlinedInput';
import PhotoInput from '../../components/PhotoInput';
import CustomSmallBtn from '../../components/CustomSmallBtn';

function SignUpInput({
  field,
  getPhoto,
  placeholder,
  smallBtn,
  picker,
  ...rest
}) {
  // 사용자가 입력한 값을 지정한 필드에 저장

  const {form, createChangeTextHandler} = useContext(SignUpContext);
  const onChangeText = createChangeTextHandler(field);
  const value = form[field];

  const generateItems = useCallback(type => {
    const items = [];
    if (type === 'height') {
      for (let i = 90; i < 249; i++) {
        items.push({
          label: `${i}cm`,
          value: i,
        });
      }
    } else if (type === 'weight') {
      for (let i = 30; i < 150; i++) {
        items.push({
          label: `${i}kg`,
          value: i,
        });
      }
    }
    return items;
  }, []);

  const heights = useMemo(() => generateItems('height'), [generateItems]);
  const wieghts = useMemo(() => generateItems('weight'), [generateItems]);
  return (
    <View style={styles.block}>
      {getPhoto && <PhotoInput />}
      {picker ? (
        <View
          style={[
            styles.innerBlock,
            field === 'height' && styles.marginBottom,
          ]}>
          <Text style={styles.text}>{placeholder}</Text>
          <View style={styles.pickerBlock}>
            <RNPickerSelect
              onValueChange={onChangeText}
              items={field === 'height' ? heights : wieghts}
              fixAndroidTouchableBug={true}
              useNativeAndroidPickerStyle={false}
              placeholder={placeholder}
              style={styles.picker}
            />
          </View>
        </View>
      ) : (
        <View style={styles.innerBlock}>
          <Text style={styles.text}>{placeholder}</Text>
          <UnderlinedInput
            placeholder={placeholder}
            onChangeText={onChangeText}
            value={value}
            {...rest}
          />
          {smallBtn && <CustomSmallBtn title="중복 확인" marginLeft />}
        </View>
      )}
    </View>
  );
}

export default SignUpInput;

const styles = StyleSheet.create({
  block: {
    alignItems: 'center',
  },
  innerBlock: {
    width: '100%',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: '#ffffff',
  },
  marginBottom: {
    marginBottom: 28,
  },
  text: {
    fontSize: 12,
    fontWeight: '500',
    marginRight: 10,
  },
  pickerBlock: {
    borderRadius: 10,
    backgroundColor: '#F9F6F2',
    flex: 1,
  },
  picker: {},
});
