import React from 'react';
import {
  Modal,
  View,
  Dimensions,
  StyleSheet,
  TouchableHighlight,
  Text,
} from 'react-native';
function PopUp({
  children,
  visible,
  closeModal,
  quitRunning,
  goBack,
  runningScreen,
  resultScreen,
}) {
  return (
    <Modal animationType="slide" visible={visible} transparent={true}>
      <View style={styles.modalWrapper}>
        <View style={styles.modal}>
          {children}
          {runningScreen && (
            <View style={styles.btnBlock}>
              <TouchableHighlight style={styles.btn} onPress={quitRunning}>
                <Text style={styles.btnText}>확인</Text>
              </TouchableHighlight>
              <TouchableHighlight style={styles.btn} onPress={closeModal}>
                <Text style={styles.btnText}>취소</Text>
              </TouchableHighlight>
            </View>
          )}
          {resultScreen && (
            <View style={styles.btnBlock}>
              <TouchableHighlight style={styles.btn} onPress={goBack}>
                <Text style={styles.btnText}>돌아가기</Text>
              </TouchableHighlight>
            </View>
          )}
        </View>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  modalWrapper: {
    width: '100%',
    height: '100%',
    backgroundColor: 'rgba(0,0,0,0.3)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  modal: {
    width: '80%',
    height: '20%',
    backgroundColor: '#ffffff',
    borderRadius: 15,
    paddingHorizontal: 12,
    paddingTop: 12,
    justifyContent: 'center',
  },
  btnBlock: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: 20,
  },
  btn: {
    marginHorizontal: 10,
  },
  btnText: {
    fontWeight: '900',
    color: '#EF9917',
  },
});

export default PopUp;
