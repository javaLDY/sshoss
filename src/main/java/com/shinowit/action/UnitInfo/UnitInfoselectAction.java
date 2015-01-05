package com.shinowit.action.UnitInfo;

import com.opensymphony.xwork2.ActionSupport;
import com.shinowit.dao.BaseDao;
import com.shinowit.entity.TMeUnitInfo;

import javax.annotation.Resource;
import java.io.UnsupportedEncodingException;
import java.util.List;

/**
 * Created by Administrator on 2014-11-16.
 */
public class UnitInfoselectAction extends ActionSupport {
    @Resource
    private BaseDao<TMeUnitInfo> baseDao;

    private List<TMeUnitInfo> unitlist;

    private int page;

    private int limit;

    private int rows;

    private String unitselect;

    public String unitinfoselect(){
        if((unitselect!=null)&&(unitselect.trim().length()>0)){
            try {
                byte[] bb = unitselect.getBytes("ISO-8859-1");
                unitselect=new String(bb,"UTF-8");
            } catch (UnsupportedEncodingException e) {
                e.printStackTrace();
            }
            rows = baseDao.queryRecordCount("select count(*) from TMeUnitInfo where name like \'%"+unitselect+"%\'");
            if((rows%limit==0)&&(rows/limit<page)){
                page=page-1;
                unitlist = baseDao.queryForPage("from TMeUnitInfo where name like \'%"+unitselect+"%\'",page,limit);
            }
            unitlist = baseDao.queryForPage("from TMeUnitInfo where name like \'%"+unitselect+"%\'",page,limit);
            return SUCCESS;
        }
        rows = baseDao.queryRecordCount("select count(*) from TMeUnitInfo");
        if((rows%limit==0)&&(rows/limit<page)){
            page=page-1;
            unitlist = baseDao.queryForPage("from TMeUnitInfo",page,limit);
        }
        unitlist = baseDao.queryForPage("from TMeUnitInfo",page,limit);
        return SUCCESS;
    }

    public String getUnitselect() {
        return unitselect;
    }

    public void setUnitselect(String unitselect) {
        this.unitselect = unitselect;
    }

    public List<TMeUnitInfo> getUnitlist() {
        return unitlist;
    }

    public void setUnitlist(List<TMeUnitInfo> unitlist) {
        this.unitlist = unitlist;
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
}
