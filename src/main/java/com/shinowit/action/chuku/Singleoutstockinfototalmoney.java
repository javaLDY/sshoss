package com.shinowit.action.chuku;

import com.opensymphony.xwork2.ActionSupport;
import com.shinowit.dao.BaseDao;
import com.shinowit.entity.TMeOutStockInfo;

import javax.annotation.Resource;
import java.math.BigDecimal;

/**
 * Created by Administrator on 2014-11-29.
 */
public class Singleoutstockinfototalmoney extends ActionSupport {
    @Resource
    private BaseDao<TMeOutStockInfo> baseDao;

    private String arryid;

    private BigDecimal arrytotalmoney;

    public String singleupdatamoney(){
        String sqlupdate = "update TMeOutStockInfo set totalMoney=? where outBillCode=?";
        baseDao.executeHQL(sqlupdate,arrytotalmoney,Integer.valueOf(arryid));
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
