package com.wtb.javatool.dao;

import com.wtb.javatool.entity.Enterprise;
import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Param;

import java.util.List;

@Mapper
public interface EnterPriseMapper {
    void addEnterprise(Enterprise enterprise);

    void deleteEnterprise(List<Enterprise> enterpriseId);

    void updateEnterprise(Enterprise enterprise);
}
