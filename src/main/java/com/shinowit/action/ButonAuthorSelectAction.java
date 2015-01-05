package com.shinowit.action;

import com.opensymphony.xwork2.ActionSupport;
import com.shinowit.dao.ButtonAuthorDao;
import org.apache.struts2.ServletActionContext;

import javax.annotation.Resource;
import java.util.List;
import java.util.Map;

/**
 * Created by Administrator on 2014/12/13.
 */
public class ButonAuthorSelectAction extends ActionSupport {
    @Resource
    private ButtonAuthorDao buttondao;

    private List<Map<String,Object>> buttonlist;

    private boolean success;

    public String buttonselect(){
        Integer roleid = (Integer)ServletActionContext.getRequest().getSession().getAttribute("roleId");
        buttonlist = buttondao.buttonselect(roleid);
        if(buttonlist.size()>0){
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

    public List<Map<String, Object>> getButtonlist() {
        return buttonlist;
    }

    public void setButtonlist(List<Map<String, Object>> buttonlist) {
        this.buttonlist = buttonlist;
    }
}
