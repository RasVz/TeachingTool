package com.wtb.javatool.service;

import com.wtb.javatool.common.R;
import com.wtb.javatool.dto.TaskDto;
import com.wtb.javatool.entity.Task;
import com.wtb.javatool.vo.TaskStatusMessage;

import javax.servlet.http.HttpServletRequest;
import java.util.List;

public interface TaskService {
    //R<Task> addTask(Task task);

    R<List<Task>> deleteTask(List<String> taskId);


    List<TaskDto> findTasksByCourseId(Long courseId);

    void createTask(HttpServletRequest request);

    R<List<TaskStatusMessage>> findTaskStatus(HttpServletRequest request);
}
