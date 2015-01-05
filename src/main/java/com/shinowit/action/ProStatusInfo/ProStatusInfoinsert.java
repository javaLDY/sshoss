package com.shinowit.action.ProStatusInfo;

import com.opensymphony.xwork2.ActionSupport;
import com.shinowit.dao.BaseDao;
import com.shinowit.entity.TMeProStatusInfo;

import javax.annotation.Resource;
import java.util.List;

/**
 * Created by Administrator on 2014-11-16.
 */
public class ProStatusInfoinsert extends ActionSupport {

    @Resource
    private BaseDao<TMeProStatusInfo> baseDao;

    private boolean success;

    private String message;

    private TMeProStatusInfo pro;

    private List<TMeProStatusInfo> prolist;

    public String prostatusinsert(){
        prolist = baseDao.listAll(TMeProStatusInfo.class);
        for(TMeProStatusInfo ss : prolist){
            if(ss.getProStatusName().equals(pro.getProStatusName())){
                setSuccess(false);
                setMessage("该商品类别已存在,请重新输入");
                return SUCCESS;
            }
        }
        Object o = baseDao.insert(pro);
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

    public List<TMeProStatusInfo> getProlist() {
        return prolist;
    }

    public void setProlist(List<TMeProStatusInfo> prolist) {
        this.prolist = prolist;
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

    public TMeProStatusInfo getPro() {
        return pro;
    }

    public void setPro(TMeProStatusInfo pro) {
        this.pro = pro;
    }
}
