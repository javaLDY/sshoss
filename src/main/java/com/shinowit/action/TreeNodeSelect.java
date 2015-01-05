package com.shinowit.action;

import com.opensymphony.xwork2.ActionSupport;
import com.shinowit.dao.MenuDao;
import com.shinowit.entity.TreeNode;

import javax.annotation.Resource;



/**
 * Created by Administrator on 2014-12-05.
 */
public class TreeNodeSelect extends ActionSupport {
    @Resource
    private MenuDao menudao;

    private TreeNode node;

    private int arry;

    private boolean success;

    public String treeselect(){
        node = menudao.querymenu(arry);
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

    public TreeNode getNode() {
        return node;
    }

    public void setNode(TreeNode node) {
        this.node = node;
    }

    public int getArry() {
        return arry;
    }

    public void setArry(int arry) {
        this.arry = arry;
    }
}
