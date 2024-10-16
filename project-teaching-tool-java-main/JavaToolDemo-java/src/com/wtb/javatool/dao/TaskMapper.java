package com.wtb.javatool.dao;

import com.wtb.javatool.common.R;
import com.wtb.javatool.dto.TaskDto;
import com.wtb.javatool.entity.Deliverable;
import com.wtb.javatool.entity.Task;
import com.wtb.javatool.vo.TaskStatusMessage;
import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Param;

import java.util.List;

@Mapper
public interface TaskMapper {
    void addTask(Task task);

    List<Task> selectTaskById(List<String> task);

    void deleteTaskById(List<String> taskId);


    List<TaskDto> selectTaskByProjectId(Long projectId);

    List<TaskDto> findTasksByCourseId( @Param("courseId")Long courseId);

    int createTask(Task task);

    void addDeliverable(@Param("list") List<Deliverable> deliverable,@Param("taskId") Long taskId);

    List<TaskStatusMessage> findTaskStatus(Long courseId);
}
