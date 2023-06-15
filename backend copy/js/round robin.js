class Process {
	constructor(name, arrivalTime, burstTime) {
	  this.name = name;
	  this.arrivalTime = arrivalTime;
	  this.burstTime = burstTime;
	  this.remainingTime = burstTime;
	}
  }
  
  function roundRobin(processes, quantum) {
	let waitingTime = 0;
	let turnaroundTime = 0;
	let currentTime = 0;
  
	while (processes.length > 0) {
	  let currentProcess = processes.shift();
  
	  if (currentProcess.remainingTime <= quantum) {
		currentTime += currentProcess.remainingTime;
		turnaroundTime += currentTime - currentProcess.arrivalTime;
		waitingTime += currentTime - currentProcess.arrivalTime - currentProcess.burstTime;
	  } else {
		currentTime += quantum;
		currentProcess.remainingTime -= quantum;
  
		processes.push(currentProcess);
	  }
	}
  
	let avgWaitingTime = waitingTime / processes.length;
	let avgTurnaroundTime = turnaroundTime / processes.length;
  
	return {
	  waitingTime: waitingTime,
	  turnaroundTime: turnaroundTime,
	  avgWaitingTime: avgWaitingTime,
	  avgTurnaroundTime: avgTurnaroundTime,
	};
  }
  
  // Example usage
  let processes = [
	new Process("P1", 0, 8),
	new Process("P2", 1, 4),
	new Process("P3", 2, 9),
  ];
  
  let quantum = 3;
  let results = roundRobin(processes, quantum);
  
  console.log("Waiting time: " + results.waitingTime);
  console.log("Turnaround time: " + results.turnaroundTime);
  console.log("Average waiting time: " + results.avgWaitingTime);
  console.log("Average turnaround time: " + results.avgTurnaroundTime);