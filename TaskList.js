import React, {Component} from 'react';
import {
  StyleSheet,
  ListView,
  View,
  TouchableHighlight,
  Text,
} from 'react-native';
import TaskRow from './TaskRow'

export class TaskList extends Component {
  constructor(props, context) {
    super(props, context);
    const ds = new ListView.DataSource({
      rowHasChanged: (r1, r2) => r1 !== r2,
    });
    this.state = {
      dataSource: ds.cloneWithRows(props.todos)
    };
    this.renderRow = this.renderRow.bind(this);
  }

  componentWillReceiveProps(nextProps) {
    const dataSource = this
      .state
      .dataSource
      .cloneWithRows(nextProps.todos);
    this.setState({dataSource});
  }

  renderRow(todo) {
    return (
      <TaskRow
        todo={todo}
        onDone={this.props.onDone}
      />
    )
  }

  render() {
    return (
      <View style={styles.container}>
        <ListView
          key={this.props.todos}
          dataSource={this.state.dataSource}
          renderRow={this.renderRow}
        />
        <TouchableHighlight
          onPress={this.props.onAddStarted}
          style={styles.button}>
          <Text style={styles.buttonText}>
            Add one
          </Text>
        </TouchableHighlight>
      </View>
    );
  }
}

TaskList.propTypes = {
  onDone: React.PropTypes.func.isRequired,
  onAddStarted: React.PropTypes.func.isRequired,
  todos: React.PropTypes.arrayOf(React.PropTypes.object).isRequired,
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 40,
    backgroundColor: '#f7f7f7',
    justifyContent: 'flex-start',
  },
  button: {
    height: 60,
    borderColor: '#05A5D1',
    borderWidth: 2,
    backgroundColor: '#333',
    margin: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  buttonText: {
    color: '#FAFAFA',
    fontSize: 20,
    fontWeight: '600',
  },
});
export default TaskList;
