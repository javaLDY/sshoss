package com.shinowit.service;

import com.shinowit.dao.BaseDao;
import com.shinowit.entity.TMeOrderDetailsInfo;
import com.shinowit.entity.TMeOrderInfo;
import org.springframework.stereotype.Repository;

import javax.annotation.Resource;
import java.util.List;

/**
 * Created by Administrator on 2014-12-09.
 */
@Repository
public class DingDanService {
    @Resource
    private BaseDao<TMeOrderInfo> orderinfobasedao;

    @Resource
    private BaseDao<TMeOrderDetailsInfo> orderDetailsInfoBaseDao;

    public boolean dingdaninsert(TMeOrderInfo orderinfo,List<TMeOrderDetailsInfo> orderDetailsInfo){
        boolean result = false;
        Object uuid = orderinfobasedao.insert(orderinfo);
        for(TMeOrderDetailsInfo ss : orderDetailsInfo){
            ss.setTMeOrderInfoByBillCode(orderinfo);
            Object oo = orderDetailsInfoBaseDao.insert(ss);
            if(oo!=null){
                result = true;
            }else{
                result = false;
            }
        }
        return result;
    }
}
