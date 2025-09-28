import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { Auth } from '../../services/auth.service';
import { TaskService } from '../../services/task.service';
import { Task, TaskRequest, TaskStatus } from '../../models/task.model';
import { User } from '../../models/auth.model';

@Component({
  selector: 'app-dashboard',
  imports: [CommonModule, FormsModule],
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  currentUser: User | null = null;
  tasks: Task[] = [];
  isLoading = false;
  errorMessage = '';

  // New task form
  showNewTaskForm = false;
  newTask: TaskRequest = {
    title: '',
    description: ''
  };

  // Edit task
  editingTaskId: number | null = null;
  editTask: TaskRequest = {
    title: '',
    description: ''
  };

  constructor(
    private authService: Auth,
    private taskService: TaskService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.currentUser = this.authService.getCurrentUser();
    if (!this.currentUser) {
      this.router.navigate(['/login']);
      return;
    }
    this.loadTasks();
  }

  loadTasks(): void {
    this.isLoading = true;
    this.taskService.getAllTasks().subscribe({
      next: (tasks) => {
        this.tasks = tasks;
        this.isLoading = false;
      },
      error: (error) => {
        this.errorMessage = 'Failed to load tasks';
        this.isLoading = false;
      }
    });
  }

  onCreateTask(): void {
    if (!this.newTask.title.trim()) {
      return;
    }

    this.taskService.createTask(this.newTask).subscribe({
      next: (task) => {
        this.tasks.push(task);
        this.newTask = { title: '', description: '' };
        this.showNewTaskForm = false;
      },
      error: (error) => {
        this.errorMessage = 'Failed to create task';
      }
    });
  }

  onEditTask(task: Task): void {
    this.editingTaskId = task.id!;
    this.editTask = {
      title: task.title,
      description: task.description || ''
    };
  }

  onUpdateTask(): void {
    if (!this.editTask.title.trim() || !this.editingTaskId) {
      return;
    }

    this.taskService.updateTask(this.editingTaskId, this.editTask).subscribe({
      next: (updatedTask) => {
        const index = this.tasks.findIndex(t => t.id === this.editingTaskId);
        if (index !== -1) {
          this.tasks[index] = updatedTask;
        }
        this.cancelEdit();
      },
      error: (error) => {
        this.errorMessage = 'Failed to update task';
      }
    });
  }

  onToggleTaskStatus(task: Task): void {
    const newStatus = task.status === TaskStatus.PENDING ? TaskStatus.COMPLETED : TaskStatus.PENDING;
    const updateRequest: TaskRequest = {
      title: task.title,
      description: task.description,
      status: newStatus
    };

    this.taskService.updateTask(task.id!, updateRequest).subscribe({
      next: (updatedTask) => {
        const index = this.tasks.findIndex(t => t.id === task.id);
        if (index !== -1) {
          this.tasks[index] = updatedTask;
        }
      },
      error: (error) => {
        this.errorMessage = 'Failed to update task status';
      }
    });
  }

  onDeleteTask(taskId: number): void {
    if (confirm('Are you sure you want to delete this task?')) {
      this.taskService.deleteTask(taskId).subscribe({
        next: () => {
          this.tasks = this.tasks.filter(t => t.id !== taskId);
        },
        error: (error) => {
          this.errorMessage = 'Failed to delete task';
        }
      });
    }
  }

  cancelEdit(): void {
    this.editingTaskId = null;
    this.editTask = { title: '', description: '' };
  }

  cancelNewTask(): void {
    this.showNewTaskForm = false;
    this.newTask = { title: '', description: '' };
  }

  logout(): void {
    this.authService.logout();
    this.router.navigate(['/login']);
  }

  get pendingTasks(): Task[] {
    return this.tasks.filter(task => task.status === TaskStatus.PENDING);
  }

  get completedTasks(): Task[] {
    return this.tasks.filter(task => task.status === TaskStatus.COMPLETED);
  }
}