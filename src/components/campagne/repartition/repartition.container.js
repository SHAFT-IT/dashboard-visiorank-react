import React, { Component } from 'react'
import {View, Text, processColor, StyleSheet} from 'react-native'
import { connect } from "react-redux";
import {SafeAreaView} from 'react-navigation';
import {PieChart} from 'react-native-charts-wrapper';
import { GRIS_TEXT } from '../../../commons/colors';

class RepartitionContainer extends Component{

    constructor() {
      super();

      this.state = {
        legend: {
          enabled: true,
          textSize: 8,
          form: 'CIRCLE',
          position: 'RIGHT_OF_CHART',
          wordWrapEnabled: true
        },
        data: {
          dataSets: [{
            values: [],
            label: '',
            config: {
              colors: [],
              valueTextSize: 9,
              valueTextColor: processColor('green'),
              sliceSpace: 0,
              selectionShift: 13
            }
          }],
        },
        highlights: [{x:2}],
        description: {
          text: '',
          textSize: 15,
          textColor: processColor('darkgray'),

        }
      };
    }

    componentDidMount() {
        console.log('RepartitionContainer');
    }

    componentWillReceiveProps ({ response }) {
      if (response && response !== this.props.response) {

        let arrvalues = [];
        arrvalues.push({value: response.aube || 0, label: 'Avant 8h'});
        arrvalues.push({value: response.matin || 0, label: 'Entre 8h et 12h'});
        arrvalues.push({value: response.midi || 0, label: 'Entre 12h et 14h'});
        arrvalues.push({value: response.apresmidi || 0, label: 'Entre 14h et 18h'});
        arrvalues.push({value: response.soir || 0, label: 'Apres 18h'});     
  
        console.log('PIE VALUES =>', arrvalues);
        
        this.setState ({
          legend: {
            enabled: true,
            textSize: 8,
            form: 'CIRCLE',
            position: 'RIGHT_OF_CHART',
            wordWrapEnabled: true
          },
          data: {
            dataSets: [{
              values: arrvalues,
              label: '',
              config: {
                colors: [processColor('#C0FF8C'), processColor('#FFF78C'), processColor('#FFD08C'), processColor('#8CEAFF'), processColor('#FF8C9D')],
                valueTextSize: 9,
                valueTextColor: processColor('green'),
                sliceSpace: 0,
                selectionShift: 13
              }
            }],
          },
          highlights: [{x:2}],
          description: {
            text: '',
            textSize: 15,
            textColor: processColor('darkgray'),
    
          }
        });

      }
    }

    render() {
 
        const { error, loading, response } = this.props;
        
        console.log('DATA IN REPARTITION =>', response);

        return (

          <SafeAreaView style={{flex: 1, flexDirection: 'column'}}>
            
            <View style={{height:50, justifyContent: 'center', backgroundColor: 'white' }}>
                <Text style={{marginLeft: 23, textAlign: 'left', color: GRIS_TEXT}}>Répartition des heures d'appel</Text>
            </View> 

            <View style={styles.container}>
              <PieChart
                style={styles.chart}
                logEnabled={true}
                chartBackgroundColor={processColor('#F5FCFF')}      
                chartDescription={this.state.description}
                data={this.state.data}
                legend={this.state.legend}
                highlights={this.state.highlights}
    
                entryLabelColor={processColor('black')}
                entryLabelTextSize={9}
                drawEntryLabels={true}
    
                rotationEnabled={true}
                rotationAngle={45}
                usePercentValues={false}
                centerTextRadiusPercent={0}
                holeRadius={0}
                holeColor={processColor('#f0f0f0')}
                transparentCircleRadius={0}
                transparentCircleColor={processColor('#f0f0f088')}
                maxAngle={350}
                onSelect={this.handleSelect.bind(this)}
                onChange={(event) => console.log(event.nativeEvent)}
              />
            </View>
          </SafeAreaView>
            
        );
    }

    handleSelect(event) {
      let entry = event.nativeEvent
      if (entry == null) {
        this.setState({...this.state, selectedEntry: null})
      } else {
        this.setState({...this.state, selectedEntry: JSON.stringify(entry)})
      }
  
      console.log(event.nativeEvent)
    }

}

const mapStateToProps = state => ({
  response: state.campagnes.response,
  loading: state.campagnes.loading,
  error: state.campagnes.error
});

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  chart: {
    flex: 1
  }
});

export default connect(mapStateToProps)(RepartitionContainer);
