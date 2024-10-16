package com.wtb.javatool.service.impl;

import com.wtb.javatool.common.R;
import com.wtb.javatool.dao.TeamMapper;
import com.wtb.javatool.service.TeamService;
import com.wtb.javatool.vo.TeamName;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class TeamServiceImpl implements TeamService {
    @Autowired
    private TeamMapper teamMapper;

}
