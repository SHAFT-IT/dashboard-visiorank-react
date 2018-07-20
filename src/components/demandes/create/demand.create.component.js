import React from 'react';
import {
    View,
    TextInput,
    ScrollView,
    TouchableOpacity,
    TouchableHighlight,
    Text, StyleSheet
} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import {NAVIGATION_TYPE_DEMAND_CREATE} from "../../../commons/constant";

export const DemandCreate = ({onBackPressed, onCreateDemandPressed, pageType}) => (
    <View style={styles.allcontent}>
        <View style={{height: 60}}>
            {pageType === NAVIGATION_TYPE_DEMAND_CREATE ?
                <Text style={styles.bigtitle}>Ajouter une demande</Text> :
                <Text style={styles.bigtitle}>Modifier la demande</Text>
            }
            <TouchableHighlight
                style={styles.containericontop}
                underlayColor='transparent'
                onPress={onBackPressed}>
                <Icon name="chevron-circle-left" style={styles.icontop}/>
            </TouchableHighlight>
        </View>
        <ScrollView keyboardShouldPersistTaps={'handled'} ref={(scroller) => {
            this.scroller = scroller
        }}>
            <TextInput style={styles.edittext}
                       placeholder="Titre"
                       underlineColorAndroid='transparent'

            />
            <TextInput style={styles.edittext}
                       placeholder="Description"
                       underlineColorAndroid='transparent'
                       multiline={true}

            />
            {this.state.user.type === '1' && (
                <Autocomplete
                    onFocus={() => this.onFocus()}
                    autoCapitalize="none"
                    autoCorrect={false}
                    containerStyle={styles.autocompleteContainer}
                    data={[]}
                    defaultValue={query}
                    onChangeText={text => this.setState({query: text})}
                    placeholder="Choisir un utilisateur"
                    renderItem={({websiteUrl, id}) => (
                        <TouchableOpacity onPress={() => {
                            this.setState({query: websiteUrl, analytics: id})
                            Keyboard.dismiss()
                        }}>
                            <Text style={styles.itemText}>
                                {websiteUrl}
                            </Text>
                        </TouchableOpacity>
                    )}
                    renderTextInput={(props) => (
                        <TextInput {...props} style={styles.edittextautocomplete}
                                   underlineColorAndroid='transparent'
                        />)
                    }
                />)
            }
            <TouchableOpacity
                style={styles.buttonSubmit}
                onPress={this.onCreate}>
                {pageType === NAVIGATION_TYPE_DEMAND_CREATE ?
                    <Text style={styles.buttonText}>Ajouter</Text> :
                    <Text style={styles.buttonText}>Modifier</Text>
                }
            </TouchableOpacity>
        </ScrollView>
    </View>
)

const styles = StyleSheet.create({
    richText: {
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: 'transparent',
    },
    allcontent: {
        flex: 1,
    },
    container: {
        backgroundColor: '#F5FCFF',
        paddingTop: 25
    },
    autocompleteContainer: {
        left: 0,
        right: 0,
        top: 0,
        marginLeft: 30,
        marginRight: 30,
        marginTop: 20,
        borderRadius: 6,
        borderWidth: 0.5,
        position: 'relative',
        borderColor: '#939393',
        zIndex: 1
    },
    edittextautocomplete: {
        fontSize: 14,
        fontWeight: 'bold',
        textAlign: 'left',
        height: 45,
    },
    itemText: {
        fontSize: 15,
        margin: 2
    },
    descriptionContainer: {
        backgroundColor: '#F5FCFF',
        marginTop: 25
    },
    infoText: {
        textAlign: 'center'
    },
    titleText: {
        fontSize: 18,
        fontWeight: '500',
        marginBottom: 10,
        marginTop: 10,
        textAlign: 'center'
    },
    directorText: {
        color: 'grey',
        fontSize: 12,
        marginBottom: 10,
        textAlign: 'center'
    },
    openingText: {
        textAlign: 'center'
    },
    edittext: {
        marginLeft: 30,
        marginRight: 30,
        marginTop: 20,
        fontSize: 14,
        fontWeight: 'bold',
        textAlign: 'left',
        height: 45,
        borderRadius: 6,
        borderWidth: 1,
        paddingLeft: 15,
        borderColor: '#939393',
    },
    scrollcontent: {
        marginTop: 17,
    },
    icontop: {
        fontSize: 45,
        color: 'grey',
    },
    containericontop: {
        position: 'absolute',
        top: 10,
        left: 25,
        alignItems: "center",
        justifyContent: "center",
        width: 50,
        height: 50,
    },
    buttonSubmit: {
        marginLeft: 30,
        marginRight: 30,
        marginTop: 20,
        marginBottom: 20,
        height: 50,
        borderRadius: 6,
        paddingLeft: 15,
        backgroundColor: 'green',
        alignItems: "center",
        justifyContent: "center",
    },
    buttonText: {
        color: 'white',
        fontSize: 16,
        fontWeight: 'bold',
        textAlign: 'center',
    },
    bigtitle: {
        textAlign: 'center',
        color: '#939393',
        fontSize: 18,
        fontWeight: 'bold',
        marginBottom: 20,
        marginTop: 20
    }

});
