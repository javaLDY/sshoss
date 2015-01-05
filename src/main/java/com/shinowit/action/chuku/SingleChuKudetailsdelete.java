package com.shinowit.action.chuku;

import com.opensymphony.xwork2.ActionSupport;
import com.shinowit.dao.BaseDao;
import com.shinowit.entity.TMeOutStockDetailsInfo;

import javax.annotation.Resource;
import java.util.ArrayList;
import java.util.List;

/**
 * Created by Administrator on 2014-11-29.
 */
public class SingleChuKudetailsdelete extends ActionSupport {
    @Resource
    private BaseDao<TMeOutStockDetailsInfo> baseDao;

    private boolean success;

    private String message;

    private String arry;

    public String singleckdetaildelete(){
        String sarry[] = arry.split(",");
        List <Object> listarry = new ArrayList<Object>();
        String sqldelete = "delete from TMeOutStockDetailsInfo where id = ?";
        for(String ss : sarry){
            if((ss!=null)&&(ss.trim().length()>0)){
                listarry.add(Integer.valueOf(ss));
            }
        }
        try{
            int a = baseDao.executeHQL(sqldelete,listarry.toArray());
            if(a>0){
                setSuccess(true);
                setMessage("删除成功");
            }else{
                setSuccess(false);
                setMessage("删除失败");
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
