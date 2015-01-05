package com.shinowit.dao;

import com.shinowit.entity.TAuAuthorization;
import com.shinowit.entity.TAuMenuInfo;
import com.shinowit.entity.TAuRoleInfo;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.stereotype.Repository;

import javax.annotation.Resource;
import java.sql.Types;
import java.util.List;
import java.util.Map;
/**
 * Created by Administrator on 2014-12-11.
 */
@Repository
public class UpdateRoleDao {
    @Resource
    private JdbcTemplate jt;

    public boolean roleupdate(TAuRoleInfo role,List<String> author){
        boolean result = false;
        String sql = "update dbo.TAu_RoleInfo set SortID=?,RoleName=?,State=? WHERE RoleID = ?";
        String sql1 = "delete from dbo.TAu_Authorization where RoleID=?";
        String sql2 = "insert into dbo.TAu_Authorization(RoleID,MenuID) values(?,?)";
        int a = jt.update(sql,new Object[]{role.getSortId(),role.getRoleName(),role.getState(),role.getRoleId()},new int[]{Types.VARCHAR,Types.VARCHAR,Types.BOOLEAN,Types.INTEGER});
        if(a>0){
            int  b = jt.update(sql1,new Object[]{role.getRoleId()},new int[]{Types.INTEGER});
            if(b>0){
                for(String ss : author){
                    TAuMenuInfo menu = new TAuMenuInfo();
                    menu.setMenuId(Integer.valueOf(ss));
                    int c = jt.update(sql2,new Object[]{role.getRoleId(),menu.getMenuId()},new int[]{Types.INTEGER,Types.INTEGER});
                    if(c>0){
                        result = true;
                    }
                }
            }
        }
        return result;
    }

    public boolean rolejinrong(Integer a,boolean b){
        boolean result = false;
        String sql = "update dbo.TAu_RoleInfo set State=? WHERE RoleID = ?";
        int c = jt.update(sql,new Object[]{b,a},new int[]{Types.BOOLEAN,Types.INTEGER});
        if(c>0){
            result = true;
        }
        return result;
    }


}
