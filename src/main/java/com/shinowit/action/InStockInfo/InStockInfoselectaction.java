package com.shinowit.action.InStockInfo;

import com.opensymphony.xwork2.ActionSupport;
import com.shinowit.dao.BaseDao;
import com.shinowit.entity.TMeInStockInfo;

import javax.annotation.Resource;
import java.util.List;

/**
 * Created by Administrator on 2014-11-19.
 */
public class InStockInfoselectaction extends ActionSupport {
    @Resource
    private BaseDao<TMeInStockInfo> baseDao;

    private int page;

    private int limit;

    private int rows;

    private TMeInStockInfo instockinfo;

    private List<TMeInStockInfo> listinstock;

    public String instockinfoselect(){
        rows = baseDao.queryRecordCount("select count(*) from TMeInStockInfo");
        if((rows%limit==0)&&(rows/limit)<page){
            page = page-1;
            listinstock = baseDao.queryForPage("from TMeInStockInfo",page,limit);
        }else{
            listinstock = baseDao.queryForPage("from TMeInStockInfo",page,limit);
        }
        return SUCCESS;
    }

    public TMeInStockInfo getInstockinfo() {
        return instockinfo;
    }

    public void setInstockinfo(TMeInStockInfo instockinfo) {
        this.instockinfo = instockinfo;
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

    public List<TMeInStockInfo> getListinstock() {
        return listinstock;
    }

    public void setListinstock(List<TMeInStockInfo> listinstock) {
        this.listinstock = listinstock;
    }
}
