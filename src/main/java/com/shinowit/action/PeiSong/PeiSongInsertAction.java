package com.shinowit.action.PeiSong;

import com.opensymphony.xwork2.ActionSupport;
import com.shinowit.dao.BaseDao;
import com.shinowit.entity.TBaDeliveryInfo;

import javax.annotation.Resource;
import java.util.List;

/**
 * Created by Administrator on 2014-12-08.
 */
public class PeiSongInsertAction extends ActionSupport {
    @Resource
    private BaseDao<TBaDeliveryInfo> baseDao;

    private boolean success;

    private String message;

    private TBaDeliveryInfo pei;

    private List<TBaDeliveryInfo> listvalue;

    public String personginsert(){
        listvalue = baseDao.myfindByHql("from TBaDeliveryInfo where deliveryName=?",pei.getDeliveryName());
        for(TBaDeliveryInfo ss : listvalue){
            if(ss.getDeliveryName().equals(pei.getDeliveryName())){
                setSuccess(false);
                setMessage("配送商已存在");
                return SUCCESS;
            }
        }
        try{
            Object oo = baseDao.insert(pei);
            if(oo!=null){
                setSuccess(true);
                setMessage("插入成功");
                return SUCCESS;
            }else{
                setSuccess(false);
                setMessage("插入失败");
            }
        }catch(Exception e){
            e.printStackTrace();
        }
        setSuccess(false);
        setMessage("插入失败");
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

    public List<TBaDeliveryInfo> getListvalue() {
        return listvalue;
    }

    public void setListvalue(List<TBaDeliveryInfo> listvalue) {
        this.listvalue = listvalue;
    }
}
