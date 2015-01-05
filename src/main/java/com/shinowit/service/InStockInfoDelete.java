package com.shinowit.service;

import com.shinowit.dao.BaseDao;
import com.shinowit.entity.TMeInStockDetailsInfo;
import com.shinowit.entity.TMeInStockInfo;
import org.springframework.stereotype.Controller;
import org.springframework.transaction.annotation.Transactional;

import javax.annotation.Resource;

/**
 * Created by Administrator on 2014-11-20.
 */
@Controller
public class InStockInfoDelete {
    @Resource
    private BaseDao<TMeInStockInfo> instockinfodao;
    @Resource
    private BaseDao<TMeInStockDetailsInfo> isidetailsdao;
    @Transactional
    public boolean instockdelete(String billcode){
        boolean result = false;
        String []sarry = billcode.split(",");
        try{
            for(String ss : sarry){
                int a = isidetailsdao.executeHQL("delete from TMeInStockDetailsInfo where TMeInStockInfoByBillCode.billCode=?",Integer.valueOf(ss));

                if(a>0){
                    int b = instockinfodao.executeHQL("delete from TMeInStockInfo where billCode=?",Integer.valueOf(ss));
                    if(b>0){
                        result = true;
                    }else{
                        result = false;
                    }
                }
            }
            return result;
        }catch(Exception e){
            e.printStackTrace();
        }
        return result;
    }
}
