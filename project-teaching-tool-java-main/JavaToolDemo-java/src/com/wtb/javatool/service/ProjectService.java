package com.wtb.javatool.service;

import com.wtb.javatool.common.R;
import com.wtb.javatool.dto.CourseDto;
import com.wtb.javatool.vo.CourseTaskListCard;

import java.util.List;

public interface ProjectService {

    R<List<CourseTaskListCard>> findProjectByCourseId(Long courseId);
}
