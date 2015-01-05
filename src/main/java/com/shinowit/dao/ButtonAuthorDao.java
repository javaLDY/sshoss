package com.shinowit.dao;


import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.stereotype.Repository;

import javax.annotation.Resource;
import java.sql.Types;
import java.util.List;
import java.util.Map;

/**
 * Created by Administrator on 2014/12/13.
 */
@Repository
public class ButtonAuthorDao {
    @Resource
    private JdbcTemplate jt;

    public List<Map<String,Object>> buttonselect(int roleid){
        List<Map<String,Object>> result = null;
        String sql = "select * from TAu_Authorization where RoleID=?";
        result = jt.queryForList(sql,new Object[]{roleid},new int[]{Types.INTEGER});
        return result;
    }
}
