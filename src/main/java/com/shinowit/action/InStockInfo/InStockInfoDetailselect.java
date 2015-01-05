package com.shinowit.action.InStockInfo;

import com.opensymphony.xwork2.ActionSupport;
import com.shinowit.dao.BaseDao;
import com.shinowit.entity.TMeInStockDetailsInfo;

import javax.annotation.Resource;
import java.util.List;

/**
 * Created by Administrator on 2014-11-19.
 */
public class InStockInfoDetailselect extends ActionSupport {
    @Resource
    private BaseDao<TMeInStockDetailsInfo> baseDao;

    private int page;

    private int limit;

    private int rows;

    private List<TMeInStockDetailsInfo> listinstock;

    private String arry;

    public String instockinfodetailselect(){
        String sarry[] = arry.split(",");
        for(String ss : sarry){
            listinstock = baseDao.queryForPage("from TMeInStockDetailsInfo where TMeInStockInfoByBillCode.billCode=?",page,limit,Integer.valueOf(ss));
            rows = baseDao.queryRecordCount("select count(*) from TMeInStockDetailsInfo where TMeInStockInfoByBillCode.billCode=\'"+Integer.valueOf(ss)+"\' ");
        }

        return SUCCESS;
    }

    public String getArry() {
        return arry;
    }

    public void setArry(String arry) {
        this.arry = arry;
    }

    public int getPage() {
        return page;
    }

    public void setPage(int page) {
        this.page = page;
    }

    public int getLimit() {
        return limit;
    }

    public void setLimit(int limit) {
        this.limit = limit;
    }

    public int getRows() {
        return rows;
    }

    public void setRows(int rows) {
        this.rows = rows;
    }

    public List<TMeInStockDetailsInfo> getListinstock() {
        return listinstock;
    }

    public void setListinstock(List<TMeInStockDetailsInfo> listinstock) {
        this.listinstock = listinstock;
    }
}
