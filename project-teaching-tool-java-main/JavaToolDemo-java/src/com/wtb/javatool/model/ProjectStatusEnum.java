package com.wtb.javatool.model;

public enum ProjectStatusEnum {
    NOT_START(0, "未开始"),
    IN_PROGRESS(1, "进行中"),
    FINISHED(2, "已结束"),
    ;

    private int code;
    private String desc;

    ProjectStatusEnum(int code, String desc) {
        this.code = code;
        this.desc = desc;
    }

    public int getCode() {
        return code;
    }

    public String getDesc() {
        return desc;
   }
}
