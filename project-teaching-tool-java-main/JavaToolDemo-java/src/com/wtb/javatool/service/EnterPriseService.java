package com.wtb.javatool.service;
import com.wtb.javatool.common.R;
import com.wtb.javatool.entity.Enterprise;

import java.util.List;

public interface EnterPriseService {
    R<Enterprise> addEnterprise(Enterprise enterpriseList);
    R<List<Enterprise>> deleteEnterprise(List<Enterprise> enterpriseId);
    R<Enterprise> updateEnterprise(Enterprise enterprise);
}
