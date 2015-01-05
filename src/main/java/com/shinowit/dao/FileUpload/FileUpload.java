package com.shinowit.dao.FileUpload;

import java.io.File;
import java.io.FileInputStream;
import java.io.FileOutputStream;
import java.util.List;

import org.apache.struts2.ServletActionContext;

import com.opensymphony.xwork2.ActionSupport;
import org.springframework.stereotype.Repository;


@Repository
public class FileUpload extends ActionSupport {

    private static final long serialVersionUID = 1179102845366065549L;
    private List<File> uploadFile;
    private List<String> uploadFileContextType;
    private List<String> uploadFileFileName;

    @Override
    public String execute() throws Exception {

        for (int index = 0; index < uploadFile.size(); index++) {
            FileInputStream fis = new FileInputStream(uploadFile.get(index));
            String webAppRootPath = ServletActionContext.getServletContext()
                    .getRealPath("/");

            File savePath=new File(webAppRootPath+"//upload");
            if (!savePath.exists()){
                savePath.mkdirs();
            }

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

