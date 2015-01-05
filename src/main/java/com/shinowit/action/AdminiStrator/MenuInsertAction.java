package com.shinowit.action.AdminiStrator;

import com.opensymphony.xwork2.ActionSupport;
import com.shinowit.dao.BaseDao;
import com.shinowit.entity.TAuMenuInfo;

import javax.annotation.Resource;
import java.util.List;

/**
 * Created by Administrator on 2014-12-02.
 */
public class MenuInsertAction extends ActionSupport {
    @Resource
    private BaseDao<TAuMenuInfo> baseDao;

    private boolean success;

    private String message;

    private TAuMenuInfo menu;

    private List<TAuMenuInfo> menulist;

    public String menuinsert(){
        menulist = baseDao.myfindByHql("from TAuRoleInfo where roleName=?",menu.getText());
        if(menulist.size()>0){
            setSuccess(false);
            setMessage("该项已存在");
            return SUCCESS;
        }else{
            Object oo = baseDao.insert(menu);
            if(oo!=null){
                setSuccess(true);
                setMessage("提交成功");
                return SUCCESS;
            }else{
                setSuccess(false);
                setMessage("提交失败");
            }
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

    public List<TAuMenuInfo> getMenulist() {
        return menulist;
    }

    public void setMenulist(List<TAuMenuInfo> menulist) {
        this.menulist = menulist;
    }
}
