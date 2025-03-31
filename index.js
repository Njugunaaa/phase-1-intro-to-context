// Your code here
function createEmployeeRecord([firstName,familyName,title,payPerHour]){
  const employee={
    firstName: firstName,
    familyName: familyName,
    title: title,
    payPerHour: payPerHour,
    timeInEvents:[],
    timeOutEvents:[]
  }
  return employee
}

function createEmployeeRecords(arrayOfArrays){
  const newArray=[]
  
  for (let i = 0; i < arrayOfArrays.length; i++){
    const employees=arrayOfArrays[i]
    const newemployee=createEmployeeRecord(employees)
    newArray.push(newemployee)
  }
  return newArray
}
function createTimeInEvent(employee, dateStamp){
  const hour = parseInt(dateStamp.slice(11, 15),10);
  const date = dateStamp.slice(0, 10);
  employee.timeInEvents.push({
    type: "TimeIn",
    hour: hour,
    date: date,
  });
  return employee;
}

function createTimeOutEvent(employee, dateStamp){
  const hour = parseInt(dateStamp.slice(11, 15),10);
  const date = dateStamp.slice(0, 10);
  employee.timeOutEvents.push({
    type: "TimeOut",
    hour: hour,
    date: date,
  });
  return employee;
}
function hoursWorkedOnDate(employee, date) {
  let timeInEvent = employee.timeInEvents.find(event => event.date === date);
  let timeOutEvent = employee.timeOutEvents.find(event => event.date === date);

  if (!timeInEvent || !timeOutEvent) return 0;

  let timeInHour = timeInEvent.hour / 100;
  let timeOutHour = timeOutEvent.hour / 100;

  return timeOutHour - timeInHour;
}
function wagesEarnedOnDate(employee, date){
  const hours=hoursWorkedOnDate(employee,date)
  return hours*employee.payPerHour
}

function allWagesFor(employee) {
  let totalWages = 0;
  const dates = new Set();

  for (let event of employee.timeInEvents) {
    dates.add(event.date);
  }

  for (let date of dates) {
    totalWages += wagesEarnedOnDate(employee, date);
  }

  return totalWages;
}

function calculatePayroll(employees) {
  let totalPayroll = 0;
  for (let employee of employees) {
    totalPayroll += allWagesFor(employee);
  }
  return totalPayroll;
}