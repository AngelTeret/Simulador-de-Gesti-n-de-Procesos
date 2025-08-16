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

processForm.addEventListener('submit', (e) => {
  e.preventDefault();
  const name = document.getElementById('processName').value;
  const memory = document.getElementById('processMemory').value;
  const duration = document.getElementById('processDuration').value;

  if (!memory || !duration || memory <= 0 || duration <= 0) {
    logEvent('Error: Memoria y duración deben ser mayores a 0.', 'danger');
    return;
  }

  const p = new Process(name, memory, duration);
  addProcess(p);
  processForm.reset();
});

randomProcessBtn.addEventListener('click', () => {
  const names = ['Chrome', 'Firefox', 'Node', 'Python', 'Excel', 'Word', 'Photoshop', 'VSCode', 'Spotify', 'Zoom'];
  const name = names[Math.floor(Math.random() * names.length)];
  const memory = Math.floor(Math.random() * 200) + 50; // 50-250 MB
  const duration = Math.floor(Math.random() * 20) + 5; // 5-25 seg
  addProcess(new Process(name, memory, duration));
});

function addProcess(process) {
  if (memoryUsed + process.memory <= TOTAL_MEMORY) {
    runningProcesses.push(process);
    memoryUsed += process.memory;
    logEvent(`Proceso ${process.name} (PID: ${process.pid}) iniciado.`, 'success');
  } else {
    waitingQueue.push(process);
    logEvent(`Proceso ${process.name} (PID: ${process.pid}) en cola de espera.`, 'warning');
  }
  updateUI();
}

setInterval(() => {
  // “tick” de simulación
  runningProcesses.forEach((process, index) => {
    process.remainingTime--;
    if (process.remainingTime <= 0) {
      memoryUsed -= process.memory;
      logEvent(`Proceso ${process.name} (PID: ${process.pid}) finalizado.`, 'info');
      runningProcesses.splice(index, 1);
      checkWaitingQueue();
    }
  });
  updateUI();
}, 1000);

function updateMemoryUI() {
  memoryUsedSpan.textContent = memoryUsed;
  memoryAvailableSpan.textContent = TOTAL_MEMORY - memoryUsed;
  updateMemoryBar(memoryUsed, TOTAL_MEMORY);
}

function renderRunning() {
  runningProcessesTable.innerHTML = runningProcesses
    .map(
      (p) => `
      <tr>
        <td>${p.pid}</td>
        <td>${p.name}</td>
        <td>${p.memory}</td>
        <td>${p.duration}</td>
        <td>${p.remainingTime}</td>
        <td>
          <div class="progress-bar">
            <div class="progress" style="width:${((p.duration - p.remainingTime) / p.duration) * 100}%"></div>
          </div>
        </td>
      </tr>`
    )
    .join('');
}

function renderWaiting() {
  waitingQueueTable.innerHTML = waitingQueue
    .map(
      (p) => `
      <tr>
        <td>${p.pid}</td>
        <td>${p.name}</td>
        <td>${p.memory}</td>
        <td>${p.duration}</td>
      </tr>`
    )
    .join('');
}

function checkWaitingQueue() {
  if (waitingQueue.length > 0 && memoryUsed + waitingQueue[0].memory <= TOTAL_MEMORY) {
    const nextProcess = waitingQueue.shift();
    runningProcesses.push(nextProcess);
    memoryUsed += nextProcess.memory;
    logEvent(`Proceso ${nextProcess.name} (PID: ${nextProcess.pid}) iniciado desde cola.`, 'success');
  }
}

function logEvent(message, type = 'info') {
  const now = new Date().toLocaleTimeString();
  const p = document.createElement('p');
  p.className = `log-${type}`;
  p.innerHTML = `<strong>[${now}]</strong> ${message}`;
  eventLog.prepend(p);
}

function updateMemoryBar(used, total) {
  const arc = document.getElementById('memoryArc');
  const display = document.getElementById('memoryUsedDisplay');
  const percent = used / total;

  display.textContent = used;

  const circumference = 2 * Math.PI * 80; // 2 * π * r
  const offset = circumference * (1 - percent);
  arc.style.strokeDashoffset = offset;

  // Cambiar color y glow dinámicamente
  if (percent < 0.5) {
    arc.style.stroke = '#4caf50';
    display.style.color = '#4caf50';
    display.style.textShadow = '0 0 6px #4caf50, 0 0 12px #4caf50';
  } else if (percent < 0.8) {
    arc.style.stroke = '#ffc107';
    display.style.color = '#ffc107';
    display.style.textShadow = '0 0 6px #ffc107, 0 0 12px #ffc107';
  } else {
    arc.style.stroke = '#f44336';
    display.style.color = '#f44336';
    display.style.textShadow = '0 0 6px #f44336, 0 0 12px #f44336';
  }
}


function updateUI() {
  updateMemoryUI();
  renderRunning();
  renderWaiting();
}