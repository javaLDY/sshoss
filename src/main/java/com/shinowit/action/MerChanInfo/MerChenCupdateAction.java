package com.shinowit.action.MerChanInfo;

import com.opensymphony.xwork2.ActionSupport;
import com.shinowit.dao.BaseDao;
import com.shinowit.entity.TMeMerchandiseCInfo;

import javax.annotation.Resource;
import javax.validation.constraints.Null;

/**
 * Created by Administrator on 2014-11-16.
 */
public class MerChenCupdateAction extends ActionSupport {
    @Resource
    private BaseDao<TMeMerchandiseCInfo> baseDao;

    private boolean success;

    private String message;

    private TMeMerchandiseCInfo mer;

    public String updatemerchencinfo(){
        Object o = baseDao.update(mer);
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

    public TMeMerchandiseCInfo getMer() {
        return mer;
    }

    public void setMer(TMeMerchandiseCInfo mer) {
        this.mer = mer;
    }
}
