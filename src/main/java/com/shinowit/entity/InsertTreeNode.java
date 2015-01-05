package com.shinowit.entity;

import java.util.ArrayList;
import java.util.List;

/**
 * Created by Administrator on 2014-12-10.
 */
public class InsertTreeNode {

    private InsertTreeNode parent;

    private List<InsertTreeNode> children=new ArrayList<InsertTreeNode>();

    private boolean leaf;

    private TAuMenuInfo menu;

    private boolean checked;

    public void addChild(InsertTreeNode childNode){
        childNode.parent=this;
        children.add(childNode);
    }

    public boolean isChecked() {
        return checked;
    }

    public void setChecked(boolean checked) {
        this.checked = checked;
    }

    public boolean isLeaf() {
        return children.size()==0;
    }

    public void setLeaf(boolean leaf) {
        this.leaf = leaf;
    }

    public TAuMenuInfo getMenu() {
        return menu;
    }

    public void setMenu(TAuMenuInfo menu) {
        this.menu = menu;
    }

    public List<InsertTreeNode> getChildren() {
        return children;
    }

    public void setChildren(List<InsertTreeNode> children) {
        this.children = children;
    }
}
