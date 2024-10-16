package com.wtb.javatool.dao;

import com.wtb.javatool.vo.TeachingClass;
import org.apache.ibatis.annotations.Mapper;

import java.util.List;

@Mapper
public interface TeachingClassMapper {
    List<TeachingClass> findClassByCourseId(Long courseId);
}
