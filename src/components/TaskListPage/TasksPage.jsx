import React from 'react';

import IconButton from 'material-ui/lib/icon-button';
import ContentAdd from 'material-ui/lib/svg-icons/content/add';

import Task from './Task.jsx';

import './TasksPage.less';

const ENTER_KEY = 13;
const ESC_KEY = 27;

const TasksPage = React.createClass({
    getInitialState() {
        return {
            isEditingTaskList: false
        };
    },

    handleEditTaskList() {
        this.setState({
            isEditingTaskList: true
        }, () => this.taskList.focus() );
    },

    handleSubmitTaskList() {
        this.saveTaskList();
    },

    handleTaskListEditKeyDown(e) {
        if (e.keyCode === ENTER_KEY) {
            this.saveTaskList();
        }

        if (e.keyCode === ESC_KEY) {
            this.cancelEditingTaskList();
        }
    },

    saveTaskList() {
        this.props.onUpdateTaskList({
            name: this.taskList.value
        });

        this.cancelEditingTaskList();
    },

    cancelEditingTaskList() {
        this.setState({ isEditingTaskList: false });
    },

    renderTasks() {
        return (
            <div className='tasks-page__tasks'>
                {
                    this.props.tasks.map(task =>
                        <Task
                            key={task.id}
                            text={task.text}
                            note={task.note}
                            due={task.due}
                            isCompleted={task.isCompleted}
                            onDelete={this.props.onTaskDelete.bind(null, task.id)}
                            onStatusChange={this.props.onTaskStatusChange.bind(null, task.id)}
                            onUpdate={this.props.onTaskUpdate.bind(null, task.id)}
                        />
                    )
                }
            </div>
        );
    },

    render() {
        if (this.props.error) {
            return (
                <div className='tasks-page'>
                    <div className='tasks-page__error'>
                        {this.props.error}
                    </div>
                </div>
            );
        }

        return (
            <div className='tasks-page'>
                <div className='tasks-page__header'>
                    {
                        this.state.isEditingTaskList
                            ?
                            <input
                                ref={c => this.taskList = c}
                                className='tasks-page__title-input'
                                defaultValue={this.props.taskList.name}
                                onKeyDown={this.handleTaskListEditKeyDown}
                                onBlur={this.cancelEditingTaskList}
                            />
                            :
                            <h2
                                className='tasks-page__title'
                                onClick={this.handleEditTaskList}
                            >
                                {this.props.taskList.name}
                            </h2>
                    }

                    <div className='tasks-page__tools'>
                        <IconButton onClick={this.props.onAddTask}>
                            <ContentAdd />
                        </IconButton>
                        <IconButton onClick={this.props.onDeleteTaskList}>
                            <ActionDelete />
                        </IconButton>
                    </div>
                </div>

                {
                    this.props.isLoadingTasks
                        ?
                        <CircularProgress />
                        :
                        this.renderTasks()
                }
            </div>
        );
    }
});

export default TasksPage;
