package com.shinowit.action.AdminiStrator;

import com.opensymphony.xwork2.ActionSupport;
import com.shinowit.dao.BaseDao;
import com.shinowit.entity.Newmenuinfo;

import javax.annotation.Resource;
import java.io.UnsupportedEncodingException;
import java.util.ArrayList;
import java.util.List;

/**
 * Created by Administrator on 2014-12-02.
 */
public class MenuRelateSelectAction extends ActionSupport {
    @Resource
    private BaseDao<Newmenuinfo> baseDao;

    private int page;

    private int limit;

    private int rows;

    private List<Newmenuinfo> newmenurelatelist;

    private String arry;

    public String menurelateselect(){
        String sqlcount = "select count(*) from Newmenuinfo where 1=1";
        String sqllist = "from Newmenuinfo where 1=1";
        List<Object> sarry = new ArrayList<Object>();
        if((arry!=null)&&(arry.trim().length()>0)){
            try {
                byte[] bb = arry.getBytes("ISO-8859-1");
                arry=new String(bb,"UTF-8");
            } catch (UnsupportedEncodingException e) {
                e.printStackTrace();
            }
            sqlcount = sqlcount+" and menuname like ?";
            sqllist = sqllist+" and menuname like ?";
            sarry.add("%"+arry+"%");
        }
        rows = baseDao.queryRecordCount(sqlcount,sarry.toArray());
        if((rows%limit==0)&&(rows/limit<page)){
            page = page-1;
        }
        newmenurelatelist = baseDao.queryForPage(sqllist,page,limit,sarry.toArray());
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

    public List<Newmenuinfo> getNewmenurelatelist() {
        return newmenurelatelist;
    }

    public void setNewmenurelatelist(List<Newmenuinfo> newmenurelatelist) {
        this.newmenurelatelist = newmenurelatelist;
    }
}
