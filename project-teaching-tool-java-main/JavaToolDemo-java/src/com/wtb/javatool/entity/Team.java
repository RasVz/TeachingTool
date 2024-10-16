package com.wtb.javatool.entity;

import lombok.Data;

@Data
public class Team {
    private Long teamId;
    private String teamName;
    private Long studentId;
    private Long classId;
    private String className;

    public Team(Long teamId, String teamName, Long classId, String className) {
        this.teamId = teamId;
        this.teamName = teamName;
        this.classId = classId;
        this.className = className;
    }
}
