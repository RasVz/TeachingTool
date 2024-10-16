package com.wtb.javatool.dto;

import com.wtb.javatool.entity.Project;
import lombok.Data;

import java.util.ArrayList;
import java.util.List;
@Data
public class CourseDto {
    private int count;
    private Long teacherId;
    private String teacherName;
    private Long courseId;
    private String courseName;
    private Integer courseType;
    private String projects;

    private List<Project> projectList;

    private Long projectClassId;
    private String projectClassName;
    private String academicYear;
    private Integer semester;
    private Integer lesson;

    public void setProject() {
        String[] parts = projects.split(",\\s*");
        projectList = new ArrayList<>();
        for (String part : parts) {
            // 使用短横线分割每个部分以获取projectId和projectName
            String[] idAndName = part.split("-", 2);
            if (idAndName.length == 2) {
                Long projectId = Long.parseLong(idAndName[0]);
                String projectName = idAndName[1];
                // 创建Project对象并添加到列表中
                projectList.add(new Project(projectId, projectName));
            }
        }
    }

}