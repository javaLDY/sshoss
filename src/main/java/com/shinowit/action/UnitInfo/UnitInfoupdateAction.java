package com.shinowit.action.UnitInfo;

import com.opensymphony.xwork2.ActionSupport;
import com.shinowit.dao.BaseDao;
import com.shinowit.entity.TMeUnitInfo;

import javax.annotation.Resource;

/**
 * Created by Administrator on 2014-11-16.
 */
public class UnitInfoupdateAction extends ActionSupport {
    @Resource
    private BaseDao<TMeUnitInfo> baseDao;

    private boolean success;

    private String message;

    private TMeUnitInfo unit;

    public String unitupdate(){
        Object o = baseDao.update(unit);
        if(o==null){
            setSuccess(false);
            setMessage("更改失败,请重新更改");
            return  SUCCESS;
        }else{
            setSuccess(true);
            setMessage("更新成功,请查看");
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

    public TMeUnitInfo getUnit() {
        return unit;
    }

    public void setUnit(TMeUnitInfo unit) {
        this.unit = unit;
    }
}
