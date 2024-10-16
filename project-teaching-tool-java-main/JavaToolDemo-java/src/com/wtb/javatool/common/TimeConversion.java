package com.wtb.javatool.common;

import java.time.LocalDateTime;
import java.time.ZoneId;
import java.time.ZonedDateTime;
import java.time.format.DateTimeFormatter;

public class TimeConversion {
    public String conversion(String time){
        ZonedDateTime zdt = ZonedDateTime.parse(time);
        LocalDateTime ldt = zdt.withZoneSameInstant(ZoneId.systemDefault()).toLocalDateTime();
        DateTimeFormatter formatter = DateTimeFormatter.ofPattern("yyyy-MM-dd HH:mm:ss.SSS");
        String formattedDateTime = ldt.format(formatter);
        return  formattedDateTime;
    }
}
