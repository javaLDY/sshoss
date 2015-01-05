package com.shinowit.action;

import com.opensymphony.xwork2.ActionContext;
import com.opensymphony.xwork2.ActionSupport;
import com.shinowit.dao.BaseDao;
import com.shinowit.dao.MenuDao;
import com.shinowit.entity.TAuAuthorization;
import com.shinowit.entity.TAuMenuInfo;
import com.shinowit.entity.TreeNode;
import org.apache.struts2.ServletActionContext;


import javax.annotation.Resource;
import java.util.ArrayList;
import java.util.List;

/**
 * Created by Administrator on 2014-12-01.
 */
public class MainShowAction extends ActionSupport {
    @Resource
    private BaseDao<TAuMenuInfo> baseDao;

    @Resource
    private MenuDao menudao;

    private TreeNode menulist;

    private boolean success;

    public String menuselect(){
        Integer roleId=(Integer) ServletActionContext.getContext().getSession().get("roleId");
        Integer operid = (Integer)ServletActionContext.getRequest().getSession().getAttribute("operid");
        if (null==roleId){
            System.out.println("session超时");
        }
        menulist = menudao.querymenu(operid);
        return SUCCESS;
    }

    public TreeNode getMenulist() {
        return menulist;
    }

    public void setMenulist(TreeNode menulist) {
        this.menulist = menulist;
    }

    public boolean isSuccess() {
        return success;
    }

    public void setSuccess(boolean success) {
        this.success = success;
    }
}
