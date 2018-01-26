import React from 'react';
import { Route, Switch, Redirect } from 'react-router-dom';

import SearchTitle from '../EditAddTask/SearchTitle/index';
import Progress from '../EditAddTask/ProgressBar/index';
import CategoryAdd from '../EditAddTask/CategoryAdd/index';
import TaskAdd from '../EditAddTask/TaskAdd/index';
import Categories from '../EditAddTask/CategoriesSection/index';
import TaskList from '../EditAddTask/TasksSection/index';
import TaskEdit from '../EditAddTask/EditSection/index';

const styles = {
  mainContainer: {
    width: '800px',
    height: '600px',
    border: '1px solid #bdbdbd',
    boxShadow: '0 0 3px black',
    margin: '25px auto',
    display: 'flex',
    padding: '10px',
    flexWrap: 'wrap',
  },
  header: {
    height: '140px',
    width: '100%',
    display: 'flex',
    flexWrap: 'wrap',
    paddingTop: '15px',
  }
};

export default class App extends React.PureComponent {

  constructor(props){
    super(props);

    this.state = {
      title: 'To-Do List',
      isEditMode: false,
      tasks: [
        {
          id: 1,
          taskName: 'React',
          description: 'Enter description...',
          isDone: false,
        },
        {
          id: 2,
          taskName: 'Redux',
          description: 'Enter description...',
          isDone: false,
        },
        {
          id: 3,
          taskName: 'Router',
          description: 'Enter description...',
          isDone: false,
        },
      ],
      editTask: null,
      searchParameters: {
        isDone: false,
        taskName: '',
      },
      isFilterMode: false,
      doneCount: 0,
      completed: 0,
      categories: [
        {
          id: 1,
          name: 'Category 1',
          visible: true,
          children: [
            {
              id: 11,
              name: 'Category 1 1',
              visible: true,
            },
            {
              id: 12,
              name: 'Category 1 2',
              visible: true,
            },
            {
              id: 13,
              name: 'Category 1 3',
              visible: true,
              children: [
                {
                  id: 131,
                  name: 'Category 1 3 1',
                  visible: true,
                },
              ],
            },
          ],
        },
        {
          id: 2,
          name: 'Category 2',
          visible: true,
          children: [
            {
              id: 21,
              name: 'Category 2 1',
              visible: true,
            },
          ],
        },
      ],
      isEditCategories: false,
    };

    this.onCheckEditMode = this.onCheckEditMode.bind(this);
    this.onAddTask = this.onAddTask.bind(this);
    this.onEditTask = this.onEditTask.bind(this);
    this.getTasksForShow = this.getTasksForShow.bind(this);
    this.onGetSearchParameters = this.onGetSearchParameters.bind(this);
    this.getProgress = this.getProgress.bind(this);
    this.onAddCategory = this.onAddCategory.bind(this);
    //this.onChangeVisible = this.onChangeVisible.bind(this);
  }

  render() {

    return(
      <div style={styles.mainContainer}>
        <div style={styles.header}>
          <Route render={(props) => (
            <SearchTitle title={this.state.title}
                         onGetSearchParameters={this.onGetSearchParameters}
            />
            )} />
          <Route exact path='/' render={(render) => (
              <Progress completed={this.state.completed}/>
            )}/>
          <Route exact path='/' render={(render) => (
              <CategoryAdd onAddCategory={this.onAddCategory}
                           nextId={this.state.categories.length + 1}/>
            )}/>
          <Route exact path='/' render={(render) => (
              <TaskAdd onAddTask={this.onAddTask}
                       nextId={this.state.tasks.length + 1} />
            )}/>
        </div>
        <Route render={(render) => (
            <Categories categories={this.state.categories}
                        onChangeVisible={this.onChangeVisible} />
          )}/>
        <Route render={(props) => (
            <Switch>
              <Route exact path="/"
                     render={(render) => (
                       <TaskList tasks={this.getTasksForShow()}
                                 onCheckEditMode={this.onCheckEditMode}
                                 onEditTask={this.onEditTask} />
                     )}
              />
              <Route path="/edit/:taskId"
                     render={(props) => (
                       <TaskEdit task={this.state.editTask}
                                 onEditTask={this.onEditTask}
                                 onCheckEditMode={this.onCheckEditMode}/>
                     )}
              />
            </Switch>
          )} />
      </div>
    );
  }

  /*onChangeVisible(category) {

    this.setState(prevState => {

      let nodes = prevState.categories;
      nodes[0].visible = !nodes[0].visible;

      return {
        categories: nodes,
        isEditCategories: !prevState.isEditCategories,
      }
    });

  }*/

  onAddCategory(newCategory){
    let newCategories = this.state.categories;
    newCategories = newCategories.concat([newCategory]);

    this.setState({
      categories: newCategories,
    });
  }

  getTasksForShow(){

    let tasks;
    let filter = this.state.searchParameters;

    if(this.state.isFilterMode) {

      tasks = this.state.tasks.filter((task) => {

        let taskName = task.taskName.toLowerCase();
        let filterName = filter.taskName.toLowerCase();

        if(!filter.isDone && !filter.taskName) {
          return true;
        }
        else if(!filter.isDone && taskName.includes(filterName)) {
          return true
        }
        else if(filter.isDone === task.isDone && !filter.taskName) {
          return true;
        }
        else if(filter.isDone === task.isDone && taskName.includes(filterName)) {
          return true;
        }
        else return false;
      });

    } else {
      tasks = this.state.tasks;
    }

    return tasks;
  }

  onCheckEditMode(task){
    this.setState((prevState) => {
      let isEditMode = !prevState.isEditMode;
      let newTitle = '';
      if(isEditMode && task){
        newTitle = 'Edit "' + task.taskName + '" Task';
      }else{
        newTitle = 'To-Do List';
      }

      return {
        isEditMode: isEditMode,
        title: newTitle,
        editTask: task,
      }
    });
  }

  onAddTask(task){
    let newTasks = this.state.tasks;
    newTasks = newTasks.concat([task]);

    this.setState({
      tasks: newTasks,
      completed: this.getProgress(newTasks),
    });
  }

  onEditTask(editTask){
    let newTasks = this.state.tasks;
    newTasks[editTask.id - 1] = editTask;

    this.setState(prevState => {
      return {
        tasks: newTasks,
        isEditMode: !prevState.isEditMode,
        completed: this.getProgress(newTasks),
      }
    });
  }

  onGetSearchParameters(searchParameters){
    this.setState({
      searchParameters,
      isFilterMode: true,
    });
  }

  getProgress(tasks){
    let doneCount = tasks.reduce((sum, task) => {
      return sum + task.isDone;
    }, 0);

    return Math.round(100 * doneCount / tasks.length);
  }

}
