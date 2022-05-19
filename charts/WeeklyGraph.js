import React from 'react';
import {View, Text, Dimensions, StyleSheet} from 'react-native';

function WeeklyGraph({data}) {
  return (
    <View style={{height: 120, backgroundColor: 'lavender'}}>
      <Text>주간 그래프</Text>
      <View title="bar plus line">
      <BarChart // 개인 분석에 들어갈 line + bar chart
          data={{
          labels: ["월", "화", "수", "목", "금", "토", "일"],
          datasets: [{data: [84,20,40,30,10, 20,10,]}]
          }}
          width={Dimensions.get("window").width - 30} // from react-native
          height={220}
          yAxisLabel={""}
          withInnerLines={true}
          withOuterLines={true}
          xAxisLabel={""}
          fromZero={true}
          showBarTops={false}                
          chartConfig={{
          backgroundColor: `white`,                
          backgroundGradientFrom: `white`,
          backgroundGradientTo: `white`,
          decimalPlaces: 0, // optional, defaults to 2dp
          fillShadowGradient: 'rgba(255, 193, 5, 1)', // THIS
          fillShadowGradientOpacity: 1, // THIS 
          propsForBackgroundLines: { 
            strokeDasharray: "5", // 대시 간격
            strokeDashoffset: 0, 
            strokeWidth: 1, // 0으로 하면가로, 세로 대시 라인 없애기
            stroke: `rgba(115, 115, 115, 0.3)`, // 축 및 격자 색
          },
          color: (opacity = 1) => `rgba(255, 231, 51, 1)`,
          labelColor: (opacity = 1) => `rgba(105, 105, 105, 1)`,
          barPercentage:1,
          }}
          style={{
          marginVertical: 8,
          borderRadius: 16,
          paddingRight:50,
          }}
      />          
    </View>
    <View style={{position: 'absolute', top:192, left:42}}>
    <LineChart 
          data={{
          labels: ["월", "화", "수", "목", "금", "토", "일"],
          datasets: [
              {data: [84,20,40,30,10,20,40,]}
          ]
          }}
          width={Dimensions.get("window").width - 50} // from react-native
          height={220}
          yAxisLabel={""}
          fromZero={true} // 세로 축 시작 0부터, default : minimum data
          withInnerLines={false} // 격자 없애기
          withOuterLines={true}
          withVerticalLabels={false}
          withHorizontalLabels={false}
          chartConfig={{
          backgroundColor: `white`,                
          backgroundGradientFrom: `white`,
          backgroundGradientTo: `white`,
          backgroundGradientFromOpacity: 0,
          backgroundGradientToOpacity: 0,     
          fillShadowGradientFrom: 'rgba(255, 193, 5, 1)', // 라인 아래 영역 색    
          fillShadowGradientTo: 'yellow', // 라인 아래 영역 색  
          fillShadowGradientFromOpacity: 0, //라인 아래 윗부분 영역 투명도 0(투명), 1(불투명)
          fillShadowGradientToOpacity: 0, // 라인 아래 아래부분 영역 투명도 0(투명), 1(불투명)
          decimalPlaces: 0, // 소수점 자리수, default :  2dp
          strokeWidth: 1.5, // 라인 두께
          propsForBackgroundLines: { 
            strokeDasharray: "0", // 대시 간격
            strokeDashoffset: 0, 
            strokeWidth: 0, // 축 및 격자선 두께
            stroke: `rgba(105, 105, 105, 1)`, // 축 및 격자 색
          },
          color: (opacity = 1) => `rgba(105, 71, 255, 0.75)`, // 라인 색
          labelColor: (opacity = 1) => `rgba(105, 105, 105, 1)`, // 라벨 색
          propsForDots: {
            r: "4", // 점 크기
            strokeWidth: "0", // 점 테두리
            stroke: "#fff" // 점 테두리 색
          }
          }}
          style={{
          marginVertical: 8,
          borderRadius: 16,
          paddingRight:30,
          position:'absolute', left:10,top:100
          }}
      /></View>
    </View>
  );
}

const styles = StyleSheet.create({
  sectionContainer: {
    marginTop: 32,
    paddingHorizontal: 24,
  },
});

export default WeeklyGraph;
