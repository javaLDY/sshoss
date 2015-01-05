package com.shinowit.action.UnitInfo;

import com.opensymphony.xwork2.ActionSupport;
import com.shinowit.dao.BaseDao;
import com.shinowit.entity.TMeUnitInfo;

import javax.annotation.Resource;
import java.util.List;

/**
 * Created by Administrator on 2014-11-16.
 */
public class Unitinfoinsert extends ActionSupport {

    @Resource
    private BaseDao<TMeUnitInfo> baseDao;

    private boolean success;

    private String message;

    private List<TMeUnitInfo> unitlist;

    private TMeUnitInfo unit;

    public String unitinsert(){
        unitlist = baseDao.listAll(TMeUnitInfo.class);
        for(TMeUnitInfo ss : unitlist){
            if(ss.getName().equals(unit.getName())){
                setSuccess(false);
                setMessage("该商品单位已存在,请重新输入");
                return SUCCESS;
            }
        }
        Object o = baseDao.insert(unit);
        if (o != null) {
            setSuccess(true);
            setMessage("录入成功");
            return SUCCESS;
        } else {
            setSuccess(false);
            setMessage("录入失败");
        }
        setSuccess(false);
        setMessage("由于系统原因无法录入");
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

    public List<TMeUnitInfo> getUnitlist() {
        return unitlist;
    }

    public void setUnitlist(List<TMeUnitInfo> unitlist) {
        this.unitlist = unitlist;
    }

    public TMeUnitInfo getUnit() {
        return unit;
    }

    public void setUnit(TMeUnitInfo unit) {
        this.unit = unit;
    }
}
