import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withNavigation } from 'react-navigation';
import { Keyboard, ScrollView, Text, TextInput, TouchableHighlight, TouchableOpacity, View } from 'react-native';
import {
  DEMANDE_PRIORITE_BASSE_KEY,
  DEMANDE_PRIORITE_HAUTE_KEY,
  DEMANDE_PRIORITE_NORMAL_KEY,
  DEMANDE_STATUT_BROUILLON_KEY,
  DEMANDE_STATUT_BROUILLON_VALUE,
  DEMANDE_STATUT_CLOS_KEY,
  DEMANDE_STATUT_LIVRE_KEY,
  DEMANDE_STATUT_PRISE_EN_CHARGE_KEY,
  DEMANDE_STATUT_REFUSE_KEY,
  DEMANDE_STATUT_VALIDE_KEY,
  DEMANDE_TYPE_CORRECTION_KEY,
  DEMANDE_TYPE_DEMANDEINFO_KEY,
  DEMANDE_TYPE_EVOLUTION_KEY,
  DEMANDE_TYPE_NONE_KEY,
  NAVIGATION_TYPE_DEMAND_CREATE,
  NAVIGATION_TYPE_DEMAND_UPDATE
} from '../../../commons/constant';
import { getData } from '../../../commons/preferences';
import Autocomplete from 'react-native-autocomplete-input';
import Icon from 'react-native-vector-icons/FontAwesome';
import { ButtonGroup } from 'react-native-elements';
import { changeStatusDemande } from '../../../store/actions/demandes.actions';
import Modal from 'react-native-modal';
import StatusListWithComments from '../status/statusWithComment.list.component';
import styles from './demand.create.style';

const componentPriorityNormal = () => <Text style={styles.buttonGroup}>Normal</Text>;
const componentPriorityLow = () => <Text style={styles.buttonGroup}>Basse</Text>;
const componentPriorityHigh = () => <Text style={styles.buttonGroup}>Haute</Text>;

const componentTypeInfo = () => <Text style={styles.buttonGroup}>Demande d'informations</Text>;
const componentTypeCorrection = () => <Text style={styles.buttonGroup}>Correction</Text>;
const componentTypeEvolution = () => <Text style={styles.buttonGroup}>Evolution</Text>;

class DemandCreateContainer extends Component {

  constructor(props) {
    super(props);
    this.state = {
      user: {},
      query: '',
      userId: -1,
      ticketId: 0,
      titre: '',
      description: '',
      selectedType: -1,
      selectedPriority: -1,
      pageType: {},
      demand: {},
      isModalVisible: false,
      status: false,
      comment: ''
    };
  }

  componentDidMount() {

    getData('user')
      .then(user => {
        this.setState({ user: user });
        this.props.updateUi('user', user);

        if (user.type === '0') {
          this.setState({ userId: user.id });
          this.props.updateUi('userId', user.id);
        }
      })
      .catch(error => console.log('error'));

    this.init();

  }

  /*componentWillReceiveProps({
                                demandCreateResponse,
                                demandUpdateResponse,
                                demandCreateError,
                                demandUpdateError,
                                demandDetailResponse
                            }) {

  }*/

  onUpdateStatus = () => {
    const { pageType, demand } = this.props;
    if (demand && pageType === NAVIGATION_TYPE_DEMAND_UPDATE) {
      this.showModal(true, { status: true });
    }
  };

  getComment = (comment) => {
    this.setState({ comment: comment });
  };

  showModal = (visibility, state = { status: false, statusId: 0 }) => {
    const { demand } = this.props;
    this.setState({
      isModalVisible: visibility,
      status: state.status,
      priority: state.priority
    });
    if (!visibility) {
      if (state.status && state.statusId) this.props.dispatch(changeStatusDemande(state.statusId, demand.demand.ticket_id, this.state.comment));
    }
  };

  initType = (type) => {
    switch (parseInt(type)) {
      case DEMANDE_TYPE_EVOLUTION_KEY:
        return 0;
      case DEMANDE_TYPE_CORRECTION_KEY:
        return 1;
      case DEMANDE_TYPE_DEMANDEINFO_KEY:
        return 2;
      default:
        return -1;
    }
  };

