package com.wtb.javatool.vo;

import lombok.Data;

@Data
public class TaskStatusMessage {
    private Long classId;
    private String className;
    private String teamName;
    private String studentName;
    private String taskName;
    private String taskDescription;
    private String endTime;
    private String taskStatus;
}
