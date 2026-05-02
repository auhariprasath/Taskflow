package com.taskflow.backend.repository;

import com.taskflow.backend.entity.Task;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

import java.time.LocalDateTime;
import java.util.List;

@Repository
public interface TaskRepository extends MongoRepository<Task, String> {
    Page<Task> findAll(Pageable pageable);
    
    List<Task> findAllByOrderByCreatedAtDesc();
    
    List<Task> findByStatus(Task.TaskStatus status);
    
    List<Task> findByPriority(Task.TaskPriority priority);
    
    long countByStatus(Task.TaskStatus status);
    
    long countByPriority(Task.TaskPriority priority);
    
    List<Task> findByDueDateBeforeAndStatusNot(LocalDateTime now, Task.TaskStatus status);
}