  initPriority = (priority) => {
    switch (parseInt(priority)) {
      case DEMANDE_PRIORITE_HAUTE_KEY:
        return 0;
      case DEMANDE_PRIORITE_NORMAL_KEY:
        return 1;
      case DEMANDE_PRIORITE_BASSE_KEY:
        return 2;
      default:
        return -1;
    }
  };

  toPriority = (priority) => {
    switch (priority) {
      case 0:
        return DEMANDE_PRIORITE_HAUTE_KEY;
      case 1:
        return DEMANDE_PRIORITE_NORMAL_KEY;
      case 2:
        return DEMANDE_PRIORITE_BASSE_KEY;
      default:
        return -1;
    }
  };

  toType = (type) => {
    switch (type) {
      case 0:
        return DEMANDE_TYPE_EVOLUTION_KEY;
      case 1:
        return DEMANDE_TYPE_CORRECTION_KEY;
      case 2:
        return DEMANDE_TYPE_DEMANDEINFO_KEY;
      default:
        return -1;
    }
  };

  init = () => {
    const { demand, pageType, detailResponse } = this.props;
    if (demand && pageType === NAVIGATION_TYPE_DEMAND_UPDATE) {

      this.setState({
        pageType: pageType,
        titre: demand.demand.titre,
        description: demand.demand.description,
        selectedType: this.initType(demand.demand.type_id),
        selectedPriority: this.initPriority(demand.demand.priorite_id),
        userId: demand.demand.user_id,
        ticketId: demand.demand.ticket_id,
        demand: demand.demand
      });
      this.props.updateUi('demand', demand.demand);

      if (detailResponse && detailResponse.users && detailResponse.users.length > 0) {
        detailResponse.users.map(user => {
          if (demand.demand.user_id === user.id) {
            this.setState({ query: user.societe });
            this.props.updateUi('user', user);
          }
        });
      }

    } else if (!demand || pageType === NAVIGATION_TYPE_DEMAND_CREATE) {

      this.setState({
        pageType: pageType,
        selectedType: -1,
        demand: { status: DEMANDE_STATUT_BROUILLON_VALUE, statut_id: DEMANDE_STATUT_BROUILLON_KEY }
      });
    }
  };

  findUser(query) {
    if (query === '') {
      return [];
    }
    const { detailResponse } = this.props;
    const regex = new RegExp(`${query.trim()}`, 'i');
    return detailResponse.users.filter(user => user.societe.search(regex) >= 0);
  }

  onFocus() {
    setTimeout(() => this.scroller.scrollTo({ x: 0, y: 240 }), 1000);
  }

  updatePriority = (selectedPriority) => {
    this.setState({ selectedPriority: selectedPriority });
    this.props.updateUi('selectedPriority', selectedPriority);
  };

  updateType = (selectedType) => {
    if (this.state.pageType === NAVIGATION_TYPE_DEMAND_CREATE) {
      this.setState({ selectedType: selectedType });
      this.props.updateUi('selectedType', selectedType);
    }
  };

