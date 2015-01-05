package com.shinowit.action;

import com.opensymphony.xwork2.ActionSupport;
import com.shinowit.dao.CurrentInstockMaxNumDao;
import com.shinowit.entity.ViewZhu;

import javax.annotation.Resource;
import java.util.List;
import java.util.Map;


/**
 * Created by Administrator on 2014-12-07.
 */
public class MaxChuKuPrice extends ActionSupport {
    @Resource
    private CurrentInstockMaxNumDao maxNumDao;

    private List<Map<String,Object>> newlist;

    public String maxchukupriceselect(){
        newlist =  maxNumDao.listdetail();
        return SUCCESS;
    }

    public List<Map<String, Object>> getNewlist() {
        return newlist;
    }

    public void setNewlist(List<Map<String, Object>> newlist) {
        this.newlist = newlist;
    }
}
