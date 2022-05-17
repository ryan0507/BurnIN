import React, {useState, useEffect} from 'react';
import {View, Image, Text, StyleSheet} from 'react-native';
import Pressable from 'react-native/Libraries/Components/Pressable/Pressable';
import CustomSmallBtn from '../../components/CustomSmallBtn';
import WhiteBlock from '../../components/WhiteBlock';
import Icon from 'react-native-vector-icons/MaterialIcons';
import {useNavigation} from '@react-navigation/native';
import userStorages from '../../storages/userStorages';

function ProfileScreen() {
  const navigation = useNavigation();
  const [id, setId] = useState();
  const [weight, setWeight] = useState();
  const [height, setHeight] = useState();
  useEffect(() => {
    userStorages.get().then(savedInfo => {
      setId(savedInfo.id);
      setWeight(savedInfo.weight);
      setHeight(savedInfo.height);
    });
  }, []);
  return (
    <View style={styles.block}>
      <Text style={styles.text}>아이디: {id}</Text>
      <Text style={styles.text}>키: {height}</Text>
      <Text style={styles.text}>몸무게: {weight}</Text>
      <CustomSmallBtn
        title="프로필 편집"
        wide
        onPress={() => {
          navigation.navigate('ProfileStack', {
            screen: 'ProfileUpdateScreen',
          });
        }}
      />
    </View>
  );
}

export default ProfileScreen;

const styles = StyleSheet.create({
  block: {
    paddingTop: 48,
    alignItems: 'center',
    position: 'relative',
    flex: 1,
    paddingHorizontal: 25,
    backgroundColor: '#ffffff',
  },
  text: {
    fontSize: 12,
    fontWeight: '600',
    marginBottom: 15,
  },
});

function CustomBtn({children, onPress}) {
  return (
    <View style={{flex: 1}}>
      <Pressable style={{alignItems: 'center'}} onPress={onPress}>
        {children}
      </Pressable>
    </View>
  );
}
