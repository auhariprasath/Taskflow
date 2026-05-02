package com.taskflow.backend.service;

import com.taskflow.backend.dto.TaskRequest;
import com.taskflow.backend.dto.TaskResponse;
import com.taskflow.backend.entity.Task;
import com.taskflow.backend.repository.TaskRepository;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;
import java.util.stream.Collectors;

@Service
public class TaskService {

    private final TaskRepository taskRepository;

    public TaskService(TaskRepository taskRepository) {
        this.taskRepository = taskRepository;
    }

    public TaskResponse createTask(TaskRequest request) {
        Task task = new Task();
        task.setTitle(request.getTitle());
        task.setDescription(request.getDescription());
        task.setStatus(request.getStatus() != null ? request.getStatus() : Task.TaskStatus.TODO);
        task.setPriority(request.getPriority() != null ? request.getPriority() : Task.TaskPriority.MEDIUM);
        task.setDueDate(request.getDueDate());

        Task savedTask = taskRepository.save(task);
        return mapToResponse(savedTask);
    }

    public Page<TaskResponse> getTasks(int page, int size, String status, String priority, String sortBy) {
        Pageable pageable = PageRequest.of(page, size, Sort.by(sortBy != null ? sortBy : "createdAt").descending());
        Page<Task> tasks = taskRepository.findAll(pageable);
        return tasks.map(this::mapToResponse);
    }

    public List<TaskResponse> getAllTasks() {
        return taskRepository.findAllByOrderByCreatedAtDesc()
                .stream()
                .map(this::mapToResponse)
                .collect(Collectors.toList());
    }

    public TaskResponse getTaskById(String id) {
        Task task = taskRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Task not found"));
        return mapToResponse(task);
    }

    public TaskResponse updateTask(String id, TaskRequest request) {
        Task task = taskRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Task not found"));

        if (request.getTitle() != null) task.setTitle(request.getTitle());
        if (request.getDescription() != null) task.setDescription(request.getDescription());
        if (request.getStatus() != null) task.setStatus(request.getStatus());
        if (request.getPriority() != null) task.setPriority(request.getPriority());
        if (request.getDueDate() != null) task.setDueDate(request.getDueDate());
        
        task.setUpdatedAt(LocalDateTime.now());
        Task updatedTask = taskRepository.save(task);
        return mapToResponse(updatedTask);
    }

    public TaskResponse updateTaskStatus(String id, Task.TaskStatus status) {
        Task task = taskRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Task not found"));

        task.setStatus(status);
        task.setUpdatedAt(LocalDateTime.now());
        Task updatedTask = taskRepository.save(task);
        return mapToResponse(updatedTask);
    }

    public void deleteTask(String id) {
        Task task = taskRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Task not found"));
        taskRepository.delete(task);
    }

    public TaskStats getTaskStats() {
        long total = taskRepository.count();
        long todo = taskRepository.countByStatus(Task.TaskStatus.TODO);
        long inProgress = taskRepository.countByStatus(Task.TaskStatus.IN_PROGRESS);
        long done = taskRepository.countByStatus(Task.TaskStatus.DONE);
        long high = taskRepository.countByPriority(Task.TaskPriority.HIGH);
        long overdue = taskRepository.findByDueDateBeforeAndStatusNot(LocalDateTime.now(), Task.TaskStatus.DONE).size();

        return new TaskStats(total, todo, inProgress, done, high, overdue);
    }

    private TaskResponse mapToResponse(Task task) {
        return TaskResponse.builder()
                .id(task.getId())
                .title(task.getTitle())
                .description(task.getDescription())
                .status(task.getStatus())
                .priority(task.getPriority())
                .dueDate(task.getDueDate())
                .createdAt(task.getCreatedAt())
                .updatedAt(task.getUpdatedAt())
                .build();
    }

    public record TaskStats(long total, long todo, long inProgress, long done, long high, long overdue) {}
}