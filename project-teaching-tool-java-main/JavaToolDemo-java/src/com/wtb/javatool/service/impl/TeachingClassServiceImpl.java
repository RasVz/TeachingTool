package com.wtb.javatool.service.impl;

import com.wtb.javatool.common.R;
import com.wtb.javatool.dao.TeachingClassMapper;
import com.wtb.javatool.service.TeachingClassService;
import com.wtb.javatool.vo.TeachingClass;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class TeachingClassServiceImpl implements TeachingClassService {
    @Autowired
    private TeachingClassMapper teachingClassMapper;
    @Override
    public R<List<TeachingClass>> findClassByCourseId(Long courseId) {
        if (courseId == null){
            return R.error("参数错误");
        }
        List<TeachingClass> teachingClassList = teachingClassMapper.findClassByCourseId(courseId);
        if (teachingClassList.isEmpty()){
            return R.error("没有查询到数据");
        }
        return R.success(teachingClassList);
    }
}
