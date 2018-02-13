import React, { PureComponent, PropTypes } from 'react';
import { TouchableHighlight, View, Text, StyleSheet } from 'react-native'
import t from 'tcomb-form-native'

import { Keypair } from 'stellar-sdk'

let AccountModel = t.struct({
  name: t.String,
  id: t.String,
  privateKey: t.String
});

let Form = t.form.Form;

class AccountAdd extends React.PureComponent {

  static navigationOptions = {
    title: 'New Account'
  };

  constructor(props){
    super(props);
    this.state = {
      value: {
        name: null,
        id: null,
        privateKey: null
      },
      options: {
        order: ['name', 'privateKey', 'id'],
        fields: {
          id: {
            label: 'Public Key (Account Id)',
            editable: false
          }
        }
      }
    };
  }

  onChange = (value, path) => {
    if (path.includes('privateKey')) {
      try {
        let keypair = Keypair.fromSecret(value.privateKey)
        value = {
          ...value,
          id: keypair.publicKey()
        }
      }
      catch (error) {
        value = {
          ...value,
          id: ''
        }
      }
    }
    this.setState({
      ...this.state,
      value
    })
  }

  validateName_ = (name) => {
    if (name === null || name === '') {
      return {
        hasError: true,
        error: 'An account name is required'
      }
    }
    if (this.props.existingAccounts.find((a) => { return a.name === name })) {
      return {
        hasError: true,
        error: 'An account with the same name already exists'
      }
    }
    return {
      hasError: false
    }
  }

  validateKey_ = (privateKey) => {
    if (privateKey === null || privateKey === '') {
      return {
        hasError: true,
        error: 'A valid key pair is required'
      }
    }
    if (this.props.existingAccounts.find((a) => { return a.privateKey === privateKey })) {
      return {
        hasError: true,
        error: 'An account with the same key pair already exists'
      }
    }
    try {
      let keypair = Keypair.fromSecret(privateKey)
    }
    catch (error) {
      return {
        hasError: true,
        error: 'The private key entered is invalid'
      }
    }
    return {
      hasError: false
    }
  }

  onSubmitPress_ = () => {

    let { hasError: nameHasError, error: nameError } = this.validateName_(this.state.value.name);
    let { hasError: keyHasError, error: keyError } = this.validateKey_(this.state.value.privateKey);

    let newOptions = {
      ...this.state.options,
    }
    newOptions = {
      ...newOptions,
      fields: {
        ...newOptions.fields,
        name: {
          ...newOptions.fields.name,
          hasError: nameHasError,
          error: nameError
        },
        privateKey: {
          ...newOptions.fields.privateKey,
          hasError: keyHasError,
          error: keyError
        }
      }
    }
    if (nameHasError || keyHasError) {
      this.setState({
        ...this.state,
        options: newOptions
      })
      return
    }

    this.props.onSubmit(this.state.value)
    this.props.navigation.goBack()
  }

  generateAccountKeys = () => {
    let keyPair = Keypair.random()
    let newValue = {
      ...this.state.value,
      id: keyPair.publicKey(),
      privateKey: keyPair.secret()
    }
    this.setState({value: newValue})
  }

  render() {
    return (
      <View style={styles.container}>
        <Form
          ref="form"
          value={this.state.value}
          onChange={this.onChange}
          type={AccountModel}
          options={this.state.options}
        />
        <TouchableHighlight style={styles.button} onPress={this.generateAccountKeys} underlayColor='#99d9f4'>
          <Text style={styles.buttonText}>Randomly Generate Key Pair</Text>
        </TouchableHighlight>
        <TouchableHighlight style={styles.submitButton} onPress={this.onSubmitPress_} underlayColor='#99d9f4'>
          <Text style={styles.buttonText}>Save</Text>
        </TouchableHighlight>
      </View>
    );
  }
}

var styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    padding: 20,
    backgroundColor: '#ffffff',
  },
  title: {
    fontSize: 30,
    alignSelf: 'center',
    marginBottom: 30
  },
  buttonText: {
    fontSize: 18,
    color: 'white',
    alignSelf: 'center'
  },
  submitButton: {
    height: 36,
    backgroundColor: '#48BBEC',
    borderColor: '#48BBEC',
    borderWidth: 1,
    borderRadius: 8,
    marginBottom: 10,
    alignSelf: 'stretch',
    justifyContent: 'center'
  },
  button: {
    height: 36,
    backgroundColor: 'green',
    borderColor: 'green',
    borderWidth: 1,
    borderRadius: 8,
    marginBottom: 10,
    alignSelf: 'stretch',
    justifyContent: 'center'
  }
});

export default AccountAdd
