package com.wtb.javatool.dto;

import com.wtb.javatool.entity.Deliverable;
import com.wtb.javatool.entity.Team;
import lombok.Data;

import java.util.ArrayList;
import java.util.Date;
import java.util.List;

@Data
public class TaskDto {
    private Long taskId;
    private String taskName;
    private String taskDescription;
    private String projectName;
    private Date createTime;
    private Date startTime;
    private Date finshTime;
    private Date endTime;
    private Long creatorId;
    private String mangerName;
    private String deliverables;
    private List<Deliverable> deliverableList;
    private String teams;
    private List <Team> teamList;
    public void setDeliverable() {
        if(deliverables!=null) {
            String[] parts = deliverables.split(",\\s*");
            deliverableList = new ArrayList<>();
            for (String part : parts) {
                // 使用短横线分割每个部分以获取projectId和projectName
                String[] idAndName = part.split("-", 2);
                if (idAndName.length == 2) {
                    Long deliverableId = Long.parseLong(idAndName[0]);
                    String deliverableName = idAndName[1];
                    // 创建Project对象并添加到列表中
                    deliverableList.add(new Deliverable(deliverableId, deliverableName));
                }
            }
        }
    }
    public void setTeam(){
        if(teams!=null){
            String[] parts = teams.split(",\\s*");
            teamList = new ArrayList<>();
            for (String part : parts) {
                // 使用短横线分割每个部分以获取projectId和projectName
                String[] idAndName = part.split("-", 4);
                if (idAndName.length == 4) {
                    Long teamId = Long.parseLong(idAndName[0]);
                    String teamName = idAndName[1];
                    Long classId = Long.parseLong(idAndName[2]);
                    String className = idAndName[3];

                    teamList.add(new Team(teamId,teamName,classId,className));
                }
            }
        }

    }
}
