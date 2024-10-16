package com.wtb.javatool.service;
import com.wtb.javatool.common.R;
import com.wtb.javatool.dto.CourseDto;
import com.wtb.javatool.entity.Course;
import com.wtb.javatool.vo.PageBean;



import javax.servlet.http.HttpServletRequest;
import java.util.List;

public interface CourseService {

    R<PageBean<CourseDto>> findCoursesByTeacherId(int currentPage, int pageSize, Long teacherId);

    void createCourse(HttpServletRequest request);

    R<Course> findCourseById(Long courseId);
}
