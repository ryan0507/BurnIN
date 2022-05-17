import React, {useState, useContext, useCallback} from 'react';
import {View, Text, StyleSheet, StatusBar, Pressable} from 'react-native';
import {useFocusEffect} from '@react-navigation/native';
import OrangeBlock from '../../components/OrangeBlock';
import WhiteBlock from '../../components/WhiteBlock';
import loginStorages from '../../storages/loginStorages';
import axios from 'axios';
import {secondsToHm} from '../../modules/Calculations';
import RecordGraph from '../../charts/RecordGraph';
import TimeGraph from '../../charts/TimeGraph';

function RaceScreen() {
  const [tab, setTab] = useState('ranking');
  const [ranking, setRanking] = useState([]);
  const [personalRecord, setPersonalRecord] = useState('');
  const [dashboardRecord, setDashboardRecord] = useState('');

  useFocusEffect(
    useCallback(() => {
      let isFocused = true;
      const getPersonalRecord = async () => {
        try {
          const token = await loginStorages.get();

          const options = {
            headers: {Authorization: `Token ${token}`},
          };
          const res = await axios.get(
            'http://34.67.158.106:5000/current-user-rank',
            options,
          );
          if (isFocused) {
            setPersonalRecord(res.data);
          }
        } catch (e) {
          throw new Error(e);
        }
      };
      getPersonalRecord();

      return () => {
        isFocused = false;
      };
    }, []),
  );

  useFocusEffect(
    useCallback(() => {
      let isFocused = true;
      const getRankingRecord = async () => {
        try {
          const res = await axios.get('http://34.67.158.106:5000/race-ranking');
          if (isFocused) {
            setRanking(res.data);
          }
        } catch (e) {
          throw new Error(e);
        }
      };
      getRankingRecord();

      return () => {
        isFocused = false;
      };
    }, []),
  );

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
            'http://34.67.158.106:5000/u-ha',
            options,
          );
          if (isFocused) {
            setDashboardRecord(data);
          }
        } catch (e) {
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
      <View style={styles.block}>
        <OrangeBlock>
          <Text style={styles.title}>레이스</Text>
          <WhiteBlock>
            <Text style={styles.text}>3km 언택트 레이스 개최!</Text>
            <View style={{alignItems: 'center'}}>
              <Text style={[styles.text, styles.small]}>날씨가 좋은 5월!</Text>
              <Text style={[styles.text, styles.small]}>
                3km를 누구보다 빠르게 뛰어보세요!
              </Text>
            </View>
          </WhiteBlock>
        </OrangeBlock>
        <View style={styles.tabBtnBlock}>
          <TabBtn onPress={() => setTab('ranking')} tab={tab} title="ranking" />
          <TabBtn
            onPress={() => setTab('dashboard')}
            tab={tab}
            title="dashboard"
          />
        </View>
        {tab === 'ranking' ? (
          <Ranking ranking={ranking} personalRecord={personalRecord} />
        ) : (
          <DashBoard data={dashboardRecord} />
        )}
      </View>
    </>
  );
}

export default RaceScreen;

const styles = StyleSheet.create({
  block: {
    backgroundColor: '#ffffff',
    flex: 1,
  },
  title: {
    fontSize: 24,
    fontWeight: '600',
    color: '#ffffff',
  },
  text: {
    fontSize: 16,
    fontWeight: '500',
    color: '#000000',
  },
  small: {
    fontSize: 12,
  },
  tabBtnBlock: {
    flexDirection: 'row',
    marginTop: 72,
    paddingHorizontal: 16,
  },
  tabBtn: {
    marginRight: 18,
    marginBottom: 18,
    backgroundColor: '#ffffff',
    borderRadius: 10,
    borderWidth: 1,
    paddingVertical: 4,
    paddingHorizontal: 12,
  },
  selected: {
    borderColor: '#ef9917',
    color: '#ef9917',
  },
  unselected: {
    borderColor: '#817D83',
    color: '#817D83',
  },
  ranktable: {
    paddingHorizontal: 16,
  },
  rankheader: {
    flexDirection: 'row',
    borderBottomColor: '#817D83',
    borderBottomWidth: 1,
    paddingBottom: 10,
  },
  rankrow: {
    height: 32,
    flexDirection: 'row',
    alignItems: 'center',
    borderBottomColor: 'rgba(129, 125, 131, 0.6)',
    borderBottomWidth: 0.5,
  },
  toprow: {
    backgroundColor: 'rgba(239, 217, 23, 0.37)',
  },
  col1: {
    flex: 1.5,
    textAlign: 'center',
  },
  col2: {
    flex: 6,
  },
  col3: {
    flex: 3,
  },
  rankText: {
    fontWeight: '400',
    fontSize: 16,
    color: '#878686',
  },
  rankTextBold: {
    fontWeight: '500',
    fontSize: 16,
    color: '#000000',
  },
});

function Ranking({ranking, personalRecord}) {
  const generateRanking = useCallback(() => {
    return ranking.map((user, idx) => {
      return (
        <View key={idx} style={styles.rankrow}>
          <Text style={[styles.rankText, styles.col1]}>{user.race_rank}</Text>
          <Text style={[styles.rankText, styles.col2]}>{user.nickname}</Text>
          <Text style={[styles.rankText, styles.col3]}>
            {secondsToHm(user.record)}
          </Text>
        </View>
      );
    });
  }, [ranking]);
  return (
    <View style={styles.ranktable}>
      <View style={styles.rankheader}>
        <Text style={[styles.rankTextBold, styles.col1]}>순위</Text>
        <Text style={[styles.rankTextBold, styles.col2]}>닉네임</Text>
        <Text style={[styles.rankTextBold, styles.col3]}>기록</Text>
      </View>
      <View>
        <View style={[styles.toprow, styles.rankrow]}>
          <Text style={[styles.rankTextBold, styles.col1]}>
            {personalRecord.race_rank}
          </Text>
          <Text style={[styles.rankTextBold, styles.col2]}>
            {personalRecord.nickname}
          </Text>
          <Text style={[styles.rankTextBold, styles.col3]}>
            {secondsToHm(personalRecord.record)}
          </Text>
        </View>
      </View>
      {generateRanking()}
    </View>
  );
}

function DashBoard({data}) {
  return (
    <View>
      <Text>대시보드 보기</Text>
      <RecordGraph data={data} />
      <TimeGraph data={data} />
    </View>
  );
}

function TabBtn({onPress, tab, title}) {
  return (
    <View
      style={[
        styles.tabBtn,
        tab === title ? styles.selected : styles.unselected,
      ]}>
      <Pressable onPress={onPress}>
        {title === 'ranking' ? (
          <Text
            style={[
              tab === title ? styles.selected : styles.unselected,
              styles.small,
            ]}>
            순위 보기
          </Text>
        ) : (
          <Text
            style={[
              tab === title ? styles.selected : styles.unselected,
              styles.small,
            ]}>
            대시보드 보기
          </Text>
        )}
      </Pressable>
    </View>
  );
}
