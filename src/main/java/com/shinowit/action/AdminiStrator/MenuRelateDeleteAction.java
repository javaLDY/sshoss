package com.shinowit.action.AdminiStrator;

import com.opensymphony.xwork2.ActionSupport;
import com.shinowit.dao.BaseDao;
import com.shinowit.entity.Newmenuinfo;
import com.shinowit.entity.TAuOperInfo;

import javax.annotation.Resource;

/**
 * Created by Administrator on 2014-12-03.
 */
public class MenuRelateDeleteAction extends ActionSupport {
    @Resource
    private BaseDao<Newmenuinfo> baseDao;

    private boolean success;

    private String message;

    private String arry;

    public String menurelatedelete(){
        String sarry[] = arry.split(",");
        try{
            for(String ss : sarry){
                int a = baseDao.executeHQL("delete from Newmenuinfo where menuinfoid=?",Integer.valueOf(ss));
                if(a>0){
                    setSuccess(true);
                    setMessage("删除成功");
                }else{
                    setSuccess(false);
                    setMessage("删除失败");
                }
            }
        }catch (Exception e){
            e.printStackTrace();
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

    public String getArry() {
        return arry;
    }

    public void setArry(String arry) {
        this.arry = arry;
    }
}
