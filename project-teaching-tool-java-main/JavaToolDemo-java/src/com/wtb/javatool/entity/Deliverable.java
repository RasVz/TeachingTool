package com.wtb.javatool.entity;

import lombok.Data;

@Data
public class Deliverable {
    private Long deliverableId;
    private String deliverableName;
    private String deliverableUrl;
    private Long taskId;

    public Deliverable(Long deliverableId, String deliverableName){
        this.deliverableId = deliverableId;
        this.deliverableName = deliverableName;
    }
}
