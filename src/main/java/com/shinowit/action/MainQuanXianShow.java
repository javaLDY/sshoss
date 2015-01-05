package com.shinowit.action;

import com.opensymphony.xwork2.ActionSupport;
import com.shinowit.dao.MenuDao;
import com.shinowit.entity.TreeNode;
import org.apache.struts2.ServletActionContext;

import javax.annotation.Resource;

/**
 * Created by Administrator on 2014-12-07.
 */
public class MainQuanXianShow extends ActionSupport {
    @Resource
    private MenuDao menudao;

    private TreeNode treenode;

    private boolean success;

    public String mainquanxianselect(){
        Integer roleid = (Integer)ServletActionContext.getRequest().getSession().getAttribute("roleId");
        Integer operid = (Integer)ServletActionContext.getRequest().getSession().getAttribute("operid");
        treenode = menudao.querymenu(operid);
        if(treenode!=null){
            setSuccess(true);
        }
        return SUCCESS;
    }

    public TreeNode getTreenode() {
        return treenode;
    }

    public void setTreenode(TreeNode treenode) {
        this.treenode = treenode;
    }

    public boolean isSuccess() {
        return success;
    }

    public void setSuccess(boolean success) {
        this.success = success;
    }
}
