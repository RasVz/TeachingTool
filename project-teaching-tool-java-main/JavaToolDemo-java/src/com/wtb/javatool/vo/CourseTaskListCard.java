package com.wtb.javatool.vo;

import lombok.Data;

@Data
public class CourseTaskListCard {
    private Long projectId;
    private String projectName;
    private Integer finishTask;
    private Integer unfinishedTask;
}
