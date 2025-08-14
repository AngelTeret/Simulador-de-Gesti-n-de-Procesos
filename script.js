const TOTAL_MEMORY = 1024; // 1 GB en MB
let memoryUsed = 0;
let nextPid = 1;

// DOM cache
const memoryUsedSpan = document.getElementById('memoryUsed');
const memoryAvailableSpan = document.getElementById('memoryAvailable');
const memoryBarUsed = document.getElementById('memoryBarUsed');
const runningProcessesTable = document.querySelector('#runningProcessesTable tbody');
const waitingQueueTable = document.querySelector('#waitingQueueTable tbody');
const eventLog = document.getElementById('eventLog');
const processForm = document.getElementById('processForm');
const randomProcessBtn = document.getElementById('randomProcessBtn');

// Estado
let runningProcesses = [];
let waitingQueue = [];

// Modelo
class Process {
  constructor(name, memory, duration) {
    this.pid = nextPid++;
    this.name = name || `Proceso-${this.pid}`;
    this.memory = parseInt(memory);
    this.duration = parseInt(duration);
    this.remainingTime = this.duration;
  }
}

function updateMemoryUI() {
  memoryUsedSpan.textContent = memoryUsed;
  memoryAvailableSpan.textContent = TOTAL_MEMORY - memoryUsed;
  memoryBarUsed.style.width = `${(memoryUsed / TOTAL_MEMORY) * 100}%`;
}


function updateUI() {
  updateMemoryUI();   
}