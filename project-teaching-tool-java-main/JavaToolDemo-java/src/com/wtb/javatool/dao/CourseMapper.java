package com.wtb.javatool.dao;

import com.wtb.javatool.dto.CourseDto;
import com.wtb.javatool.entity.Course;
import com.wtb.javatool.vo.PageBean;
import com.wtb.javatool.vo.TeacherCourseProjectClassProject;
import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Param;

import java.util.List;

@Mapper
public interface CourseMapper {



    List<CourseDto> findCoursesByTeacherId(@Param("begin") int begin, @Param("size")int size,
                                           @Param("teacherId") Long teacherId);

    void createCourse(Course course);


    Course findCoursesById(Long courseId);
}