  render() {
    const { query, pageType, user } = this.state;
    const filteredUser = this.findUser(query);
    const comp = (a, b) => a.toLowerCase().trim() === b.toLowerCase().trim();

    const buttonsPriority = [
      { element: componentPriorityHigh },
      { element: componentPriorityNormal },
      { element: componentPriorityLow }];
    const buttonsType = [
      { element: componentTypeEvolution },
      { element: componentTypeCorrection },
      { element: componentTypeInfo }];
    const { selectedType, selectedPriority } = this.state;
    let statusBgColor = '';
    let buttonTextColor = '';
    switch (parseInt(this.state.demand.statut_id)) {
      case DEMANDE_STATUT_BROUILLON_KEY:
        statusBgColor = '#fff';
        buttonTextColor = '#000';
        break;
      case DEMANDE_STATUT_PRISE_EN_CHARGE_KEY:
        statusBgColor = '#f0ad4e';
        buttonTextColor = '#fff';
        break;
      case DEMANDE_STATUT_REFUSE_KEY:
        statusBgColor = '#d9534f';
        buttonTextColor = '#fff';
        break;
      case DEMANDE_STATUT_LIVRE_KEY:
        statusBgColor = '#5bc0de';
        buttonTextColor = '#fff';
        break;
      case DEMANDE_STATUT_VALIDE_KEY:
        statusBgColor = '#5cb85c';
        buttonTextColor = '#fff';
        break;
      case DEMANDE_STATUT_CLOS_KEY:
        statusBgColor = '#337ab7';
        buttonTextColor = '#fff';
        break;
      default:
        statusBgColor = '#337ab7';
        buttonTextColor = '#fff';
    }

    return (
      <View style={styles.allcontent}>
        <ScrollView keyboardShouldPersistTaps={'handled'} ref={(scroller) => {
          this.scroller = scroller;
        }}>
          <View>
            <Modal isVisible={this.state.isModalVisible} transparent={true}>
              <TouchableOpacity onPress={() => this.showModal(false, {})} style={{ flex: 1 }}>
                <View style={{
                  flex: 1,
                  flexDirection: 'column',
                  justifyContent: 'center',
                  alignItems: 'center',
                  borderRadius: 10
                }}>
                  {this.state.status &&
                  <StatusListWithComments showModal={this.showModal}
                                          getComment={this.getComment}
                                          demand={this.props.demand}/>}
                </View>
              </TouchableOpacity>
            </Modal>
            <TouchableHighlight onPress={this.onUpdateStatus}
                                style={[styles.bsubmit1, { backgroundColor: statusBgColor, marginTop: 20 }]}>
              <Text style={[styles.buttonText, { color: buttonTextColor }]}>
                Statut de la demande : {this.state.demand.status} <Icon name="chevron-down"
                                                                        style={[styles.icontopStatus, { color: buttonTextColor }]}/>
              </Text>
            </TouchableHighlight>
          </View>
          <TextInput style={styles.edittext}
                     placeholder="Titre"
                     underlineColorAndroid='transparent'
                     value={this.state.titre}
                     onChangeText={text => {
                       this.setState({ titre: text });
                       this.props.updateUi('titre', text);
                     }
                     }
          />
          <TextInput style={styles.textArea}
                     placeholder="Description"
                     underlineColorAndroid='transparent'
                     multiline={true}
                     value={this.state.description}
                     onChangeText={text => {
                       this.setState({ description: text });
                       this.props.updateUi('description', text);
                     }
                     }
          />
          {
            user.type === '1' && (
              <Autocomplete
                onFocus={() => this.onFocus()}
                autoCapitalize="none"
                autoCorrect={false}
                containerStyle={styles.autocompleteContainer}
                data={filteredUser.length === 1 && comp(query, filteredUser[0].societe) ? [] : filteredUser}
                defaultValue={query}
                onChangeText={text => {
                  this.setState({ query: text });
                }
                }
                placeholder="Choisir un utilisateur"
                renderItem={({ societe, prenom, nom, id, type }) => (
                  <TouchableOpacity onPress={() => {
                    this.setState({ query: societe, userId: id });
                    this.props.updateUi('user', {
                      id: id,
                      nom: nom,
                      prenom: prenom,
                      societe: societe,
                      type: type
                    });
                    Keyboard.dismiss();
                  }}>
                    <Text style={styles.itemText}>
                      {societe + ' - ' + prenom + ' ' + nom}
                    </Text>
                  </TouchableOpacity>
                )}
                renderTextInput={(props) => (
                  <TextInput {...props} style={styles.edittextautocomplete}
                             underlineColorAndroid='transparent'
                  />)
                }
              />
            )
          }
          <Text style={styles.buttonGroupTitle}>Type de la demande :</Text>
          <ButtonGroup
            selectedButtonStyle={styles.selectedButtonStyle}
            selectedTextStyle={styles.selectedTextStyle}
            style={styles.buttonGroupContainer}
            onPress={this.updateType}
            selectedIndex={selectedType}
            buttons={buttonsType}
            buttonStyle={styles.buttonGroupBackground}
            containerStyle={{ height: 35 }}/>
          <Text style={styles.buttonGroupTitle}>Priorité de la demande :</Text>
          <ButtonGroup
            selectedButtonStyle={styles.selectedButtonStyle}
            selectedTextStyle={styles.selectedTextStyle}
            style={styles.buttonGroupContainer}
            onPress={this.updatePriority}
            selectedIndex={selectedPriority}
            buttons={buttonsPriority}
            buttonStyle={styles.buttonGroupBackground}
            containerStyle={{ height: 35 }}/>

        </ScrollView>
      </View>
    );
  }
}

const mapStateToProps = state => ({});

export default withNavigation(connect(mapStateToProps)(DemandCreateContainer));
