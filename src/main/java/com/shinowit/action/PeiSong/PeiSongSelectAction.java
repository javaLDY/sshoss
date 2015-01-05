package com.shinowit.action.PeiSong;

import com.opensymphony.xwork2.ActionSupport;
import com.shinowit.dao.BaseDao;
import com.shinowit.entity.TBaDeliveryInfo;

import javax.annotation.Resource;
import java.io.UnsupportedEncodingException;
import java.util.ArrayList;
import java.util.List;

/**
 * Created by Administrator on 2014-12-07.
 */
public class PeiSongSelectAction extends ActionSupport {
    @Resource
    private BaseDao<TBaDeliveryInfo> baseDao;

    private int page;

    private int limit;

    private int rows;

    private String arry;

    private List<TBaDeliveryInfo> listvalue;

    public String peisongselect(){
        String sqlcount = "select count(*) from TBaDeliveryInfo where 1=1";
        String sqllist = "from TBaDeliveryInfo where 1=1";
        List<Object> list = new ArrayList<Object>();
        if((arry!=null)&&(arry.trim().length()>0)){
            try {
                byte[] bb = arry.getBytes("ISO-8859-1");
                arry=new String(bb,"UTF-8");
            } catch (UnsupportedEncodingException e) {
                e.printStackTrace();
            }
            sqlcount = sqlcount + "and deliveryName like ?";
            sqllist = sqllist + "and deliveryName like ?";
            list.add("%"+arry+"%");
        }
        rows = baseDao.queryRecordCount(sqlcount,list.toArray());
        if((rows%limit==0)&&(rows/limit<page)){
            page = page-1;
        }
        listvalue = baseDao.queryForPage(sqllist,page,limit,list.toArray());
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

    public List<TBaDeliveryInfo> getListvalue() {
        return listvalue;
    }

    public void setListvalue(List<TBaDeliveryInfo> listvalue) {
        this.listvalue = listvalue;
    }
}
