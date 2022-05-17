import React, {useState, useLayoutEffect} from 'react';
import {View, Text, StyleSheet, Linking, Image} from 'react-native';
import userStorages from '../../storages/userStorages';

function ProfileScreen() {
  const [id, setId] = useState();
  const [weight, setWeight] = useState();
  const [height, setHeight] = useState();
  useLayoutEffect(() => {
    const fetchUserData = async () => {
      await userStorages.get().then(savedInfo => {
        const data = JSON.parse(savedInfo);
        setId(data.id);
        setWeight(data.weight);
        setHeight(data.height);
      });
    };
    fetchUserData();
  }, []);
  return (
    <View style={styles.block}>
      <View style={styles.userBlock}>
        <Text style={styles.text}>아이디: {id}</Text>
        <Text style={styles.text}>키: {height}</Text>
        <Text style={styles.text}>몸무게: {weight}</Text>
      </View>
      <View style={styles.announceBlock}>
        <Text style={styles.announce}>아래 오픈카톡 링크로 연락을 주시면</Text>
        <Text style={styles.announce}>
          저희가 수동으로 회원 정보를 수정해드립니다:)...
        </Text>
        <Text
          onPress={() => Linking.openURL('https://open.kakao.com/o/sOZgqCge')}
          style={styles.hyperLink}>
          BurnIN 오픈카톡
        </Text>
      </View>
      <View style={styles.coffeeBlock}>
        <Image
          source={require('../../assets/tiredEngineer.jpg')}
          style={{width: 200, height: 200, borderRadius: 12}}
        />
        <View style={{paddingTop: 12, paddingLeft: 12}}>
          <Text style={styles.announce}>불쌍한 개발자에게</Text>
          <Text style={styles.announce}>커피 한 잔 사주기</Text>
        </View>
      </View>
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
  userBlock: {
    flex: 1,
    width: '100%',
  },
  announceBlock: {
    backgroundColor: '#f0f0f0',
    paddingVertical: 18,
    borderRadius: 12,
    width: '100%',
  },
  announce: {
    fontSize: 12,
    textAlign: 'center',
  },
  text: {
    fontSize: 12,
    fontWeight: '600',
    marginBottom: 15,
  },
  hyperLink: {
    fontSize: 12,
    color: '#005a9c',
    textDecorationLine: 'underline',
    marginTop: 8,
    textAlign: 'center',
  },
  coffeeBlock: {
    marginBottom: 32,
    marginTop: 12,
    flexDirection: 'row',
    width: '100%',
  },
});
