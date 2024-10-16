package com.wtb.javatool.service.impl;

import com.wtb.javatool.common.R;
import com.wtb.javatool.dao.EnterPriseMapper;
import com.wtb.javatool.entity.Enterprise;
import com.wtb.javatool.service.EnterPriseService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class EnterPriseServiceImpl implements EnterPriseService {
    @Autowired
    private EnterPriseMapper enterPriseMapper;
    @Override
    public R<Enterprise> addEnterprise(Enterprise enterprise) {
        enterPriseMapper.addEnterprise(enterprise);
        return R.success(enterprise);
    }

    @Override
    public R<List<Enterprise>> deleteEnterprise(List<Enterprise> enterpriseId) {
        enterPriseMapper.deleteEnterprise(enterpriseId);
        return R.success(enterpriseId);
    }

    @Override
    public R<Enterprise> updateEnterprise(Enterprise enterprise) {
        enterPriseMapper.updateEnterprise(enterprise);
        return R.success(enterprise);
    }


}
