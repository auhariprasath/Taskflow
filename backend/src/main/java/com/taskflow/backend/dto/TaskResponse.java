package com.taskflow.backend.dto;

import com.taskflow.backend.entity.Task;

import java.time.LocalDateTime;

public class TaskResponse {
    private String id;
    private String title;
    private String description;
    private Task.TaskStatus status;
    private Task.TaskPriority priority;
    private LocalDateTime dueDate;
    private LocalDateTime createdAt;
    private LocalDateTime updatedAt;

    public TaskResponse() {}

    public TaskResponse(String id, String title, String description, 
                        Task.TaskStatus status, Task.TaskPriority priority, 
                        LocalDateTime dueDate, LocalDateTime createdAt, LocalDateTime updatedAt) {
        this.id = id;
        this.title = title;
        this.description = description;
        this.status = status;
        this.priority = priority;
        this.dueDate = dueDate;
        this.createdAt = createdAt;
        this.updatedAt = updatedAt;
    }

    public static TaskResponseBuilder builder() {
        return new TaskResponseBuilder();
    }

    public String getId() { return id; }
    public void setId(String id) { this.id = id; }
    
    public String getTitle() { return title; }
    public void setTitle(String title) { this.title = title; }
    
    public String getDescription() { return description; }
    public void setDescription(String description) { this.description = description; }
    
    public Task.TaskStatus getStatus() { return status; }
    public void setStatus(Task.TaskStatus status) { this.status = status; }
    
    public Task.TaskPriority getPriority() { return priority; }
    public void setPriority(Task.TaskPriority priority) { this.priority = priority; }
    
    public LocalDateTime getDueDate() { return dueDate; }
    public void setDueDate(LocalDateTime dueDate) { this.dueDate = dueDate; }
    
    public LocalDateTime getCreatedAt() { return createdAt; }
    public void setCreatedAt(LocalDateTime createdAt) { this.createdAt = createdAt; }
    
    public LocalDateTime getUpdatedAt() { return updatedAt; }
    public void setUpdatedAt(LocalDateTime updatedAt) { this.updatedAt = updatedAt; }

    public static class TaskResponseBuilder {
        private String id;
        private String title;
        private String description;
        private Task.TaskStatus status;
        private Task.TaskPriority priority;
        private LocalDateTime dueDate;
        private LocalDateTime createdAt;
        private LocalDateTime updatedAt;

        public TaskResponseBuilder id(String id) { this.id = id; return this; }
        public TaskResponseBuilder title(String title) { this.title = title; return this; }
        public TaskResponseBuilder description(String description) { this.description = description; return this; }
        public TaskResponseBuilder status(Task.TaskStatus status) { this.status = status; return this; }
        public TaskResponseBuilder priority(Task.TaskPriority priority) { this.priority = priority; return this; }
        public TaskResponseBuilder dueDate(LocalDateTime dueDate) { this.dueDate = dueDate; return this; }
        public TaskResponseBuilder createdAt(LocalDateTime createdAt) { this.createdAt = createdAt; return this; }
        public TaskResponseBuilder updatedAt(LocalDateTime updatedAt) { this.updatedAt = updatedAt; return this; }
        public TaskResponse build() { 
            return new TaskResponse(id, title, description, status, priority, dueDate, createdAt, updatedAt); 
        }
    }
}