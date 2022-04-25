import React, {useState} from 'react';
import {View, Text, StyleSheet, StatusBar, Pressable} from 'react-native';
import {Children} from 'react/cjs/react.production.min';
import OrangeBlock from '../../components/OrangeBlock';
import WhiteBlock from '../../components/WhiteBlock';

function RaceScreen() {
  const [tab, setTab] = useState('ranking');
  return (
    <>
      <StatusBar backgroundColor="#F4BC68" />
      <View style={styles.block}>
        <OrangeBlock>
          <Text style={styles.title}>레이스</Text>
          <WhiteBlock>
            <Text style={styles.text}>5km 언택트 레이스 개최!</Text>
            <View style={{alignItems: 'center'}}>
              <Text style={[styles.text, styles.small]}>날씨가 좋은 5월!</Text>
              <Text style={[styles.text, styles.small]}>
                5km를 누구보다 빠르게 뛰어보세요!
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
        {tab === 'ranking' ? <Ranking /> : <DashBoard />}
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
});

function Ranking() {
  return (
    <View>
      <Text>랭킹</Text>
    </View>
  );
}

function DashBoard() {
  return (
    <View>
      <Text>대시보드 보기</Text>
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
          <Text style={[tab === title ? styles.selected : styles.unselected]}>
            순위 보기
          </Text>
        ) : (
          <Text style={[tab === title ? styles.selected : styles.unselected]}>
            대시보드 보기
          </Text>
        )}
      </Pressable>
    </View>
  );
}
