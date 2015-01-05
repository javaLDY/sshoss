package com.shinowit.action.AdminiStrator;

import com.opensymphony.xwork2.ActionSupport;
import com.shinowit.dao.DingDanOutStoreDao;



import javax.annotation.Resource;
import java.util.*;

/**
 * Created by Administrator on 2014-12-12.
 */
public class OperRoleComBoxAction extends ActionSupport {
    @Resource
    private DingDanOutStoreDao dao;

    private List<Map<String,Object>> list;

    public String operrolecombox(){
        list = dao.operroleselect();
        return SUCCESS;
    }

    public List<Map<String, Object>> getList() {
        return list;
    }

    public void setList(List<Map<String, Object>> list) {
        this.list = list;
    }
}
