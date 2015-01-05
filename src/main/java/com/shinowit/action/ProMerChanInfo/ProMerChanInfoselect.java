package com.shinowit.action.ProMerChanInfo;

import com.opensymphony.xwork2.ActionSupport;
import com.shinowit.dao.BaseDao;
import com.shinowit.entity.TMeMerchandiseInfo;

import javax.annotation.Resource;
import java.io.UnsupportedEncodingException;
import java.util.List;

/**
 * Created by Administrator on 2014-11-17.
 */
public class ProMerChanInfoselect extends ActionSupport {
    @Resource
    private BaseDao<TMeMerchandiseInfo> baseDao;

    private int page;

    private int limit;

    private int rows;

    private List<TMeMerchandiseInfo> listman;

    private String merchaninfosel;

    public String promerchaninfoselect(){
        if((merchaninfosel!=null)&&(merchaninfosel.trim().length()>0)){
            try {
                byte[] bb = merchaninfosel.getBytes("ISO-8859-1");
                merchaninfosel=new String(bb,"UTF-8");
            } catch (UnsupportedEncodingException e) {
                e.printStackTrace();
            }
            rows = baseDao.queryRecordCount("select count(*) from TMeMerchandiseInfo where merchandiseName like \'%"+merchaninfosel+"%\' ");
            if((rows%limit==0)&&(rows/limit<page)){
                page = page-1;
                listman = baseDao.queryForPage("from TMeMerchandiseInfo where merchandiseName like \'%"+merchaninfosel+"%\'",page,limit);
            }

            listman = baseDao.queryForPage("from TMeMerchandiseInfo where merchandiseName like \'%"+merchaninfosel+"%\'",page,limit);
            return SUCCESS;
        }
        rows = baseDao.queryRecordCount("select count(*) from TMeMerchandiseInfo");
        if((rows%limit==0)&&(rows/limit<page)){
            page = page-1;
            listman = baseDao.queryForPage("from TMeMerchandiseInfo",page,limit);
        }
        listman = baseDao.queryForPage("from TMeMerchandiseInfo",page,limit);
        return SUCCESS;
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

    public List<TMeMerchandiseInfo> getListman() {
        return listman;
    }

    public void setListman(List<TMeMerchandiseInfo> listman) {
        this.listman = listman;
    }

    public String getMerchaninfosel() {
        return merchaninfosel;
    }

    public void setMerchaninfosel(String merchaninfosel) {
        this.merchaninfosel = merchaninfosel;
    }
}
