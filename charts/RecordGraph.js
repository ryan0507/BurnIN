import React from 'react';
import {View, Text, Dimensions, StyleSheet} from 'react-native';
import {
  LineChart,
  BarChart
} from "react-native-chart-kit";

function RecordGraph({data}) {
  console.log(data);
  const records = [];
  const generateRecords = () => {
    data.graph_line.map(item => {
      records.push(item.pace_3);
    });
  };
  generateRecords();

  return (
    <View style={{height: 120, backgroundColor: 'white'}}>
      <Text>레코드 그래프</Text>
      <LineChart // 레이스 대시보드에 넣을 그래프!
          data={{
          labels: [],
          datasets: [{data: records}]
          }}
          width={Dimensions.get("window").width - 45} // from react-native
          height={90}
          yAxisLabel={""}
          fromZero={true} // 세로 축 시작 0부터, default : minimum data
          withInnerLines={false} // 격자 없애기
          withOuterLines={true}
          chartConfig={{
          backgroundColor: `white`,                
          backgroundGradientFrom: `white`,
          backgroundGradientTo: `white`,
          backgroundGradientFromOpacity: 0,
          backgroundGradientToOpacity: 0,     
          fillShadowGradientFrom: 'rgba(255, 193, 5, 1)', // 라인 아래 영역 색    
          fillShadowGradientTo: 'yellow', // 라인 아래 영역 색  
          fillShadowGradientFromOpacity: 1, //라인 아래 윗부분 영역 투명도 0(투명), 1(불투명)
          fillShadowGradientToOpacity: 0, // 라인 아래 아래부분 영역 투명도 0(투명), 1(불투명)
          decimalPlaces: 0, // 소수점 자리수, default :  2dp
          strokeWidth: 0.1, // 라인 두께
          propsForBackgroundLines: { 
            strokeDasharray: "0", // 대시 간격
            strokeDashoffset: 0, 
            strokeWidth: 1, // 축 및 격자선 두께
            stroke: `rgba(105, 105, 105, 0.5)`, // 축 및 격자 색
          },
          color: (opacity = 1) => `rgba(255, 193, 5, 1)`, // 라인 색
          labelColor: (opacity = 1) => `rgba(105, 105, 105, 1)`, // 라벨 색
          propsForDots: {
            r: "0", // 점 크기
            strokeWidth: "0", // 점 테두리
            stroke: "#fff" // 점 테두리 색
          }
          }}
          style={{
          marginVertical: 8,
          borderRadius: 16,
          paddingRight:50,
          }}
      />
    </View>
  );
}

export default RecordGraph;

