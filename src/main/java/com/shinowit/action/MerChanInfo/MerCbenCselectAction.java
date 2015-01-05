package com.shinowit.action.MerChanInfo;

import com.opensymphony.xwork2.ActionSupport;
import com.shinowit.dao.BaseDao;
import com.shinowit.entity.TMeMerchandiseCInfo;

import javax.annotation.Resource;
import java.io.UnsupportedEncodingException;
import java.util.List;

/**
 * Created by Administrator on 2014-11-16.
 */
public class MerCbenCselectAction extends ActionSupport {
    @Resource
    private BaseDao<TMeMerchandiseCInfo> baseDao;

    private List<TMeMerchandiseCInfo> listmerCinfo;

    private int page;

    private int limit;

    private int rows;

    private String selectdata;

    public String MerchenCselect(){
        if((selectdata!=null)&&(selectdata.trim().length()>0)){
            try {
                byte[] bb = selectdata.getBytes("ISO-8859-1");
                selectdata=new String(bb,"UTF-8");
            } catch (UnsupportedEncodingException e) {
                e.printStackTrace();
            }
            rows = baseDao.queryRecordCount("select count(*) from TMeMerchandiseCInfo where merchandiseCName like \'%"+selectdata+"%\' ");
            if((rows%limit==0)&&(rows/limit<page)){
                page = page-1;
                listmerCinfo = baseDao.queryForPage("from TMeMerchandiseCInfo where merchandiseCName like \'%"+selectdata+"%\'",page,limit);
            }

            listmerCinfo = baseDao.queryForPage("from TMeMerchandiseCInfo where merchandiseCName like \'%"+selectdata+"%\'",page,limit);
            return SUCCESS;
        }
        rows = baseDao.queryRecordCount("select count(*) from TMeMerchandiseCInfo");
        if((rows%limit==0)&&(rows/limit<page)){
            page = page-1;
            listmerCinfo = baseDao.queryForPage("from TMeMerchandiseCInfo",page,limit);
        }
        listmerCinfo = baseDao.queryForPage("from TMeMerchandiseCInfo",page,limit);
        return SUCCESS;
    }

    public String getSelectdata() {
        return selectdata;
    }

    public void setSelectdata(String selectdata) {
        this.selectdata = selectdata;
    }

    public int getRows() {
        return rows;
    }

    public void setRows(int rows) {
        this.rows = rows;
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

    public List<TMeMerchandiseCInfo> getListmerCinfo() {
        return listmerCinfo;
    }

    public void setListmerCinfo(List<TMeMerchandiseCInfo> listmerCinfo) {
        this.listmerCinfo = listmerCinfo;
    }
}
