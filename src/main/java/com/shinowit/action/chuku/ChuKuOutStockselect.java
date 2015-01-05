package com.shinowit.action.chuku;

import com.opensymphony.xwork2.ActionSupport;
import com.shinowit.dao.BaseDao;
import com.shinowit.entity.TMeOutStockInfo;

import javax.annotation.Resource;
import java.util.List;

/**
 * Created by Administrator on 2014-11-26.
 */
public class ChuKuOutStockselect extends ActionSupport {
    @Resource
    private BaseDao<TMeOutStockInfo> baseDao;

    private int limit;

    private int page;

    private int rows;

    private List<TMeOutStockInfo> outstocklist;



    public String chukuoutstockselect(){

        rows = baseDao.queryRecordCount("select count(*) from TMeOutStockInfo");
        if((rows%limit==0)&&(rows/limit<page)){
            page=page-1;
            outstocklist = baseDao.queryForPage("from TMeOutStockInfo",page,limit);
        }else{
            outstocklist = baseDao.queryForPage("from TMeOutStockInfo",page,limit);
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

    public List<TMeOutStockInfo> getOutstocklist() {
        return outstocklist;
    }

    public void setOutstocklist(List<TMeOutStockInfo> outstocklist) {
        this.outstocklist = outstocklist;
    }
}
