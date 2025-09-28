package com.taskmanager.backend.service;

import com.taskmanager.backend.dto.TaskRequest;
import com.taskmanager.backend.dto.TaskResponse;
import com.taskmanager.backend.entity.Task;
import com.taskmanager.backend.entity.TaskStatus;
import com.taskmanager.backend.entity.User;
import com.taskmanager.backend.repository.TaskRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
public class TaskService {
    
    @Autowired
    private TaskRepository taskRepository;
    
    public TaskResponse createTask(TaskRequest request, User user) {
        Task task = new Task();
        task.setTitle(request.getTitle());
        task.setDescription(request.getDescription());
        task.setUser(user);
        
        if (request.getStatus() != null) {
            try {
                task.setStatus(TaskStatus.valueOf(request.getStatus().toUpperCase()));
            } catch (IllegalArgumentException e) {
                // Default to PENDING if invalid status
            }
        }
        
        Task savedTask = taskRepository.save(task);
        return convertToResponse(savedTask);
    }
    
    public List<TaskResponse> getAllTasksForUser(User user) {
        List<Task> tasks = taskRepository.findByUser(user);
        return tasks.stream()
                .map(this::convertToResponse)
                .collect(Collectors.toList());
    }
    
    public Optional<TaskResponse> getTaskById(Long id, User user) {
        Optional<Task> task = taskRepository.findByIdAndUser(id, user);
        return task.map(this::convertToResponse);
    }
    
    public Optional<TaskResponse> updateTask(Long id, TaskRequest request, User user) {
        Optional<Task> taskOpt = taskRepository.findByIdAndUser(id, user);
        
        if (taskOpt.isPresent()) {
            Task task = taskOpt.get();
            task.setTitle(request.getTitle());
            task.setDescription(request.getDescription());
            
            if (request.getStatus() != null) {
                try {
                    task.setStatus(TaskStatus.valueOf(request.getStatus().toUpperCase()));
                } catch (IllegalArgumentException e) {
                    // Keep current status if invalid
                }
            }
            
            Task savedTask = taskRepository.save(task);
            return Optional.of(convertToResponse(savedTask));
        }
        
        return Optional.empty();
    }
    
    public boolean deleteTask(Long id, User user) {
        Optional<Task> task = taskRepository.findByIdAndUser(id, user);
        if (task.isPresent()) {
            taskRepository.delete(task.get());
            return true;
        }
        return false;
    }
    
    private TaskResponse convertToResponse(Task task) {
        return new TaskResponse(
                task.getId(),
                task.getTitle(),
                task.getDescription(),
                task.getStatus().toString()
        );
    }
}
