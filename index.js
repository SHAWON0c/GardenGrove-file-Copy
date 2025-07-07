class TaskScheduler {
  constructor(concurrencyLimit) {
    this._taskQueue = [];
    this._pausedTasks = [];
    this._activeTasks = [];
    this._concurrencyLimit = concurrencyLimit;
  }

  async scheduleTask(task, priority) {
    this._taskQueue.push({ task, priority });
    if (this._activeTasks.length < this._concurrencyLimit) {
      await this._processNextTask();
    }
  }

  pause() {
    for (const task of this._activeTasks) {
      task.pause();
      this._pausedTasks.push(task);
    }
    this._activeTasks = [];
  }

  resume() {
    for (const task of this._pausedTasks) {
      task.resume();
    }
    this._pausedTasks = [];
  }

  _processNextTask() {
    if (!this._taskQueue.length) return;
    const nextTask = this._getHighestPriorityTask();
    this._activeTasks.push(nextTask);
    nextTask.start();
  }

  _getHighestPriorityTask() {
    return this._taskQueue.sort((a, b) => b.priority - a.priority)[0].task;
  }
}
