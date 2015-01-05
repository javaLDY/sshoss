package com.shinowit.action.ProMerChanInfo;

import com.opensymphony.xwork2.ActionSupport;
import com.shinowit.dao.BaseDao;
import com.shinowit.dao.FileUpload.FileUpload;
import com.shinowit.entity.TMeMerchandiseInfo;
import org.apache.struts2.ServletActionContext;

import javax.annotation.Resource;
import java.io.File;
import java.io.FileInputStream;
import java.io.FileOutputStream;
import java.util.List;

/**
 * Created by Administrator on 2014-11-17.
 */
public class ProMerChanInfoinsert extends ActionSupport {
    @Resource
    private BaseDao<TMeMerchandiseInfo> baseDao;

    private List<File> uploadFile;
    private List<String> uploadFileContextType;
    private List<String> uploadFileFileName;



    private boolean success;

    private String message;

    private TMeMerchandiseInfo mer;

    private List<TMeMerchandiseInfo> prolist;


    public String tt() throws Exception {

        for (int index = 0; index < uploadFile.size(); index++) {
            FileInputStream fis = new FileInputStream(uploadFile.get(index));
            String webAppRootPath = "E://IdeaProjects//websshoss//web";

            File savePath=new File(webAppRootPath+"//upload");
            if (!savePath.exists()){
                savePath.mkdirs();
            }
            mer.setPicPath("upload/"+uploadFileFileName.get(index));
            FileOutputStream fos = new FileOutputStream(webAppRootPath
                    + "//upload//" + this.uploadFileFileName.get(index));
            byte[] buffer = new byte[1024];
            int len = 0;
            while ((len = fis.read(buffer)) > 0) {
                fos.write(buffer, 0, len);
            }
        }

        return SUCCESS;
    }


    public String merchaninfoinsert(){
        prolist = baseDao.listAll(TMeMerchandiseInfo.class);
        for(TMeMerchandiseInfo ss : prolist){
            if(ss.getMerchandiseName().equals(mer.getMerchandiseName())){
                setSuccess(false);
                setMessage("该商品类别已存在,请重新输入");
                return SUCCESS;
            }
        }
        try {
            tt();
        } catch (Exception e) {
            e.printStackTrace();
        }
        Object o = baseDao.insert(mer);
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

    public TMeMerchandiseInfo getMer() {
        return mer;
    }

    public void setMer(TMeMerchandiseInfo mer) {
        this.mer = mer;
    }

    public List<TMeMerchandiseInfo> getProlist() {
        return prolist;
    }

    public void setProlist(List<TMeMerchandiseInfo> prolist) {
        this.prolist = prolist;
    }

    public List<File> getUploadFile() {
        return uploadFile;
    }

    public void setUploadFile(List<File> uploadFile) {
        this.uploadFile = uploadFile;
    }

    public List<String> getUploadFileContextType() {
        return uploadFileContextType;
    }

    public void setUploadFileContextType(List<String> uploadFileContextType) {
        this.uploadFileContextType = uploadFileContextType;
    }

    public List<String> getUploadFileFileName() {
        return uploadFileFileName;
    }

    public void setUploadFileFileName(List<String> uploadFileFileName) {
        this.uploadFileFileName = uploadFileFileName;
    }
}
