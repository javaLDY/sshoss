package com.shinowit.action.PeiSong;

import com.opensymphony.xwork2.ActionSupport;
import com.shinowit.dao.BaseDao;
import com.shinowit.entity.TBaDeliveryInfo;

import javax.annotation.Resource;
import java.util.AbstractCollection;

/**
 * Created by Administrator on 2014-12-08.
 */
public class PeiSongDeleteAction extends ActionSupport {
    @Resource
    private BaseDao<TBaDeliveryInfo> baseDao;

    private boolean success;

    private String message;

    private String arry;

    public String peisongdelete(){
        String sarry[] = arry.split(",");
        try{
            for(String ss : sarry){
                int a = baseDao.executeHQL("delete from TBaDeliveryInfo where deliveryId=?",Integer.valueOf(ss));
                if(a>0){
                    setSuccess(false);
                    setMessage("删除成功");
                }else{
                    setSuccess(false);
                    setMessage("删除失败");
                }
            }
        }catch (Exception e){
            e.printStackTrace();
        }
        setSuccess(false);
        setMessage("删除失败");
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

    public String getArry() {
        return arry;
    }

    public void setArry(String arry) {
        this.arry = arry;
    }
}
