package com.wtb.javatool.entity;

import lombok.Data;

import java.util.Date;

@Data
public class Course {
    private Long courseId;
    private Long bandId;
    private String courseName;
    private String courseDescription;
    private byte courseImage;
    private String createTime;
    private Long creatorId;
    private Integer courseStatus;
    private Long subjectId;
    private Integer experimentTime;
    private Integer practiceTime;
    private Integer theoryTime;
    private Integer projectDrivenTeaching;
}
