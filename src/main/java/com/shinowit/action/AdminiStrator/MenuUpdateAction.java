package com.shinowit.action.AdminiStrator;

import com.opensymphony.xwork2.ActionSupport;
import com.shinowit.dao.BaseDao;
import com.shinowit.entity.TAuMenuInfo;

import javax.annotation.Resource;

/**
 * Created by Administrator on 2014-12-02.
 */
public class MenuUpdateAction extends ActionSupport {
    @Resource
    private BaseDao<TAuMenuInfo> baseDao;

    private boolean success;

    private String message;

    private TAuMenuInfo menu;

    public String menuupdate(){
        Object oo = baseDao.update(menu);
        if(oo!=null){
            setSuccess(true);
            setMessage("更新成功");
            return SUCCESS;
        }else{
            setSuccess(true);
            setMessage("更新失败");
        }
        return SUCCESS;
    }

    public boolean isSuccess() {
        return success;
    }

    public void setSuccess(boolean success) {
        this.success = success;
    }

    public String getMessage() {
        return message;
    }

    public void setMessage(String message) {
        this.message = message;
    }

    public TAuMenuInfo getMenu() {
        return menu;
    }

    public void setMenu(TAuMenuInfo menu) {
        this.menu = menu;
    }
}
