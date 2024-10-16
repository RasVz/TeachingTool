package com.wtb.javatool.vo;

import com.fasterxml.jackson.annotation.JsonFormat;
import com.wtb.javatool.model.ProjectStatusEnum;
import lombok.Data;

import java.math.BigDecimal;
import java.time.LocalDateTime;
import java.util.Date;

@Data
public class CreateProject {
    private Integer projectId;
    private String projectName;
    private String projectDescription;
    private ProjectStatusEnum projectStatus;
    @JsonFormat(pattern = "yyyy-MM-dd HH:mm:ss")
    private Date createTime;
    @JsonFormat(pattern = "yyyy-MM-dd HH:mm:ss")
    private Date endTime;
    private Integer creatorId;
    private BigDecimal projectCost;
    // 企业id.获取时为1，2，3字符串，使用String类方法处理为[1，2，3]数组使用
    private String enterpriseId;
}
