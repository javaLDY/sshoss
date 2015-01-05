package com.shinowit.action.PeiSong;

import com.opensymphony.xwork2.ActionSupport;
import com.shinowit.dao.BaseDao;
import com.shinowit.entity.TBaDeliveryInfo;

import javax.annotation.Resource;

/**
 * Created by Administrator on 2014-12-08.
 */
public class PeiSongUpdate extends ActionSupport {
    @Resource
    private BaseDao<TBaDeliveryInfo> baseDao;

    private boolean success;

    private String message;

    private TBaDeliveryInfo pei;

    public String peisongupdate(){
        boolean oo = baseDao.update(pei);
        try{
            if(oo==true){
                setSuccess(true);
                setMessage("更新成功");
                return SUCCESS;
            }else{
                setSuccess(false);
                setMessage("更新失败");
            }
        }catch (Exception e){
            e.printStackTrace();
        }
        setSuccess(false);
        setMessage("更新失败");
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

    public TBaDeliveryInfo getPei() {
        return pei;
    }

    public void setPei(TBaDeliveryInfo pei) {
        this.pei = pei;
    }
}

