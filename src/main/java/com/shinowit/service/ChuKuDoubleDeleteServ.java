package com.shinowit.service;

import com.shinowit.dao.BaseDao;
import com.shinowit.entity.TMeOutStockDetailsInfo;
import com.shinowit.entity.TMeOutStockInfo;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;

import javax.annotation.Resource;

/**
 * Created by Administrator on 2014-11-29.
 */
@Repository
public class ChuKuDoubleDeleteServ {
    @Resource
    private BaseDao<TMeOutStockInfo> outStockInfoBaseDao;
    @Resource
    private BaseDao<TMeOutStockDetailsInfo> outStockDetailsInfoBaseDao;

    @Transactional
    public boolean servicedelete(String listbillcode){
        boolean result = false;
        String sarry[] = listbillcode.split(",");
        for(String ss : sarry){
            int a = outStockDetailsInfoBaseDao.executeHQL("delete from TMeOutStockDetailsInfo where TMeOutStockInfoByOutBillCode.outBillCode=?",Integer.valueOf(ss));
            if(a>=0){
                int b = outStockInfoBaseDao.executeHQL("delete from TMeOutStockInfo where outBillCode=?",Integer.valueOf(ss));
                if(b>0){
                    result = true;
                }else{
                    result = false;
                }
            }
        }
        return result;
    }
}
