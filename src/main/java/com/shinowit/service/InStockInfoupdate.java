package com.shinowit.service;

import com.shinowit.dao.BaseDao;
import com.shinowit.entity.TMeInStockDetailsInfo;
import com.shinowit.entity.TMeInStockInfo;
import org.springframework.stereotype.Service;

import javax.annotation.Resource;

/**
 * Created by Administrator on 2014-11-22.
 */
@Service
public class InStockInfoupdate {

    @Resource
    private BaseDao<TMeInStockInfo> instockdao;

    @Resource
    private BaseDao<TMeInStockDetailsInfo> instockdetail;

    public boolean instockdetailupdate(TMeInStockInfo instock,TMeInStockDetailsInfo details){
        boolean result = false;
        try{
            Object oo = instockdetail.update(details);
            if(oo!=null){
                Object pp = instockdao.update(instock);
                if(pp!=null){
                    result = true;
                }else{
                    result = false;
                }
            }
        }catch (Exception e){
            e.printStackTrace();
        }

        return result;
    }

}
