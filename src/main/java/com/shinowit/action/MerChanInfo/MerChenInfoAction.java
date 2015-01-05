package com.shinowit.action.MerChanInfo;


import com.opensymphony.xwork2.ActionSupport;
import com.shinowit.dao.BaseDao;
import com.shinowit.dao.FileUpload.FileUpload;
import com.shinowit.entity.TMeMerchandiseCInfo;

import javax.annotation.Resource;
import java.util.List;

/**
 * Created by Administrator on 2014-11-14.
 */

public class MerChenInfoAction extends ActionSupport {

    @Resource
    private BaseDao<TMeMerchandiseCInfo> basedao;



    private boolean success;

    private String message;

    private TMeMerchandiseCInfo mer;

    private List<TMeMerchandiseCInfo> listmer;

    public String mercheninfoinsert() {
        listmer = basedao.listAll(TMeMerchandiseCInfo.class);
        for(TMeMerchandiseCInfo ss : listmer){
            if(ss.getMerchandiseCName().equals(mer.getMerchandiseCName())){
                setSuccess(false);
                setMessage("该商品类别已存在,请重新输入");
                return SUCCESS;
            }
        }
        Object o = basedao.insert(mer);
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

    public List<TMeMerchandiseCInfo> getListmer() {
        return listmer;
    }

    public void setListmer(List<TMeMerchandiseCInfo> listmer) {
        this.listmer = listmer;
    }

    public TMeMerchandiseCInfo getMer() {
        return mer;
    }

    public void setMer(TMeMerchandiseCInfo mer) {
        this.mer = mer;
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

}
