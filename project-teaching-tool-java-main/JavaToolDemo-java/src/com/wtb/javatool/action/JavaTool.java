package com.wtb.javatool.action;

import com.alibaba.fastjson.JSONArray;
import com.fy.wetoband.tool.Tool;
import com.fy.wetoband.utils.RequestUtil;
import com.wtb.javatool.common.R;
import com.wtb.javatool.dto.CourseDto;
import com.wtb.javatool.dto.TaskDto;
import com.wtb.javatool.entity.Course;
import com.wtb.javatool.entity.Enterprise;
import com.wtb.javatool.entity.Team;
import com.wtb.javatool.service.*;
import com.wtb.javatool.vo.*;
import io.swagger.annotations.Api;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.ComponentScan;
import org.springframework.context.annotation.Scope;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.util.List;

import static org.springframework.beans.factory.config.ConfigurableBeanFactory.SCOPE_PROTOTYPE;


@Api(value="javatool",description = "java工具示例")
@Scope(SCOPE_PROTOTYPE) //务必使用多实例模式
@ComponentScan("com.wtb.javatool")
public class JavaTool extends Tool {

	@Autowired
	private ProjectService projectService;
	@Autowired
	private EnterPriseService enterpriseService;

	@Autowired
	private TaskService taskService;
	@Autowired
	private CourseService courseService;
	@Autowired
	private TeachingClassService teachingClassService;
	@Autowired
	private TeamService teamService;

	@Action
	public R<Enterprise> addEnterprise(HttpServletRequest request, HttpServletResponse response) {
		Enterprise enterprise = JSONArray.parseObject(RequestUtil.getStringParameter(request, "enterprise"), Enterprise.class);
		return enterpriseService.addEnterprise(enterprise);
	}

	//我觉得没用
	@Action
	public R<List<Enterprise>> deleteEnterprise(HttpServletRequest request, HttpServletResponse response) {
		String iNeed = "[" + RequestUtil.getStringParameter(request, "enterpriseList") + "]";
		System.out.println(iNeed);
		List<Enterprise> enterpriseId = JSONArray.parseArray(iNeed, Enterprise.class);
		return enterpriseService.deleteEnterprise(enterpriseId);
	}

//	@Action
//	public R<Enterprise> updateEnterprise(HttpServletRequest request, HttpServletResponse response){
//		Enterprise enterpriseList = JSONArray.parseObject(RequestUtil.getStringParameter(request, "enterprise"), Enterprise.class);
//		return enterpriseService.updateEnterprise(enterpriseList);
//	}

	@Action
	public R<PageBean<CourseDto>> findCoursesByTeacherId(HttpServletRequest request, HttpServletResponse response) {
		int currentPage = RequestUtil.getIntegerParameter(request,"currentPage");
		int pageSize = RequestUtil.getIntegerParameter(request,"pageSize");
		Long teacherId = RequestUtil.getLongParameter(request, "teacherId");
		R<PageBean<CourseDto>> list = courseService.findCoursesByTeacherId(currentPage,pageSize,teacherId);
		for (CourseDto c : list.getData().getRows()) {
			c.setProject();
		}
		return list;
	}


	@Action
	public R<String> createCourse(HttpServletRequest request, HttpServletResponse response) {
		courseService.createCourse(request);
		return R.success("添加成功");
	}


	//根据课程id，找到所有与课程相关的项目任务
	@Action
	public R<List<TaskDto>> findTasksByCourseId(HttpServletRequest request, HttpServletResponse response){
		Long courseId = RequestUtil.getLongParameter(request,"courseId");
		List<TaskDto> taskDtos = taskService.findTasksByCourseId(courseId);
		return R.success(taskDtos);
	}

	@Action
	public R<String> createTask(HttpServletRequest request, HttpServletResponse response) {
		taskService.createTask(request);
		return R.success("创建成功");
	}

	/**
	 * 根据课程id获取课程信息
	 */
	@Action
	public R<Course> findCourseById(HttpServletRequest request, HttpServletResponse response) {
		Long courseId = RequestUtil.getLongParameter(request,"courseId");
		return courseService.findCourseById(courseId);
	}

	/**
	 * 根据课程id，找到课程相关项目信息
	 */
	@Action
	public R<List<CourseTaskListCard>> findProjectByCourseId(HttpServletRequest request, HttpServletResponse response) {
		Long courseId = RequestUtil.getLongParameter(request,"courseId");
		return projectService.findProjectByCourseId(courseId);
	}

	/**
	 * 根据课程id，找到课程相关班级信息
	 */
	@Action
	public R<List<TeachingClass>> findClassByCourseId(HttpServletRequest request, HttpServletResponse response){
		Long courseId = RequestUtil.getLongParameter(request,"courseId");
		return teachingClassService.findClassByCourseId(courseId);
	}

	@Action
	public R<List<TaskStatusMessage>> findTaskStatus(HttpServletRequest request, HttpServletResponse response){
		return  taskService.findTaskStatus(request);
	}
}
