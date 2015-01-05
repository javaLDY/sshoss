package com.shinowit.action.AdminiStrator;

import com.opensymphony.xwork2.ActionSupport;
import com.shinowit.dao.BaseDao;
import com.shinowit.entity.TAuMenuInfo;

import javax.annotation.Resource;
import java.io.UnsupportedEncodingException;
import java.util.ArrayList;
import java.util.List;

/**
 * Created by Administrator on 2014-12-02.
 */
public class MenuSelectAction extends ActionSupport {
    @Resource
    private BaseDao<TAuMenuInfo> baseDao;

    private List<TAuMenuInfo> listmenu;

    private int page;

    private int limit;

    private int rows;

    private String arry;

    public String menuselect(){
        String sqlcount = "select count(*) from TAuMenuInfo where 1=1";
        String sqllist = "from TAuMenuInfo where 1=1";
        List<Object> sarry = new ArrayList<Object>();
        if((arry!=null)&&(arry.trim().length()>0)){
            try {
                byte[] bb = arry.getBytes("ISO-8859-1");
                arry=new String(bb,"UTF-8");
            } catch (UnsupportedEncodingException e) {
                e.printStackTrace();
            }

            sqlcount = sqlcount + " and menuName like ?";
            sqllist = sqllist + " and menuName like ?";
            sarry.add("%"+arry+"%");
        }
        rows = baseDao.queryRecordCount(sqlcount,sarry.toArray());
        if((rows%limit==0)&&(rows/limit<page)){
            page = page-1;
        }
        listmenu = baseDao.queryForPage(sqllist,page,limit,sarry.toArray());
        return SUCCESS;
    }

    public String getArry() {
        return arry;
    }

    public void setArry(String arry) {
        this.arry = arry;
    }

    public List<TAuMenuInfo> getListmenu() {
        return listmenu;
    }

    public void setListmenu(List<TAuMenuInfo> listmenu) {
        this.listmenu = listmenu;
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
