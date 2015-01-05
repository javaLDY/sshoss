package com.shinowit.service;

import com.shinowit.dao.BaseDao;
import com.shinowit.entity.TAuAuthorization;
import com.shinowit.entity.TAuMenuInfo;
import com.shinowit.entity.TAuRoleInfo;
import org.springframework.stereotype.Repository;

import javax.annotation.Resource;
import java.util.List;

/**
 * Created by Administrator on 2014-12-03.
 */
@Repository
public class AdminiStratorInsert {
    @Resource
    private BaseDao<TAuRoleInfo> rolebasedao;

    @Resource
    private BaseDao<TAuAuthorization> authorbasedao;

    public boolean administratorinsertserv(TAuRoleInfo role,List<TAuMenuInfo> menu){
        boolean result = false;
        Object roleinfo = rolebasedao.insert(role);
        if(roleinfo!=null){
            for (TAuMenuInfo m:menu){
                TAuAuthorization au=new TAuAuthorization();

                au.setRoleinfo(role);
                au.setTAuMenuInfoByMenuId(m);

                authorbasedao.insert(au);
                result=true;
            }
        }
        return result;
    }

}
