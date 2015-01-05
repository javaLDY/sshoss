package com.shinowit.service;

import com.shinowit.dao.BaseDao;
import com.shinowit.entity.TMeInStockDetailsInfo;
import com.shinowit.entity.TMeInStockInfo;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import javax.annotation.Resource;
import java.util.List;

/**
 * Created by Administrator on 2014-11-18.
 */
@Service
public class InStockDateil {

    @Resource
    private BaseDao<TMeInStockInfo> inStockInfoBaseDao;

    @Resource
    private BaseDao<TMeInStockDetailsInfo> inStockDetailsInfoBaseDao;


    @Transactional
    public boolean instockdetails(TMeInStockInfo instock,List<TMeInStockDetailsInfo> instockdetail){
        boolean result=false;
        Object id = inStockInfoBaseDao.insert(instock);
        try{

                for(TMeInStockDetailsInfo ss : instockdetail){
                ss.setTMeInStockInfoByBillCode(instock);
                 inStockDetailsInfoBaseDao.insert(ss);

                    result= true;
                }
        }catch (Exception e){
            e.printStackTrace();
        }

        return result;
    }

}
