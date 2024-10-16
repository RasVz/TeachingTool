package com.wtb.javatool.vo;

import lombok.Data;

@Data
public class TeacherCourseProjectClassProject {
    private Long teacherId;
    private String teacherName;
    private Long courseId;
    private String courseName;
    private Long projectId;
    private String projectName;
    private Long moduleId;
    private String moduleName;
    private Long projectClassId;
    private String projectClassName;
    private String academicYear;
    private Integer semester;
    private Integer lesson;
}
