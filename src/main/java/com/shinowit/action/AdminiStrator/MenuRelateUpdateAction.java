package com.shinowit.action.AdminiStrator;

import com.opensymphony.xwork2.ActionSupport;
import com.shinowit.dao.BaseDao;
import com.shinowit.entity.Newmenuinfo;

import javax.annotation.Resource;

/**
 * Created by Administrator on 2014-12-03.
 */
public class MenuRelateUpdateAction extends ActionSupport {
    @Resource
    private BaseDao<Newmenuinfo> baseDao;

    private boolean success;

    private String message;

    private Newmenuinfo menurelate;

    public String menurelateupdate(){
        Object oo = baseDao.update(menurelate);
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

    public Newmenuinfo getMenurelate() {
        return menurelate;
    }

    public void setMenurelate(Newmenuinfo menurelate) {
        this.menurelate = menurelate;
    }
}
