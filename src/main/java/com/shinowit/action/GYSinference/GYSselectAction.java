package com.shinowit.action.GYSinference;

import com.opensymphony.xwork2.ActionSupport;
import com.shinowit.dao.BaseDao;
import com.shinowit.entity.TBaSupplierInfo;

import javax.annotation.Resource;
import java.io.UnsupportedEncodingException;
import java.util.List;

/**
 * Created by user on 2014/11/12.
 */
public class GYSselectAction extends ActionSupport {

    @Resource
    private BaseDao<TBaSupplierInfo> supbasedao;

    private int page;

    private int limit;

    private int rows;

    private List<TBaSupplierInfo> listone;

    private String name;

    public String superselect(){

        if((name!=null)&&(name.trim().length()>0)){
            try {
                byte[] bb = name.getBytes("ISO-8859-1");
                name=new String(bb,"UTF-8");
            } catch (UnsupportedEncodingException e) {
                e.printStackTrace();
            }
            rows = supbasedao.queryRecordCount("select count(*) from TBaSupplierInfo where supplierName like \'%"+name+"%\' ");
            if((rows%limit==0)&&(rows/limit<page)){
                page=page-1;
                listone = supbasedao.queryForPage("from TBaSupplierInfo where supplierName like \'%"+name+"%\' ",page,limit);
            }
            listone = supbasedao.queryForPage("from TBaSupplierInfo where supplierName like \'%"+name+"%\' ",page,limit);
        }else{
            rows = supbasedao.queryRecordCount("select count(*) from TBaSupplierInfo");

            if((rows%limit==0)&&(rows/limit<page)){
                page=page-1;
                listone = supbasedao.queryForPage("from TBaSupplierInfo",page,limit);
            }
            listone = supbasedao.queryForPage("from TBaSupplierInfo",page,limit);
        }
        return SUCCESS;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
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

    public List<TBaSupplierInfo> getListone() {
        return listone;
    }

    public void setListone(List<TBaSupplierInfo> listone) {
        this.listone = listone;
    }
}
