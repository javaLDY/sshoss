package com.shinowit.action;

import com.opensymphony.xwork2.ActionSupport;
import com.shinowit.dao.BaseDao;
import com.shinowit.dao.CurrentInstockMaxNumDao;
import com.shinowit.entity.TMeMerchandiseInfo;
import com.shinowit.entity.ViewPie;

import javax.annotation.Resource;
import java.sql.Timestamp;
import java.text.SimpleDateFormat;
import java.util.Date;
import java.util.List;
import java.util.Map;

/**
 * Created by Administrator on 2014-12-07.
 */
public class DayInstockNum extends ActionSupport {
    @Resource
    private CurrentInstockMaxNumDao dao;

    private List<Map<String,Object>> listvalue;

    public String dayinstocknumselect(){
        listvalue = dao.listdayprice();
        return SUCCESS;
    }

    public List<Map<String, Object>> getListvalue() {
        return listvalue;
    }

    public void setListvalue(List<Map<String, Object>> listvalue) {
        this.listvalue = listvalue;
    }
}
