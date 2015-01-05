package com.shinowit.action.chuku;

import com.opensymphony.xwork2.ActionSupport;
import com.shinowit.dao.BaseDao;
import com.shinowit.entity.TMeOutStockDetailsInfo;

import javax.annotation.Resource;
import java.util.ArrayList;
import java.util.List;

/**
 * Created by Administrator on 2014-11-26.
 */
public class ChuKuOutStockDetailselect extends ActionSupport {
    @Resource
    private BaseDao<TMeOutStockDetailsInfo> baseDao;

    private int limit;

    private int page;

    private int rows;

    private List<TMeOutStockDetailsInfo> outstockdetailslist;

    private int arry;

    public String chukuoutstockdetailselect(){
        String sqlconut = "select count(*) from TMeOutStockDetailsInfo where 1=1";
        String sqllist = "from TMeOutStockDetailsInfo where 1=1";
        List<Object> sarry = new ArrayList<Object>();
        if(arry>0){
            sqlconut = sqlconut + " and  TMeOutStockInfoByOutBillCode.outBillCode=?";
            sqllist = sqllist + " and  TMeOutStockInfoByOutBillCode.outBillCode=?";
            sarry.add(arry);
        }
        rows = baseDao.queryRecordCount(sqlconut,sarry.toArray());
        if((rows%limit==0)&&(rows/limit<page)){
            page=page-1;
            outstockdetailslist = baseDao.queryForPage(sqllist,page,limit,sarry.toArray());
        }else{
            outstockdetailslist = baseDao.queryForPage(sqllist,page,limit,sarry.toArray());
        }
        return SUCCESS;
    }

    public int getLimit() {
        return limit;
    }

    public void setLimit(int limit) {
        this.limit = limit;
    }

    public int getPage() {
        return page;
    }

    public void setPage(int page) {
        this.page = page;
    }

    public int getRows() {
        return rows;
    }

    public void setRows(int rows) {
        this.rows = rows;
    }

    public List<TMeOutStockDetailsInfo> getOutstockdetailslist() {
        return outstockdetailslist;
    }

    public void setOutstockdetailslist(List<TMeOutStockDetailsInfo> outstockdetailslist) {
        this.outstockdetailslist = outstockdetailslist;
    }

    public int getArry() {
        return arry;
    }

    public void setArry(int arry) {
        this.arry = arry;
    }
}
