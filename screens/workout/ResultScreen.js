import React, {useContext, useState, useEffect} from 'react';
import {
  View,
  Text,
  Pressable,
  StyleSheet,
  StatusBar,
  BackHandler,
} from 'react-native';
import MapView, {Polyline} from 'react-native-maps';
import moment from 'moment';
import WorkOutContext from '../../contexts/WorkOutContext';
import PopUp from '../../components/PopUp';

function ResultScreen({navigation, route}) {
  const [showModal, setShowModal] = useState(false);
  const {time, totalDist, calories, currentPace} = route.params;
  const {locations, sendRecord} = useContext(WorkOutContext);
  const backAction = () => {
    setShowModal(true);
    return true;
  };
  const goBack = () => {
    setShowModal(false);
  };
  useEffect(() => {
    BackHandler.addEventListener('hardwareBackPress', backAction);
    return () => {
      BackHandler.removeEventListener('hardwareBackPress', backAction);
    };
  }, []);
  return (
    <>
      <StatusBar backgroundColor="#F3F6FB" />
      <MapView
        initialRegion={{
          latitude: 37.56578,
          longitude: 126.9386,
          latitudeDelta: 0.0922,
          longitudeDelta: 0.0421,
        }}
        style={styles.map}>
        <Polyline coordinates={locations} strokeColor="#EF9917" />
      </MapView>
      <View style={styles.block}>
        <View style={styles.upperBlock}>
          <Text style={styles.date}>{moment().format('YYYY.MM.DD')}</Text>
        </View>
        <View style={{width: '100%'}}>
          <View style={styles.whiteBlock}>
            <Text
              style={{
                fontSize: 30,
                fontWeight: '700',
                color: '#323232',
                textAlign: 'center',
              }}>
              {`${time.hours() < 10 ? `0${time.hours()}` : time.hours()}:${
                time.minutes() < 10 ? `0${time.minutes()}` : time.minutes()
              }:${time.seconds() < 10 ? `0${time.seconds()}` : time.seconds()}`}
            </Text>
            <Text
              style={{fontSize: 11, fontWeight: '400', textAlign: 'center'}}>
              총 달린 시간
            </Text>
            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'space-between',
                marginTop: 18,
              }}>
              <View style={styles.greyBlock}>
                <Text style={styles.recordText}>{totalDist.toFixed(2)}</Text>
                <Text style={styles.unitText}>km</Text>
              </View>
              <View style={styles.greyBlock}>
                <Text style={styles.recordText}>{calories}</Text>
                <Text style={styles.unitText}>kcal</Text>
              </View>
              <View style={styles.greyBlock}>
                <Text style={styles.recordText}>{currentPace}</Text>
                <Text style={styles.unitText}>페이스</Text>
              </View>
              <View />
            </View>
            <Pressable
              onPress={() => {
                sendRecord().then(() => {
                  navigation.navigate('MainTab', {screen: 'WorkOutScreen'});
                });
              }}>
              <Text style={styles.btnText}>기록 저장</Text>
            </Pressable>
          </View>
        </View>
      </View>
      <PopUp visible={showModal} resultScreen goBack={goBack}>
        <Text style={{textAlign: 'center'}}>기록저장 버튼을 누르셔야</Text>
        <Text style={{textAlign: 'center'}}>러닝 결과가 저장됩니다.</Text>
      </PopUp>
    </>
  );
}

export default ResultScreen;

const styles = StyleSheet.create({
  block: {
    flex: 1,
    justifyContent: 'flex-end',
    alignItems: 'center',
    position: 'relative',
    marginHorizontal: 24,
  },
  map: {
    width: '100%',
    height: '100%',
    position: 'absolute',
    zIndex: -1,
  },
  button: {
    width: 32,
    height: 32,
    backgroundColor: '#ffffff',
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
    position: 'absolute',
    left: 24,
    top: 24,
  },
  upperBlock: {
    position: 'absolute',
    flexDirection: 'row',
    justifyContent: 'center',
    width: '100%',
    top: 0,
    zIndex: 10,
    paddingTop: 24,
  },
  whiteBlock: {
    width: '100%',
    backgroundColor: '#ffffff',
    paddingHorizontal: 24,
    position: 'absolute',
    bottom: 30,
    zIndex: 10,
    padding: 16,
    borderRadius: 16,
  },
  greyBlock: {
    backgroundColor: '#F3F6FB',
    width: '30%',
    height: 68,
    borderRadius: 16,
    padding: 10,
  },
  recordText: {
    fontSize: 15,
    fontWeight: '700',
    color: '#323232',
  },
  unitText: {
    fontSize: 12,
    fontWeight: '400',
  },
  btnText: {
    fontWeight: '900',
    color: '#EF9917',
    textAlign: 'center',
    marginTop: 12,
  },
});
