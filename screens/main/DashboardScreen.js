/*eslint-disable*/
import React, {useEffect, useState, useCallback} from 'react';
import {useFocusEffect} from '@react-navigation/native';
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
import loginStorages from '../../storages/loginStorages';
import axios from 'axios';
import WeeklyGraph from '../../charts/WeeklyGraph';
import {pacePresentation, secondsToHm} from '../../modules/Calculations';

function DashboardScreen() {
  const [nickname, setNickname] = useState('');
  const [data, setData] = useState();
  const [noData, setNoData] = useState(false);
  const [showChild, setShowChild] = useState(false);
  useEffect(() => {
    const getNickname = async () => {
      await userStorages.get().then(userInfo => {
        setNickname(userInfo.id);
      });
    };
    getNickname();
  }, []);

  useFocusEffect(
    useCallback(() => {
      let isFocused = true;
      const getDashboardRecord = async () => {
        try {
          const token = await loginStorages.get();
          const options = {
            headers: {Authorization: `Token ${token}`},
          };
          const {data} = await axios.get(
            'http://34.67.158.106:5000/u-ha2',
            options,
          );
          if (isFocused) {
            setData(data);
            setNoData(false);
            setShowChild(true);
          }
        } catch (e) {
          setNoData(true);
          throw new Error(e);
        }
      };
      getDashboardRecord();
      return () => {
        isFocused = false;
      };
    }, []),
  );

  return (
    <>
      <StatusBar backgroundColor="#F4BC68" />
      {noData ? (
        <View
          style={{
            flex: 1,
            paddingHorizontal: 24,
            justifyContent: 'center',
          }}>
          <Text style={{textAlign: 'center', fontSize: 12, color: '#000000'}}>
            아직 기록이 존재하지 않습니다.
          </Text>
          <Text style={{textAlign: 'center', fontSize: 12, color: '#000000'}}>
            레이스에 참여해 보세요!
          </Text>
        </View>
      ) : (
        showChild && (
          <ScrollView style={styles.block}>
            <OrangeBlock>
              <Profile nickname={nickname} />
              <WhiteBlock>
                <ProgessRecord data={data.user_data} />
              </WhiteBlock>
            </OrangeBlock>
            <TotalRecord data={data.user_data} />
            <WeeklyRecord data={data} />
            <HighestRecord data={data.best_record} />
            <RecentRecord data={data.recent_data} />
          </ScrollView>
        )
      )}
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
    width: '100%',
    flex: 1,
    justifyContent: 'space-between',
    paddingHorizontal: 32,
  },
  totalBlock: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 72,
    marginBottom: 32,
    paddingHorizontal: 30,
  },
  weeklyBlock: {
    marginBottom: 32,
    paddingHorizontal: 30,
  },
  highestBlock: {
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
function ProgessRecord({data}) {
  const totalDist = data.all_distance;
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
          {totalDist} km
        </Text>
      </View>
      <View>
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center',
          }}>
          <Text style={styles.bold}>{totalDist} km</Text>
          <Text style={styles.small}>{`다음 목표까지 ${
            10 - totalDist
          }km`}</Text>
        </View>
        <Progressbar totalDist={totalDist} />
      </View>
    </View>
  );
}

function Progressbar({totalDist}) {
  const progress = `${parseInt((totalDist / 10) * 100)}%`;
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
          width: progress,
          borderRadius: 5,
          position: 'absolute',
          top: 8,
        }}
      />
    </View>
  );
}
function TotalRecord({data}) {
  const dist = data.all_distance;
  const time = data.all_time;
  const pace = secondsToHm(data.all_time);
  const cnt = data.count_running;
  return (
    <View style={styles.totalBlock}>
      <View>
        <Text style={styles.bold}>총 러닝 시간</Text>
        <Text style={styles.small}>{time}</Text>
      </View>
      <View>
        <Text style={styles.bold}>총 러닝 횟수</Text>
        <Text style={styles.small}>{`${cnt}회`}</Text>
      </View>
      <View>
        <Text style={styles.bold}>평균 페이스</Text>
        <Text style={styles.small}>{pace}</Text>
      </View>
    </View>
  );
}

function WeeklyRecord({data}) {
  return (
    <View style={styles.weeklyBlock}>
      <View>
        <Text style={styles.bold}>이번주 기록</Text>
      </View>
      <View style={{height: 160, marginTop: 6}}>
        <WeeklyGraph data={data} />
      </View>
    </View>
  );
}

function HighestRecord({data}) {
  return (
    <View style={styles.highestBlock}>
      <View style={styles.highestInnerBlock}>
        <Text style={styles.bold}>최장 거리</Text>
        <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
          <Text style={styles.small}>{data.distance}km</Text>
          <Text style={styles.small}>{data.created_at_dist}</Text>
        </View>
      </View>
      <View style={styles.highestInnerBlock}>
        <Text style={styles.bold}>최고 페이스</Text>
        <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
          <Text style={styles.small}>{secondsToHm(data.pace)}</Text>
          <Text style={styles.small}>{data.created_at_pace}</Text>
        </View>
      </View>
      <View style={styles.highestInnerBlock}>
        <Text style={styles.bold}>최장 시간</Text>
        <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
          <Text style={styles.small}>{secondsToHm(data.time_record)}</Text>
          <Text style={styles.small}>{data.created_at_record}</Text>
        </View>
      </View>
    </View>
  );
}

function RecentRecord({data}) {
  console.log(data);
  return (
    <View style={styles.recentBlock}>
      <Text style={styles.bold}>최근 러닝</Text>
      <View style={{flexDirection: 'row', alignItems: 'center'}}>
        <View
          style={{
            borderBottomWidth: 1,
            borderBottomColor: 'rgba(0,0,0,0.1)',
            flex: 1,
            paddingVertical: 16,
            paddingHorizontal: 16,
          }}>
          <Text style={styles.small}>{data.created_at}</Text>
          <Text style={styles.bold}>{data.distance} km</Text>

          <Text style={styles.small}>
            {data.calories} kcal {pacePresentation(data.pace)}
          </Text>
        </View>
      </View>
    </View>
  );
}
