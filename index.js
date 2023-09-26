const readlineSync = require('readline');
const cmd = readlineSync.createInterface({
    input: process.stdin,
    output: process.stdout
});
const taskList = [];
function showTasks() {
    if(taskList.length === 0){
        console.log('Not tasks to show.');
    } else {
        console.log('Tasks:');
        taskList.forEach((task, index) => {
            console.log(`${index + 1}. [${task.Completed ? 'X' : ' '}] ${task.text}`);
        });
    }
}
function createTask(text) {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            const newTask = { text, Completed: false};
            taskList.push(newTask);
            resolve(newTask);
        }, 3000);
    })
}
function completeTask(index) {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            if (index >= 0 && index < taskList.length) {
                taskList[index].Completed = true;
                resolve(taskList[index]);
            } else {
                reject('Invalid Index');
            }
        }, 3000);
    });
}
function deleteTask(index) {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            if (index >= 0 && index < taskList.length){
                const deletedTask = taskList.splice(index, 1)[0];
                resolve(deletedTask);
            } else {
                reject('Invalid index');
            }
        }, 3000);
    });
}
function start() {
    cmd.question('¿What do you want to do? (create/delete/complete/show/exit):', async (action) => {
        switch (action) {
            case 'create':
                cmd.question('Write task that you want to create: ', async (text) => {
                    try {
                        const newTask = await createTask(text);
                        console.log(`Task created: ${newTask.text}`);
                    } catch (error) {
                        console.error(error);
                    }
                    start();
                });
                break;
            
                case 'delete':
                    showTasks();
                    cmd.question('Write the number task that you want to delete: ', async (index) => {
                        try {
                            const deletedTask = await deleteTask(index - 1);
                            console.log(`Task deleted: ${deletedTask.text}`);
                        } catch (error) {
                            console.error(error);
                        }
                        start();
                    });
                    break;  

                    case 'complete':
                        showTasks();
                        cmd.question('Write number task that you want to complete ', async (index) => {
                            try{
                                const completedTask = await completeTask(index - 1);
                                console.log(`Task completed: ${completedTask.text}`);
                            } catch (error) {
                                console.error(error);
                            }
                            start();
                        });
                        break;

                    case 'show':
                        showTasks();
                        start();
                        break;

                    case 'exit':
                        cmd.close();
                        break;

                    default:
                        console.log('Invalid command');
                        start();
                        break;
                }
        });
    }

    start();
    
    
