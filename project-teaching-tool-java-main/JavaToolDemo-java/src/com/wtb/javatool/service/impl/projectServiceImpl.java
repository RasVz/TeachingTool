package com.wtb.javatool.service.impl;

import com.wtb.javatool.common.R;
import com.wtb.javatool.dao.ProjectMapper;
import com.wtb.javatool.service.ProjectService;
import com.wtb.javatool.vo.CourseTaskListCard;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class projectServiceImpl implements ProjectService {

    @Autowired
    private ProjectMapper projectMapper;


    @Override
    public R<List<CourseTaskListCard>> findProjectByCourseId(Long courseId) {
        if (courseId == null){
            return R.error("参数错误");
        }
        List<CourseTaskListCard> projectList = projectMapper.findProjectByCourseId(courseId);
        if (projectList == null){
            return R.error("没有查询到数据");
        }
        return R.success(projectList);
    }
}
