package com.shinowit.action.ProStatusInfo;

import com.opensymphony.xwork2.ActionSupport;
import com.shinowit.dao.BaseDao;
import com.shinowit.entity.TMeProStatusInfo;

import javax.annotation.Resource;
import java.io.UnsupportedEncodingException;
import java.util.List;

/**
 * Created by Administrator on 2014-11-16.
 */
public class ProStatusInfoselect extends ActionSupport {

    @Resource
    private BaseDao<TMeProStatusInfo> baseDao;

    private int page;

    private int limit;

    private int rows;

    private List<TMeProStatusInfo> prostatuslist;

    private String proselectdata;

    public String prostatusinfoselect(){
        if((proselectdata!=null)&&(proselectdata.trim().length()>0)){
            try {
                byte[] bb = proselectdata.getBytes("ISO-8859-1");
                proselectdata=new String(bb,"UTF-8");
            } catch (UnsupportedEncodingException e) {
                e.printStackTrace();
            }
            rows = baseDao.queryRecordCount("select count(*) from TMeProStatusInfo where proStatusName like \'%"+proselectdata+"%\' ");
            if((rows%limit==0)&&(rows/limit<page)){
                page = page-1;
                prostatuslist = baseDao.queryForPage("from TMeProStatusInfo where proStatusName like \'%"+proselectdata+"%\'",page,limit);
            }

            prostatuslist = baseDao.queryForPage("from TMeProStatusInfo where proStatusName like \'%"+proselectdata+"%\'",page,limit);
            return SUCCESS;
        }
        rows = baseDao.queryRecordCount("select count(*) from TMeProStatusInfo");
        if((rows%limit==0)&&(rows/limit<page)){
            page = page-1;
            prostatuslist = baseDao.queryForPage("from TMeProStatusInfo",page,limit);
        }
        prostatuslist = baseDao.queryForPage("from TMeProStatusInfo",page,limit);
        return SUCCESS;
    }

    public int getRows() {
        return rows;
    }

    public void setRows(int rows) {
        this.rows = rows;
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

    public List<TMeProStatusInfo> getProstatuslist() {
        return prostatuslist;
    }

    public void setProstatuslist(List<TMeProStatusInfo> prostatuslist) {
        this.prostatuslist = prostatuslist;
    }

    public String getProselectdata() {
        return proselectdata;
    }

    public void setProselectdata(String proselectdata) {
        this.proselectdata = proselectdata;
    }
}
