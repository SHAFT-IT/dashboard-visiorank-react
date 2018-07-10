import React, { Component } from 'react'
import {View, Text, StyleSheet, processColor} from 'react-native'
import update from 'immutability-helper';
import {LineChart} from 'react-native-charts-wrapper';
import { GRIS_TEXT } from '../../../commons/colors';
import { connect } from "react-redux";
import Loader from '../../loader/Loader';
import { fetchCampagnes } from '../../../store/actions/campagne.action';


class VisitesContainer extends Component{

    constructor() {
        super();
    
        this.state = {
          data: {},
          legend: {
            enabled: true,
            textColor: processColor('blue'),
            textSize: 12,
            position: 'BELOW_CHART_RIGHT',
            form: 'SQUARE',
            formSize: 14,
            xEntrySpace: 10,
            yEntrySpace: 5,
            formToTextSpace: 5,
            wordWrapEnabled: true,
            maxSizePercent: 0.5,
            custom: {
              colors: [processColor('blue')],
              labels: ['Visites du mois']
            }
          },
          marker: {
            enabled: true,
            digits: 2,
            backgroundTint: processColor('teal'),
              markerColor: processColor('#F0C0FF8C'),
            textColor: processColor('white'),
          },
          visites: []
        };
    }

    componentDidMount() {
        console.log('VisitesContainer');
        this.props.dispatch(fetchCampagnes());
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

    componentWillReceiveProps ({ response }) {
      if (response && response !== this.props.response) {

       const values = response.visits.map(item => ({y: parseInt(item.value)}));
       const labels = response.visits.map(item => item.label);

       console.log('CHART VALUES =>', values);
       console.log('CHART LABELS =>', labels);

       this.setState(
          update(this.state, {
            data: {
              $set: {
                dataSets: [
                  {
                      values: values,
                      label: 'Company Y',
                      config: {
                          lineWidth: 1,
                          drawCubicIntensity: 0.4,
                          circleRadius: 5,
                          drawHighlightIndicators: false,
                          color: processColor('blue'),
                          drawFilled: true,
                          fillColor: processColor('blue'),
                          fillAlpha: 45,
                          circleColor: processColor('blue')
                      }
                  }],
              }
            },
            xAxis: {
              $set: {
                  fontFamily:"HelveticaNeue-Medium",
                  fontWeight:"bold",
                  fontStyle:"italic",
                  valueFormatter: labels
              }
            }
          })
        );
      }
    }
  

    render() {

        const { error, loading } = this.props;

        if (error) {
            console.log("This is ERROR");
            return (
                <View style={styles.container}>
                    <Text style={styles.errortext}>Error calling ws! {error.message}</Text>
                </View>
            );
        }
  
        return (      

          <View style={{flex: 1}}>
            {loading ? 
              
              <Loader loading={loading} /> :

              <View style={{flex: 1, flexDirection: 'column'}}>

                  <View style={{height:50, justifyContent: 'center', backgroundColor: 'white' }}>
                      <Text style={{marginLeft: 23, textAlign: 'left', color: GRIS_TEXT}}>Statistique de campagnes</Text>
                  </View>

                  <View style={styles.container}>
                      <LineChart
                          style={styles.chart}
                          data={this.state.data}
                          chartDescription={{text: ''}}
                          legend={this.state.legend}
                          marker={this.state.marker}
                          xAxis={this.state.xAxis}
                          drawGridBackground={false}
                          borderColor={processColor('teal')}
                          borderWidth={1}
                          drawBorders={true}

                          touchEnabled={true}
                          dragEnabled={true}
                          scaleEnabled={true}
                          scaleXEnabled={true}
                          scaleYEnabled={true}
                          pinchZoom={true}
                          doubleTapToZoomEnabled={true}

                          dragDecelerationEnabled={true}
                          dragDecelerationFrictionCoef={0.99}

                          keepPositionOnRotation={false}
                          onSelect={this.handleSelect.bind(this)}
                          onChange={(event) => console.log(event.nativeEvent)}
                      />
                  </View>

              </View>
            }
          </View>
        );
    }

}

const mapStateToProps = state => ({
  response: state.campagnes.response,
  loading: state.campagnes.loading,
  error: state.campagnes.error
});

export default connect(mapStateToProps)(VisitesContainer);

const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#F5FCFF'
    },
    chart: {
      flex: 1
    }
});
  