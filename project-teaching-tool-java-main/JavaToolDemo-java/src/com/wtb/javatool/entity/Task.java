package com.wtb.javatool.entity;

import lombok.Data;

@Data
public class Task {
    private Long taskId;
    private String taskName;
    private Long projectId;
    private String taskType;
    private String createTime;
    private String taskDescription;
    private Long creatorId;
    private Integer preTaskId;
    private Integer postTaskId;
    private Integer moduleId;
}