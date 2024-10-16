package com.wtb.javatool.service.impl;

import com.fy.wetoband.utils.RequestUtil;
import com.wtb.javatool.common.R;
import com.wtb.javatool.common.TimeConversion;
import com.wtb.javatool.dao.CourseMapper;

import com.wtb.javatool.dto.CourseDto;
import com.wtb.javatool.entity.Course;
import com.wtb.javatool.service.CourseService;
import com.wtb.javatool.vo.PageBean;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import javax.servlet.http.HttpServletRequest;
import java.time.LocalDateTime;
import java.time.ZoneId;
import java.time.ZonedDateTime;
import java.time.format.DateTimeFormatter;
import java.util.List;
@Service
public class CourseServiceImpl implements CourseService {
    @Autowired
    private CourseMapper courseMapper;
    @Override
    public R<PageBean<CourseDto>> findCoursesByTeacherId(int currentPage, int pageSize, Long teacherId) {
        List<CourseDto> rows = courseMapper.findCoursesByTeacherId((currentPage -1) * pageSize,pageSize,teacherId);
        PageBean<CourseDto> PageBean = new PageBean<>();
        PageBean.setRows(rows);
        PageBean.setTotalCount(rows.get(0).getCount());
        return R.success(PageBean);
    }


    @Override
    public void createCourse(HttpServletRequest request){
        String course_name = RequestUtil.getStringParameter(request, "course_name");
        String create_time = RequestUtil.getStringParameter(request, "create_time");
        Long creator_id = RequestUtil.getLongParameter(request, "creator_id");
        Integer course_status = RequestUtil.getIntegerParameter(request, "course_status");
        Long subject_id = RequestUtil.getLongParameter(request, "subject_id");
        Integer course_type = RequestUtil.getIntegerParameter(request, "course_type");
        Integer project_driven_teaching = RequestUtil.getIntegerParameter(request, "project_driven_teaching");

        Course course = new Course();
        course.setCourseName(course_name);
        course.setCreatorId(creator_id);
        course.setCourseStatus(course_status);
        course.setSubjectId(subject_id);
        //course.setCourseType(course_type);
        course.setProjectDrivenTeaching(project_driven_teaching);


        course.setCreateTime(new TimeConversion().conversion(create_time));

        courseMapper.createCourse(course);
    }

    @Override
        public R<Course> findCourseById(Long courseId) {
        Course course = courseMapper.findCoursesById(courseId);
        if (course == null){
            return R.error("课程不存在");
        }
        return R.success(course);
    }
}
