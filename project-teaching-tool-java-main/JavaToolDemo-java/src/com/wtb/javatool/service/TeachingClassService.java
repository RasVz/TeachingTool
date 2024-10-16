package com.wtb.javatool.service;

import com.wtb.javatool.common.R;
import com.wtb.javatool.vo.TeachingClass;

import java.util.List;

public interface TeachingClassService {
    R<List<TeachingClass>> findClassByCourseId(Long courseId);
}
