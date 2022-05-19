import React, {useState, useContext, useCallback} from 'react';
import {
  View,
  ScrollView,
  Text,
  StyleSheet,
  StatusBar,
  Pressable,
} from 'react-native';
import {useFocusEffect} from '@react-navigation/native';
import OrangeBlock from '../../components/OrangeBlock';
import WhiteBlock from '../../components/WhiteBlock';
import loginStorages from '../../storages/loginStorages';
import axios from 'axios';
import {secondsToHm, secondsToPace} from '../../modules/Calculations';
import RecordGraph from '../../charts/RecordGraph';
import TimeGraph from '../../charts/TimeGraph';

function RaceScreen() {
  const [tab, setTab] = useState('ranking');
  const [ranking, setRanking] = useState([]);
  const [personalRecord, setPersonalRecord] = useState('');
  const [dashboardRecord, setDashboardRecord] = useState('');
  const [showRanking, setShowRanking] = useState(false);
  const [showPersonal, setShowPersonal] = useState(false);
  const [showDashboard, setShowDashboard] = useState(false);
  const [noData, setNoData] = useState(false);

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
            setShowPersonal(true);
            setNoData(false);
          }
        } catch (e) {
          setNoData(true);
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
            setShowRanking(true);
            setNoData(false);
          }
        } catch (e) {
          setNoData(true);
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
            setNoData(false);
            setShowDashboard(true);
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
      <ScrollView style={styles.block}>
        <OrangeBlock>
          <Text style={styles.title}>레이스</Text>
          <WhiteBlock>
            <Text style={styles.text}>3km 언택트 레이스 개최!</Text>
            <View style={{alignItems: 'center'}}>
              <Text style={[styles.small]}>날씨가 좋은 5월!</Text>
              <Text style={[styles.small]}>
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
        {noData ? (
          <View style={{flex: 1, paddingHorizontal: 24, marginTop: 20}}>
            <Text style={{textAlign: 'center', fontSize: 12, color: '#000000'}}>
              아직 기록이 존재하지 않습니다.
            </Text>
            <Text style={{textAlign: 'center', fontSize: 12, color: '#000000'}}>
              레이스에 참여해 보세요!
            </Text>
          </View>
        ) : (
          <View>
            {tab === 'ranking'
              ? showRanking &&
                showPersonal && (
                  <Ranking ranking={ranking} personalRecord={personalRecord} />
                )
              : showDashboard && <DashBoard data={dashboardRecord} />}
          </View>
        )}
      </ScrollView>
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
    fontWeight: '600',
    color: '#000000',
    textAlign: 'center',
  },
  greyText: {
    fontSize: 12,
    fontWeight: '600',
    color: '#32323283',
  },
  small: {
    fontSize: 12,
    fontWeight: '500',
  },
  tabBtnBlock: {
    flexDirection: 'row',
    marginTop: 72,
    paddingHorizontal: 24,
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
  circularRecord: {
    width: 110,
    height: 110,
    borderRadius: 110,
    borderWidth: 10,
    borderColor: '#cfd8dc',
    justifyContent: 'center',
    alignItems: 'center',
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
  console.log(data);

  const generatePaces = useCallback(() => {
    const {mypace_check} = data;
    const paces = Object.values(mypace_check);
    paces.map((item, i) => {
      // diff값이 양수일 경우와 음수일 경우 구분해서 UI 제작
      console.log(item);
      return (
        <View key={i}>
          <Text>{secondsToPace(item)}</Text>
        </View>
      );
    });
  }, [data]);
  return (
    <View>
      <View
        style={{
          flexDirection: 'row',
          paddingHorizontal: 50,
          justifyContent: 'space-between',
          marginBottom: 40,
        }}>
        <View style={styles.circularRecord}>
          <Text style={{fontWeight: '700', fontSize: 30, color: '#000000'}}>
            {data.numUser_avg.participant}명
          </Text>
          <Text style={{fontWeight: '700', fontSize: 12, color: '#000000'}}>
            참여자수
          </Text>
        </View>
        <View style={styles.circularRecord}>
          <Text style={{fontWeight: '700', fontSize: 30, color: '#000000'}}>
            {secondsToHm(data.numUser_avg.average)}
          </Text>
          <Text style={{fontWeight: '700', fontSize: 12, color: '#000000'}}>
            평균 기록
          </Text>
        </View>
      </View>
      <View
        style={{
          marginBottom: 40,
          paddingHorizontal: 24,
        }}>
        <Text style={{fontWeight: '600', fontSize: 15, color: '#323232'}}>
          {data.get_rank.user_id}님의 위치: {data.get_rank.race_rank}등
        </Text>
        <Text style={styles.greyText}>
          {data.get_rank.diff}초 더 빨리 달릴 경우 {data.get_rank.rank_up}rank
          up!
        </Text>
      </View>
      <View
        style={{
          backgroundColor: '#f0f0f0',
          borderRadius: 15,
          marginHorizontal: 24,
          flexDirection: 'row',
          paddingVertical: 12,
          justifyContent: 'space-between',
          paddingHorizontal: 16,
          marginBottom: 40,
        }}>
        <View style={{flex: 1}}>
          <Text style={styles.text}>총 기록</Text>
          <View style={{flexDirection: 'row', marginTop: 8}}>
            <Text style={styles.greyText}>이전 기록 대비 </Text>
            <Text
              style={{
                fontSize: 12,
                fontWeight: '600',
                color: 'rgba(255, 0, 0, 0.61)',
              }}>
              14초 단축
            </Text>
          </View>
        </View>
        <View style={{flex: 1}}>
          <Text style={styles.text}>구간별 페이스</Text>
          <View style={{flexDirection: 'row', marginTop: 8}}>
            <Text>{generatePaces()}</Text>
          </View>
        </View>
      </View>
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
