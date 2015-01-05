package com.shinowit.action.ProMerChanInfo;

import com.opensymphony.xwork2.ActionSupport;
import com.shinowit.dao.BaseDao;
import com.shinowit.entity.TMeMerchandiseInfo;

import javax.annotation.Resource;

/**
 * Created by Administrator on 2014-11-17.
 */
public class ProMerChanInfoupdate extends ActionSupport {
    @Resource
    private BaseDao<TMeMerchandiseInfo> baseDao;

    private boolean success;

    private String message;

    private TMeMerchandiseInfo mer;

    public String promerchaninfoupdate(){
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

    public TMeMerchandiseInfo getMer() {
        return mer;
    }

    public void setMer(TMeMerchandiseInfo mer) {
        this.mer = mer;
    }
}
