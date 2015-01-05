package com.shinowit.service;

import com.shinowit.dao.BaseDao;
import com.shinowit.entity.TMeOutStockDetailsInfo;
import com.shinowit.entity.TMeOutStockInfo;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;

import javax.annotation.Resource;

/**
 * Created by Administrator on 2014-11-30.
 */
@Repository
public class ChuKuDoubleUpdateServ {
    @Resource
    private BaseDao<TMeOutStockInfo> outStockInfoBaseDao;

    @Resource
    private BaseDao<TMeOutStockDetailsInfo> outStockDetailsInfoBaseDao;

    @Transactional
    public boolean servupdate(TMeOutStockInfo outStockInfo,TMeOutStockDetailsInfo outStockDetailsInfo){
        boolean result = false;
        try{
            boolean a = outStockInfoBaseDao.update(outStockInfo);
            if(a==true){
                boolean b = outStockDetailsInfoBaseDao.update(outStockDetailsInfo);
                if(b==true){
                    result = true;
                }else{
                    result = false;
                }
            }
        }catch(Exception e){
            e.printStackTrace();
        }
        return result;
    }
}
