package com.shinowit.action.AdminiStrator;

import com.opensymphony.xwork2.ActionSupport;
import com.shinowit.dao.BaseDao;
import com.shinowit.entity.Newmenuinfo;

import javax.annotation.Resource;
import java.util.List;

/**
 * Created by Administrator on 2014-12-02.
 */
public class MenuRelateInsertAction extends ActionSupport {
    @Resource
    private BaseDao<Newmenuinfo> baseDao;

    private boolean success;

    private String message;

    private Newmenuinfo menurelate;

    private List<Newmenuinfo> menurelatelist;

    public String menurelateinsert() {
        menurelatelist = baseDao.myfindByHql("from TAuOperInfo where operName=?", menurelate.getText());
        if (menurelatelist.size() > 0) {
            setSuccess(false);
            setMessage("关系已存在");
            return SUCCESS;
        }else{
            Object oo = baseDao.insert(menurelate);
            if(oo!=null){
                setSuccess(true);
                setMessage("插入成功");
                return SUCCESS;
            }else{
                setSuccess(false);
                setMessage("插入失败");
            }
        }
        return SUCCESS;
    }

    public List<Newmenuinfo> getMenurelatelist() {
        return menurelatelist;
    }

    public void setMenurelatelist(List<Newmenuinfo> menurelatelist) {
        this.menurelatelist = menurelatelist;
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
