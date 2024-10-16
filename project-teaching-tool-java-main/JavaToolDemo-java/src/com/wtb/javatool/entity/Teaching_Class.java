package com.wtb.javatool.entity;

import lombok.Data;

@Data
public class Teaching_Class {
    private Long classId;

    private String className;
    private Integer semester;

    public Teaching_Class(Long classId, String className) {
        this.classId = classId;
        this.className = className;
    }
}
