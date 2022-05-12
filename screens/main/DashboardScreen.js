/*eslint-disable*/
import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  StatusBar,
  Image,
  StyleSheet,
  ScrollView,
} from 'react-native';
import OrangeBlock from '../../components/OrangeBlock';
import WhiteBlock from '../../components/WhiteBlock';
import userStorages from '../../storages/userStorages';

function DashboardScreen() {
  const [nickname, setNickname] = useState('');
  useEffect(() => {
    userStorages.get().then(userInfo => {
      setNickname(userInfo.id);
    });
  }, []);

  return (
    <>
      <StatusBar backgroundColor="#F4BC68" />
      <ScrollView style={styles.block}>
        <OrangeBlock>
          <Profile nickname={nickname} />
          <WhiteBlock>
            <ProgessRecord />
          </WhiteBlock>
        </OrangeBlock>
        <TotalRecord />
        <WeeklyRecord />
        <HighestRecord />
        <RecentRecord />
      </ScrollView>
    </>
  );
}

export default DashboardScreen;

const styles = StyleSheet.create({
  block: {
    backgroundColor: '#ffffff',
    flex: 1,
  },
  small: {
    fontSize: 12,
    fontWeight: '600',
    color: 'rgba(0,0,0,0.5)',
  },
  bold: {
    fontSize: 15,
    fontWeight: '600',
    color: '#000000',
  },
  profileBlock: {
    flexDirection: 'row',
    alignItems: 'center',
    width: '100%',
  },
  progressBlock: {
    // backgroundColor: 'lavender',
    width: '100%',
    flex: 1,
    justifyContent: 'space-between',
    paddingHorizontal: 32,
  },
  totalBlock: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    // backgroundColor: 'pink',
    marginTop: 72,
    marginBottom: 32,
    paddingHorizontal: 30,
  },
  weeklyBlock: {
    // backgroundColor: 'skyblue',
    marginBottom: 32,
    paddingHorizontal: 30,
  },
  highestBlock: {
    // backgroundColor: 'red',
    marginBottom: 32,
    paddingHorizontal: 30,
  },
  highestInnerBlock: {
    backgroundColor: '#f5f3c2',
    height: 60,
    marginBottom: 8,
    borderRadius: 10,
    paddingHorizontal: 20,
    paddingVertical: 12,
  },
  recentBlock: {
    // backgroundColor: 'lightyellow',
    paddingHorizontal: 30,
    marginBottom: 30,
  },
});

function Profile({nickname}) {
  return (
    <View style={styles.profileBlock}>
      <Text style={{fontSize: 15, fontWeight: '700', color: '#ffffff'}}>
        {nickname}
      </Text>
    </View>
  );
}
function ProgessRecord() {
  return (
    <View style={styles.progressBlock}>
      <View style={{flexDirection: 'row'}}>
        <Text style={styles.bold}>총 러닝거리</Text>
        <Text
          style={{
            fontSize: 15,
            color: '#696fdf',
            fontWeight: '800',
            marginLeft: 12,
          }}>
          35km
        </Text>
      </View>
      <View>
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center',
          }}>
          <Text style={styles.bold}>35km</Text>
          <Text style={styles.small}>다음 목표까지 15km</Text>
        </View>
        <Progressbar />
      </View>
    </View>
  );
}

function Progressbar() {
  return (
    <View style={{position: 'relative'}}>
      <View
        style={{
          backgroundColor: 'rgba(0, 0, 0, 0.06)',
          height: 10,
          borderRadius: 5,
          marginTop: 8,
        }}
      />
      <View
        style={{
          backgroundColor: '#a77120',
          height: 10,
          width: 200,
          borderRadius: 5,
          position: 'absolute',
          top: 8,
        }}
      />
    </View>
  );
}
function TotalRecord() {
  return (
    <View style={styles.totalBlock}>
      <View>
        <Text style={styles.bold}>총 러닝 시간</Text>
        <Text style={styles.small}>01:09:44</Text>
      </View>
      <View>
        <Text style={styles.bold}>총 러닝 횟수</Text>
        <Text style={styles.small}>15회</Text>
      </View>
      <View>
        <Text style={styles.bold}>평균 페이스</Text>
        <Text style={styles.small}>0'.00"</Text>
      </View>
    </View>
  );
}

function WeeklyRecord() {
  return (
    <View style={styles.weeklyBlock}>
      <View>
        <Text style={styles.bold}>이번주 기록</Text>
      </View>
      <View style={{height: 160, marginTop: 6}}>
        <Text>그래프 영역</Text>
      </View>
    </View>
  );
}

function HighestRecord() {
  return (
    <View style={styles.highestBlock}>
      <View style={styles.highestInnerBlock}>
        <Text style={styles.bold}>최장 거리</Text>
        <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
          <Text style={styles.small}>1.39km</Text>
          <Text style={styles.small}>4월 25일 16:45</Text>
        </View>
      </View>
      <View style={styles.highestInnerBlock}>
        <Text style={styles.bold}>최고 페이스</Text>
        <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
          <Text style={styles.small}>14:26 m/km</Text>
          <Text style={styles.small}>4월 25일 16:45</Text>
        </View>
      </View>
      <View style={styles.highestInnerBlock}>
        <Text style={styles.bold}>최장 시간</Text>
        <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
          <Text style={styles.small}>14:26 m/km</Text>
          <Text style={styles.small}>4월 25일 16:45</Text>
        </View>
      </View>
    </View>
  );
}

function RecentRecord() {
  return (
    <View style={styles.recentBlock}>
      <Text style={styles.bold}>최근 러닝</Text>
      <View style={{flexDirection: 'row', alignItems: 'center'}}>
        <Image
          source={require('../../assets/test.png')}
          style={{width: 70, height: 70, borderRadius: 12, marginRight: 20}}
        />
        <View
          style={{
            borderBottomWidth: 1,
            borderBottomColor: 'rgba(0,0,0,0.1)',
            flex: 1,
            paddingVertical: 16,
            paddingHorizontal: 16,
          }}>
          <Text style={styles.small}>26 4 월</Text>
          <Text style={styles.bold}>10.12 km</Text>
          <Text style={styles.small}>701 kcal 11.2km/h</Text>
        </View>
      </View>
    </View>
  );
}
