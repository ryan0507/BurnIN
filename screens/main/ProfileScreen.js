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
  const [nickname, setNickname] = useState('');
  const [photo, setPhoto] = useState('');
  useEffect(() => {
    userStorages.get().then(userInfo => {
      setNickname(userInfo.nickname);
      setPhoto('data:image/;base64,' + userInfo.photo.assets[0].base64);
    });
  }, []);
  return (
    <View style={styles.block}>
      <Image source={{uri: photo}} style={styles.profileimg} />
      <Text style={styles.text}>{nickname}</Text>
      <CustomSmallBtn
        title="프로필 편집"
        wide
        onPress={() => {
          navigation.navigate('ProfileStack', {
            screen: 'ProfileUpdateScreen',
          });
        }}
      />
      <WhiteBlock ver2>
        <View style={styles.btnsBlock}>
          <CustomBtn
            onPress={() => {
              navigation.navigate('ProfileStack', {
                screen: 'AnnouncementScreen',
              });
            }}>
            <Icon name="circle-notifications" size={20} />
            <Text>공지사항</Text>
          </CustomBtn>
          <CustomBtn
            onPress={() => {
              navigation.navigate('ProfileStack', {
                screen: 'EventScreen',
              });
            }}>
            <Icon name="thumb-up" size={20} />
            <Text>이벤트</Text>
          </CustomBtn>
          <CustomBtn
            onPress={() => {
              navigation.navigate('ProfileStack', {
                screen: 'SettingScreen',
              });
            }}>
            <Icon name="settings" size={20} />
            <Text>설정</Text>
          </CustomBtn>
        </View>
      </WhiteBlock>
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
  btnsBlock: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: '100%',
    paddingHorizontal: 36,
  },

  profileimg: {
    width: 100,
    height: 100,
    borderRadius: 50,
    marginBottom: 15,
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
