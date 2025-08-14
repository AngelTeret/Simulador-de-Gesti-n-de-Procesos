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

function updateMemoryUI() {
  memoryUsedSpan.textContent = memoryUsed;
  memoryAvailableSpan.textContent = TOTAL_MEMORY - memoryUsed;
  memoryBarUsed.style.width = `${(memoryUsed / TOTAL_MEMORY) * 100}%`;
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

function updateUI() {
  updateMemoryUI();  
  renderRunning(); 
}