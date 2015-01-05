package com.shinowit.action.InStockInfo;

import com.opensymphony.xwork2.ActionSupport;
import com.shinowit.dao.BaseDao;
import com.shinowit.entity.TMeInStockInfo;

import javax.annotation.Resource;
import java.math.BigDecimal;

/**
 * Created by Administrator on 2014-11-26.
 */
public class SingleInStockInfoUpdatetotalmoney extends ActionSupport {

    @Resource
    private BaseDao<TMeInStockInfo> baseDao;

    private BigDecimal arrytotalmoney;

    private String arryid;

    public String updatetotalmoney(){
        int a = baseDao.executeHQL("update TMeInStockInfo set totalMoney=? where billCode=?",arrytotalmoney,Integer.valueOf(arryid));
        if(a>0){
            return SUCCESS;
        }
        return SUCCESS;
    }

    public String getArryid() {
        return arryid;
    }

    public void setArryid(String arryid) {
        this.arryid = arryid;
    }

    public BigDecimal getArrytotalmoney() {
        return arrytotalmoney;
    }

    public void setArrytotalmoney(BigDecimal arrytotalmoney) {
        this.arrytotalmoney = arrytotalmoney;
    }
}
