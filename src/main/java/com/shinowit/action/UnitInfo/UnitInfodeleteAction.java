package com.shinowit.action.UnitInfo;

import com.opensymphony.xwork2.ActionSupport;
import com.shinowit.dao.BaseDao;
import com.shinowit.entity.TMeUnitInfo;

import javax.annotation.Resource;

/**
 * Created by Administrator on 2014-11-16.
 */
public class UnitInfodeleteAction extends ActionSupport {
    @Resource
    private BaseDao<TMeUnitInfo> baseDao;

    private boolean success;

    private String message;

    private TMeUnitInfo unit;

    private String arry;

    public String unitdelete(){
        String []sarry = arry.split(",");
        for(String ss : sarry){
            int i = baseDao.executeHQL("delete from TMeUnitInfo where unitId=?",Integer.valueOf(ss));
            if(i<1){
                setSuccess(false);
                setMessage("删除失败,请重新删除");
            }
            if(1==i){
                setSuccess(true);
                setMessage("删除成功");
            }
        }
        return SUCCESS;
    }

    public String getArry() {
        return arry;
    }

    public void setArry(String arry) {
        this.arry = arry;
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
