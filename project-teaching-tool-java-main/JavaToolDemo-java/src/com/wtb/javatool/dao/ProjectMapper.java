package com.wtb.javatool.dao;

import com.wtb.javatool.vo.CourseTaskListCard;
import org.apache.ibatis.annotations.Mapper;

import java.util.List;

@Mapper
public interface ProjectMapper {
    List<CourseTaskListCard> findProjectByCourseId(Long courseId);
}
