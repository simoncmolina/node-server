const readlineSync = require('readline');
const readline = require('readline-sync');
const cmd = readlineSync.createInterface(process.stdin,process.stdout);
console.log('::: TASKS LIST :::');
var options = ['Add','Complete','Show'];
var index = readline.keyInSelect(options, 'Choose an option: ');
const taskList = [];
if(index === 1){
    console.log('Entrando a Añadir tarea...')
    let indicator = readline.question('Enter the task indicator: ');
    let description = readline.question('Enter the task description: ');
    addTask(indicator, description);
    cmd.prompt();
        
    
} else if(index === 2){
    var indicator = readline.question('Enter the task indicator: ');
    Completed(indicator);
    cmd.prompt();
    
} else if(index === 3) {
    showTasks();
    cmd.prompt();
}

function addTask(indicator, description) {
    const task = {
        Ind : indicator,
        Desc : description,
        Status : 'Pending'
    };
    taskList.push(task);
    console.log('Task succesfully added.');
}

function Completed(indicator){
    const task = taskList.find(t => t.indicator === indicator);
    if(task) {
        task.Status = 'Completed';
        console.log('Task completed. ');
    } else {
        console.log('Task is not founded. ');
    }
}

function showTasks(){
    if(taskList.length === 0){
        console.log("Tasks List empty.");
    } else {
        taskList.forEach(t => {
            console.log(`Indicador: ${t.Ind}`);
            console.log(`Description: ${t.Desc}`);
            console.log(`Status: ${t.Status}`);
            console.log("....................");
        });
    }
}

