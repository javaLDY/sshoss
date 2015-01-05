package com.shinowit.action;

import com.opensymphony.xwork2.ActionSupport;
import com.shinowit.dao.BaseDao;
import com.shinowit.entity.TMeStockInfo;

import javax.annotation.Resource;
import java.util.List;

/**
 * Created by Administrator on 2014-12-01.
 */
public class TotalKuCunAction extends ActionSupport {
    @Resource
    private BaseDao<TMeStockInfo> baseDao;

    private int limit;

    private int page;

    private int rows;

    private List<TMeStockInfo> liststockinfo;

    public String stockinfoselect(){
        rows = baseDao.queryRecordCount("select count(*) from TMeStockInfo");
        if((rows%limit==0)&&(rows/limit<page)){
            page = page-1;
            liststockinfo = baseDao.queryForPage("from TMeStockInfo",page,limit);
        }
        liststockinfo = baseDao.queryForPage("from TMeStockInfo",page,limit);
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

    public List<TMeStockInfo> getListstockinfo() {
        return liststockinfo;
    }

    public void setListstockinfo(List<TMeStockInfo> liststockinfo) {
        this.liststockinfo = liststockinfo;
    }
}
