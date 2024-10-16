package com.wtb.javatool.entity;

import com.fasterxml.jackson.annotation.JsonFormat;
import com.wtb.javatool.model.ProjectStatusEnum;
import lombok.Data;
import org.springframework.lang.Nullable;

import java.io.Serializable;
import java.math.BigDecimal;
import java.time.LocalDateTime;
import java.util.Date;

@Data
public class Project implements Serializable {
    private Long projectId;
    private String projectName;
    private String projectDescription;
    private ProjectStatusEnum projectStatus;
    @JsonFormat(pattern = "yyyy-MM-dd HH:mm:ss")
    private Date createTime;
    @JsonFormat(pattern = "yyyy-MM-dd HH:mm:ss")
    private Date startTime;
    @JsonFormat(pattern = "yyyy-MM-dd HH:mm:ss")
    private Date finishTime;
    @JsonFormat(pattern = "yyyy-MM-dd HH:mm:ss")
    private Date endTime;
    private Integer creatorId;
    private BigDecimal projectCost;

    public Project(Long projectId, String projectName){
        this.projectId = projectId;
        this.projectName = projectName;
    }
}
