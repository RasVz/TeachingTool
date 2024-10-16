package com.wtb.javatool.dto;

import com.wtb.javatool.entity.Project;
import com.wtb.javatool.entity.Task;
import lombok.Data;

import java.util.ArrayList;
import java.util.Date;
import java.util.List;
@Data
public class ProjectDto {
    private Long projectId;
    private String projectName;
    private String projectDescription;
    private Date createTime;
    private Date startTime;
    private Date finshTime;
    private Date endTime;
    private Long creatorId;
    private String mangerName;
    private Double projectCost;
    private String tasks;
    private List<Task> TaskList;


}
