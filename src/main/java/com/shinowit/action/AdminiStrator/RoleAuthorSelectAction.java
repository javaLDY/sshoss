package com.shinowit.action.AdminiStrator;

import com.opensymphony.xwork2.ActionSupport;
import com.shinowit.dao.InsertMenuDao;
import com.shinowit.entity.InsertTreeNode;

import javax.annotation.Resource;

/**
 * Created by Administrator on 2014-12-10.
 */
public class RoleAuthorSelectAction extends ActionSupport {
    @Resource
    private InsertMenuDao roleinsertdao;

    private InsertTreeNode node;

    private boolean success;

    public String roletreeinsert(){
        node = roleinsertdao.querymenu();
        if(node!=null){
            setSuccess(true);
        }
        return SUCCESS;
    }

    public boolean isSuccess() {
        return success;
    }

    public void setSuccess(boolean success) {
        this.success = success;
    }

    public InsertTreeNode getNode() {
        return node;
    }

    public void setNode(InsertTreeNode node) {
        this.node = node;
    }
}
