package com.shinowit.service;

import com.shinowit.dao.BaseDao;
import com.shinowit.entity.TMeInStockDetailsInfo;
import com.shinowit.entity.TMeOrderDetailsInfo;
import com.shinowit.entity.TMeOutStockDetailsInfo;
import com.shinowit.entity.TMeOutStockInfo;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import javax.annotation.Resource;
import java.util.List;

/**
 * Created by Administrator on 2014-11-25.
 */
@Service
public class ChuKuInsert {
    @Resource
    private BaseDao<TMeOutStockInfo> outstockdao;

    @Resource
    private BaseDao<TMeOutStockDetailsInfo> outstockdetaildao;

    @Transactional
    public boolean chukuinsert(TMeOutStockInfo outstockinfo,List<TMeOutStockDetailsInfo> details){
        boolean result = true;
        Object oo = outstockdao.insert(outstockinfo);
        if(oo!=null){
            for(TMeOutStockDetailsInfo ss : details) {
                ss.setTMeOutStockInfoByOutBillCode(outstockinfo);
                outstockdetaildao.insert(ss);
            }
            result = true;
        }
        return result;
    }
}
