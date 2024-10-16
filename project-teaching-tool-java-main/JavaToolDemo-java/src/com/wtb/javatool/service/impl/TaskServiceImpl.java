package com.wtb.javatool.service.impl;

import com.alibaba.fastjson.JSONArray;
import com.fy.wetoband.http.utils.RequestUtil;
import com.wtb.javatool.common.R;
import com.wtb.javatool.common.TimeConversion;
import com.wtb.javatool.dao.TaskMapper;
import com.wtb.javatool.dto.TaskDto;
import com.wtb.javatool.entity.Deliverable;
import com.wtb.javatool.entity.Task;
import com.wtb.javatool.service.TaskService;
import com.wtb.javatool.vo.TaskStatusMessage;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import javax.servlet.http.HttpServletRequest;
import java.util.List;

@Service
public class TaskServiceImpl implements TaskService {
    @Autowired
    private TaskMapper taskMapper;
    //@Override
    //public R<Task> addTask(Task task) {
    //    task.setCreateTime(new Date());
    //    taskMapper.addTask(task);
    //    return R.success(task);
    //}

    @Override
    public R<List<Task>> deleteTask(List<String> taskId) {
        List<Task> tasks = taskMapper.selectTaskById(taskId);
        if (tasks.isEmpty()){
            return R.error("当前任务id不存在");
        }
        taskMapper.deleteTaskById(taskId);
        return R.success(tasks);
    }





    @Override
    public List<TaskDto> findTasksByCourseId(Long courseId) {
        List<TaskDto> taskDtos = taskMapper.findTasksByCourseId(courseId);
        for (TaskDto t : taskDtos) {
            t.setDeliverable();
            t.setTeam();
        }
        return taskDtos;
    }


    @Override
    public void createTask(HttpServletRequest request) {
        String taskName = RequestUtil.getStringParameter(request, "taskName");
        Long projectId = RequestUtil.getLongParameter(request,"projectId");
        String createTime = RequestUtil.getStringParameter(request, "createTime");
        Long creatorId = RequestUtil.getLongParameter(request, "creatorId");
        String taskDescription = RequestUtil.getStringParameter(request, "taskDescription");
        String taskType = RequestUtil.getStringParameter(request,"taskType");
        String deliverable = RequestUtil.getStringParameter(request,"deliverables");
        List<Deliverable> deliverables = JSONArray.parseArray(deliverable, Deliverable.class);

        Task task = new Task();
        task.setTaskName(taskName);
        task.setProjectId(projectId);
        task.setCreatorId(creatorId);
        task.setTaskDescription(taskDescription);
        task.setCreateTime(new TimeConversion().conversion(createTime));
        task.setTaskType(taskType);

        taskMapper.createTask(task);
        taskMapper.addDeliverable(deliverables,task.getTaskId());
    }

    @Override
    public R<List<TaskStatusMessage>> findTaskStatus(HttpServletRequest request) {
        Long courseId = RequestUtil.getLongParameter(request,"courseId");
        R<List<TaskStatusMessage>> taskStatusMessage = R.success(taskMapper.findTaskStatus(courseId));
        return taskStatusMessage;
    }
}
