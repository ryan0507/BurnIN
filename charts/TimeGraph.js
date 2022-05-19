import React from 'react';
import {View, Text, Dimensions, StyleSheet} from 'react-native';
import {LineChart, BarChart} from 'react-native-chart-kit';

function TimeGraph({data}) {
  console.log(data);
  return (
    <View style={{height: 120, backgroundColor: 'white'}}>
      <Text>타임 그래프</Text>
      <BarChart //bar chart
        data={{
          labels: [
            '0시',
            '1시',
            '2시',
            '3시',
            '4시',
            '5시',
            '6시',
            '7시',
            '8시',
            '9시',
            '10시',
            '11시',
            '12시',
            '13시',
            '14시',
            '15시',
            '16시',
            '17시',
            '18시',
            '19시',
            '20시',
            '21시',
            '22시',
            '23시',
            '24시',
          ],
          datasets: [
            {
              data: [
                84, 20, 40, 30, 10, 20, 10, 0, 1, 2, 5, 7, 84, 20, 40, 30, 10,
                20, 10, 0, 1, 2, 5, 7,
              ],
            },
          ],
        }}
        width={Dimensions.get('window').width - 45} // from react-native
        height={90}
        yAxisLabel={''}
        withInnerLines={true}
        withOuterLines={true}
        xAxisLabel={''}
        fromZero={true}
        showBarTops={false}
        spacingInner={1}
        chartConfig={{
          backgroundColor: 'white',
          backgroundGradientFrom: 'white',
          backgroundGradientTo: 'white',
          decimalPlaces: 0, // optional, defaults to 2dp
          fillShadowGradient: 'rgba(255, 193, 5, 1)', // THIS
          fillShadowGradientOpacity: 1, // THIS
          barPercentage: 1,
          propsForBackgroundLines: {
            strokeDasharray: '5', // 대시 간격
            strokeDashoffset: 0,
            strokeWidth: 1, // 0으로 하면가로, 세로 대시 라인 없애기
            stroke: 'rgba(115, 115, 115, 0.3)', // 축 및 격자 색
          },
          color: (opacity = 1) => 'rgba(255, 231, 51, 1)',
          labelColor: (opacity = 1) => 'rgba(105, 105, 105, 1)',
        }}
        style={{
          marginVertical: 8,
          borderRadius: 16,
          paddingRight: 50,
        }}
      />
    </View>
  );
}

export default TimeGraph;
